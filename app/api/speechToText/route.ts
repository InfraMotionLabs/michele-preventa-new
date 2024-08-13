import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import { promises as fsPromises } from 'fs';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  organization: process.env.OPENAI_ORGANIZATION,
});

const typeToExtension = {
  'audio/webm;codecs=opus': 'webm',
  'audio/webm': 'webm',
  'audio/mp3': 'mp3',
  'audio/mpeg': 'mp3',
  'audio/mpga': 'mp3',
  'audio/mp4': 'm4a',
  'audio/x-m4a': 'm4a',
  'audio/m4a': 'm4a',
  'audio/wav': 'wav',
  'audio/x-wav': 'wav',
};
export async function POST(req: Request) {
  try {
    const { audio: base64Audio, type } = await req.json();
    console.log('Converting audio to text...');

    const extension =
      typeToExtension[type as keyof typeof typeToExtension] || 'default';

    const filePath = path.join('/tmp', `input.${extension}`);

    // Convert the base64 audio data to a Buffer
    const audio = Buffer.from(base64Audio, 'base64');

    // Write the audio data to a temporary file asynchronously
    await fsPromises.writeFile(filePath, audio);

    // Use fs to create a readable stream from the temporary file
    const readStream = fs.createReadStream(filePath);
    const data = await openai.audio.transcriptions.create({
      file: readStream,
      model: 'whisper-1',
      response_format: 'text',
    });

    // Remove the temporary file after successful processing
    await fsPromises.unlink(filePath);

    console.log('Audio transcription:', data);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error processing audio:', error);
    return NextResponse.error();
  }
}
