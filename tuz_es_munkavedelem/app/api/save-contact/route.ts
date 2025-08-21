import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

const client = new MongoClient(uri);

export async function POST(request: Request) {
  const data = await request.json();
  // Hozzáadtam a 'phone' mezőt a data dekonstrukcióhoz
  const { name, email, phone, message } = data;

  if (!name || !email || !message) {
    return NextResponse.json({ message: 'Hiányzó adatok (név, email, üzenet).' }, { status: 400 });
  }

  try {
    await client.connect();
    const database = client.db('TuzEsMunkaVedelmiLeadek');
    const collection = database.collection('kontakt');

    await collection.insertOne({
      name,
      email,
      phone: phone || 'Nincs megadva', // A telefonszám most már elmentésre kerül, ha megadták
      message,
      submittedAt: new Date(),
    });

    console.log('Contact message saved successfully');
    return NextResponse.json({ message: 'Üzenet sikeresen mentve.' }, { status: 201 });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ message: 'Hiba történt az üzenet mentése közben.' }, { status: 500 });
  } finally {
    await client.close();
  }
}