import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { URL } from 'url'; // Beépített Node.js modul a hivatkozó URL elemzéséhez

// --- MÓDOSÍTÁS: Adatbázis kapcsolat gyorsítótárazása (Teljesítmény) ---
// Ahelyett, hogy minden kérésnél újra csatlakoznánk, a már meglévő kapcsolatot
// újra felhasználjuk, ami drasztikusan csökkenti a válaszidőt.
let cachedDb: any = null;

async function connectToDatabase(uri: string) {
  if (cachedDb) {
    return cachedDb;
  }
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db('TuzEsMunkaVedelmiLeadek');
  cachedDb = db;
  return db;
}

// --- MÓDOSÍTÁS: Egyszerű rate-limiting (Biztonság) ---
// Ez a mechanizmus megakadályozza, hogy egy IP címről rövid idő alatt
// túl sok kérést küldjenek, így védve a rendszert a spam és a túlterhelés ellen.
const ipRequestCounts = new Map<string, number>();
const RATE_LIMIT_WINDOW_MS = 60000; // 1 perc
const MAX_REQUESTS_PER_WINDOW = 15; // Max 15 kérés/perc/IP

export async function POST(request: Request) {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI hiányzik a környezeti változók közül');
  }

  const headersList = await headers();
  const ip = headersList.get('x-forwarded-for') ?? '127.0.0.1';

  // Rate Limiter ellenőrzés
  const requestCount = ipRequestCounts.get(ip) ?? 0;
  if (requestCount >= MAX_REQUESTS_PER_WINDOW) {
    return new NextResponse(JSON.stringify({ message: 'Túl sok kérés.' }), { status: 429 });
  }
  ipRequestCounts.set(ip, requestCount + 1);
  setTimeout(() => ipRequestCounts.delete(ip), RATE_LIMIT_WINDOW_MS);


  try {
    const browserData = await request.json();
    const userAgent = headersList.get('user-agent') ?? 'USER_AGENT_NOT_FOUND';

    // --- MÓDOSÍTÁS: Hivatkozó forrásának elemzése (Jobb Adat) ---
    // Ahelyett, hogy a teljes URL-t mentjük, kinyerjük a domain nevet (pl. "google.com"),
    // ami sokkal hasznosabb az elemzésekhez.
    let referrerSource = "Direct or Unknown";
    if (browserData.referrer) {
      try {
        referrerSource = new URL(browserData.referrer).hostname;
      } catch { /* Marad az alapértelmezett érték, ha a referrer URL érvénytelen */ }
    }

    // Geolocation lekérdezés
    let geoLocation = {};
    try {
      const geoResponse = await fetch(`http://ip-api.com/json/${ip}?fields=status,country,regionName,city,zip,isp`);
      if (geoResponse.ok) {
        const geoData = await geoResponse.json();
        if (geoData.status === 'success') {
          geoLocation = {
            country: geoData.country,
            region: geoData.regionName,
            city: geoData.city,
            zip: geoData.zip,
            isp: geoData.isp,
          };
        }
      }
    } catch (e) { console.error("Geo-lekérdezési hiba:", e) }

    // Adatbázis művelet
    const db = await connectToDatabase(uri);
    const collection = db.collection('VisitorFingerprints');

    const fullData = {
      ...browserData,
      ipAddress: ip,
      userAgent: userAgent,
      referrerSource: referrerSource,
      geoLocation: geoLocation,
      consentGivenAtUTC: new Date(),
      // --- MÓDOSÍTÁS: Helyi idő hozzáadása (Extra kontextus) ---
      consentGivenAtLocal: new Date().toLocaleString('hu-HU', { timeZone: 'Europe/Budapest' }),
    };

    await collection.insertOne(fullData);

    return NextResponse.json({ message: 'Részletes adatok sikeresen rögzítve.' }, { status: 201 });
  } catch (error) {
    console.error('API hiba:', error);
    // Biztonsági okokból a kliensnek ne küldjünk részletes hibaüzenetet
    return new NextResponse(JSON.stringify({ message: 'Belső szerverhiba történt.' }), { status: 500 });
  }
}