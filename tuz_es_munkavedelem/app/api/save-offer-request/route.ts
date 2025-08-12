// app/api/save-offer-request/route.ts

import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

const client = new MongoClient(uri);

export async function POST(request: Request) {
  const data = await request.json();
  const { 
      name, email, phone, services,
      employeeCount, activity, premiseCount,
      premiseSize, premiseLocation 
  } = data;

  if (!name || !email || !services || services.length === 0) {
    return NextResponse.json({ message: 'Hiányzó adatok (név, email, szolgáltatások).' }, { status: 400 });
  }

  try {
    await client.connect();
    const database = client.db('TuzEsMunkaVedelmiLeadek');
    const collection = database.collection('ajanlatkeres'); // Új kollekció

    await collection.insertOne({
      name,
      email,
      phone: phone || 'Nincs megadva',
      services, // A kiválasztott szolgáltatások listája
      employeeCount: employeeCount || 'Nincs megadva',
      activity: activity || 'Nincs megadva',
      premiseCount: premiseCount || 'Nincs megadva',
      premiseSize: premiseSize || 'Nincs megadva',
      premiseLocation: premiseLocation || 'Nincs megadva',
      submittedAt: new Date(),
    });

    console.log('Offer request saved successfully');
    return NextResponse.json({ message: 'Ajánlatkérés sikeresen mentve.' }, { status: 201 });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ message: 'Hiba történt a kérés mentése közben.' }, { status: 500 });
  } finally {
    // A modern driverek jobban kezelik a kapcsolatokat, de explicit zárás is lehetséges
    // await client.close(); 
  }
}