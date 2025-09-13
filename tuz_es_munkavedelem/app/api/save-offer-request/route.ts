// app/api/save-offer-request/route.ts

import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

// Ahelyett, hogy minden kérésnél új kapcsolatot hoznánk létre,
// érdemes a kapcsolatot gyorsítótárazni a jobb teljesítmény érdekében.
let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  // Fejlesztői módban a "hot reload" miatt a globális változókat használjuk,
  // hogy elkerüljük a felesleges kapcsolatok létrehozását.
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise: Promise<MongoClient>
  }
  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // Éles (production) környezetben egyszerűen létrehozzuk a kapcsolatot.
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export async function POST(request: Request) {
  const data = await request.json();
  const { 
      name, email, phone, services,
      employeeCount, activity, premiseCount,
      premiseSize, premiseLocation 
  } = data;

  // Alapvető validáció
  if (!name || !email || !services || !Array.isArray(services) || services.length === 0) {
    return NextResponse.json({ message: 'Hiányzó adatok (név, email, szolgáltatások).' }, { status: 400 });
  }

  try {
    const mongoClient = await clientPromise;
    const database = mongoClient.db('TuzEsMunkaVedelmiLeadek');
    const collection = database.collection('ajanlatkeres');

    // Az összes új adat beszúrása
    await collection.insertOne({
      name,
      email,
      phone: phone || 'Nincs megadva',
      services, // A kiválasztott szolgáltatások listája (tömb)
      employeeCount: employeeCount || 'Nincs megadva',
      activity: activity || 'Nincs megadva',
      premiseCount: premiseCount || 'Nincs megadva',
      premiseSize: premiseSize || 'Nincs megadva',
      premiseLocation: premiseLocation || 'Nincs megadva',
      submittedAt: new Date(),
    });

    console.log('Detailed offer request saved successfully');
    return NextResponse.json({ message: 'Ajánlatkérés sikeresen mentve.' }, { status: 201 });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ message: 'Hiba történt a kérés mentése közben.' }, { status: 500 });
  }
}