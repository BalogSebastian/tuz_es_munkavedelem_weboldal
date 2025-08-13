// app/api/save-quiz-lead/route.ts

import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

const client = new MongoClient(uri);

export async function POST(request: Request) {
  const data = await request.json();
  const { name, email, phone, quizAnswers, downloadedDocument } = data;

  if (!name || !email || !quizAnswers) {
    return NextResponse.json({ message: 'Hiányzó adatok (név, email, kvíz válaszok).' }, { status: 400 });
  }

  try {
    await client.connect();
    const database = client.db('TuzEsMunkaVedelmiLeadek');
    const collection = database.collection('kvíz');

    await collection.insertOne({
      name,
      email,
      phone: phone || 'Nincs megadva',
      quizAnswers,
      downloadedDocument,
      submittedAt: new Date(),
    });

    console.log('Quiz lead saved successfully');
    return NextResponse.json({ message: 'Adatok sikeresen mentve.' }, { status: 201 });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ message: 'Hiba történt az adatok mentése közben.' }, { status: 500 });
  } finally {
    await client.close();
  }
}