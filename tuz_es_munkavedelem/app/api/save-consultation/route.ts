// app/api/save-consultation/route.ts

import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

const client = new MongoClient(uri);

export async function POST(request: Request) {
  const data = await request.json();
  const { name, email, phone, services } = data;

  if (!name || !email || !services) {
    return NextResponse.json({ message: 'Hiányzó adatok (név, email, szolgáltatások).' }, { status: 400 });
  }

  try {
    await client.connect();
    const database = client.db('TuzEsMunkaVedelmiLeadek');
    const collection = database.collection('erroljoha tudsz');

    await collection.insertOne({
      name,
      email,
      phone: phone || 'Nincs megadva',
      services,
      submittedAt: new Date(),
    });

    console.log('Consultation request saved successfully');
    return NextResponse.json({ message: 'Kérés sikeresen mentve.' }, { status: 201 });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ message: 'Hiba történt a kérés mentése közben.' }, { status: 500 });
  } finally {
    await client.close();
  }
}