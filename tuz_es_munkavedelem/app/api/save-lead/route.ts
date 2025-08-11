// app/api/save-lead/route.ts

import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

// A connection stringet a környezeti változókból olvassuk be
const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

const client = new MongoClient(uri);

export async function POST(request: Request) {
  // Adatok kinyerése a kérésből
  const data = await request.json();
  const { name, email, phone, documentTitle, fileName } = data;

  // Alapvető validáció
  if (!name || !email || !documentTitle || !fileName) {
    return NextResponse.json({ message: 'Hiányzó adatok (név, email, dokumentum címe).' }, { status: 400 });
  }

  try {
    // Kapcsolódás az adatbázishoz
    await client.connect();
    const database = client.db('TuzEsMunkaVedelmiLeadek'); // Adatbázis neve
    const collection = database.collection('Letoltesek'); // Kollekció neve

    // Adatok beszúrása
    await collection.insertOne({
      name,
      email,
      phone: phone || 'Nincs megadva', // Kezeljük, ha a telefon nem kötelező
      documentTitle,
      fileName,
      downloadedAt: new Date(),
    });

    console.log('Lead saved successfully');
    // Sikeres válasz küldése
    return NextResponse.json({ message: 'Adatok sikeresen mentve.' }, { status: 201 });
  } catch (error) {
    console.error('API Error:', error);
    // Hiba esetén válasz küldése
    return NextResponse.json({ message: 'Hiba történt az adatok mentése közben.' }, { status: 500 });
  } finally {
    // A kapcsolat lezárása minden esetben
    // A modern drivereknél nem mindig szükséges manuálisan zárni, de biztosabb
    // await client.close();
  }
}