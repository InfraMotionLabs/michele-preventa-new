import {
  SpeechConfig,
  SpeechSynthesizer,
} from 'microsoft-cognitiveservices-speech-sdk';
import { NextRequest } from 'next/server';
import { PassThrough } from 'stream';

export async function POST(req: NextRequest) {
  try {
    const { input } = await req.json();
    console.log('input', input);

    const speechConfig = SpeechConfig.fromSubscription(
      process.env.SPEECK_KEY!,
      process.env.SPEECH_REGION!
    );

    speechConfig.speechSynthesisVoiceName = 'en-US-AvaMultilingualNeural';

    const synthesizer = new SpeechSynthesizer(speechConfig);
    const visemes: [number, number][] = [];

    synthesizer.visemeReceived = function (s, e) {
      // console.log(
      //   '(Viseme), Audio offset: ' +
      //     e.audioOffset / 10000 +
      //     'ms. Viseme ID: ' +
      //     e.visemeId
      // );

      visemes.push([e.audioOffset / 10000, e.visemeId]);
    };

    const audioStream = await new Promise<ReadableStream>((resolve, reject) => {
      synthesizer.speakTextAsync(
        input,
        (result) => {
          const { audioData } = result;
          const bufferStream = new PassThrough();
          bufferStream.end(Buffer.from(audioData));
          resolve(bufferStream as unknown as ReadableStream);
          synthesizer.close();
        },
        (err) => {
          console.error(err);
          synthesizer.close();
          reject(err);
        }
      );
    });

    return new Response(audioStream, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Disposition': 'inline; filename=tts.mp3',
        Visemes: JSON.stringify(visemes),
      },
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    return new Response('Error');
  }
}
