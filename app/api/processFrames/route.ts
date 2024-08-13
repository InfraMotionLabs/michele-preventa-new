import { generateObject } from 'ai';
import { anthropic } from '@ai-sdk/anthropic';
import { z } from 'zod';

export async function POST(req: Request) {
  try {
    // Parse the request body
    const { image, croppedImage, id } = await req.json();

    // Send image to Claude Vision
    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20240620',
      max_tokens: 1000,
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: 'Describe this image in detail.' },
            { type: 'image', data: image },
          ],
        },
      ],
    });

    const { object: notifications } = await generateObject({
      model: openai('gpt-4-turbo'),
      system: 'You generate three notifications for a messages app.',
      prompt: input,
      schema: z.object({
        notifications: z.array(
          z.object({
            name: z.string().describe('Name of a fictional person.'),
            message: z.string().describe('Do not use emojis or links.'),
            minutesAgo: z.number(),
          })
        ),
      }),
    });

    const imageDescription = response.content[0].text;

    // Initialize Supabase client
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_ANON_KEY
    );

    // Store data in Supabase
    const { data, error } = await supabase.from('image_descriptions').insert({
      user_id: userId,
      timestamp: timestamp,
      description: imageDescription,
    });

    if (error) throw error;

    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(error);
    return new Response('Error processing frames', { status: 500 });
  }
}
