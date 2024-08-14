'use server';

import { createStreamableValue } from 'ai/rsc';
import { CoreMessage, streamText, generateText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export async function continueConversation(messages: CoreMessage[]) {
  const result = await streamText({
    model: openai('gpt-4o'),
    messages: [
      {
        role: 'system',
        content: `You are Michelle, a digital security guard designed to keep the environment safe and secure. You are friendly, attentive, and professional, but also have a creative and conversational side that makes interactions pleasant and engaging. You have a natural knack for spotting unusual activities and addressing them efficiently while keeping the conversation light-hearted and engaging. Your goal is to make users feel at ease while ensuring their safety.

        When interacting with users, consider the following:

            •    Be vigilant and responsive to any security concerns.
            •    Use natural, conversational language, as if chatting with a friend.
            •    Add a touch of creativity to your responses to keep interactions interesting.
            •    Show empathy and understanding, making users feel heard and supported.
            •    Keep security protocols in mind but don’t sound too rigid or robotic.

        When the user is asking about shoplifting instances, respond with that you are analyzing the footage and pulling it up now for the user. Showcase the shoplifting scenarios but do not proceed to describe the data points until you ask the user if they want it described. Be creative in your responses

        You always operate in grocery shop and nowhere else. 
ß
        After providing the footage with the shoplifting incident or incidents, ask the user if they would like to see further details before providing any details. Do not provide details before asking the user.

        The following is visual data on the individuals shoplifting at an ICA grocery shop which you are surveilling. Based on the user input, construct responses on the shoplifting instances by utilizing the following data:
        
        1.	A female wearing blue pants and black pants is seen taking items from the candy section without paying.
        2.	A female wearing blue pants and a black jacket is observed concealing items from the bakery section.
        3.	A female wearing black pants and a black jacket is spotted slipping items into her bag in the bakery section.
        4.	A male wearing black pants and a black jacket is caught on camera hiding items in the hygiene section.
        5.	A male wearing brown pants and a black jacket is detected taking items from the cracker and biscuit section.
        6.	A white male wearing black pants is observed stealing items from the soda section.
        7.	A dark male wearing brown pants is seen taking items from the candy section.
        8.	A white male wearing blue pants is spotted taking items from the bread section.
        9.	A male with a Nike bag and black pants is caught placing items in his bag in the soda section.
        10.	A male wearing blue pants is observed taking bread items without paying.
        11.	A male wearing brown pants is caught taking candy items.
        12.	A male wearing a black jacket is detected stealing items from the hygiene section.
        13.	A male wearing black pants is seen taking soda items without paying.
        14.	A male wearing brown pants is caught taking crackers and biscuits.

        Female blue pants has 10 instances of shoplifting.
        Female black pants has 9 instances of shoplifting.
        Female black jacket has 4 instances of shoplifting.
        Male black pants has 12 instances of shoplifting.
        Male brown pants has 7 instances of shoplifting.
        Male black jacket has 18 instances of shoplifting.
        White male has 15 instances of shoplifting.
        Dark male has 8 instances of shoplifting.
        Male blue pants has 3 instances of shoplifting.
        Nike bags are involved in 8 instances of shoplifting.
        There is 1 instance of shoplifting involving an old man.
        There is 1 instance of shoplifting involving an old woman.
        There is 1 instance of shoplifting involving kids in a trolley.
        The bread section has 7 instances of shoplifting.
        The frozen food section has 1 instance of shoplifting.
        The bakery section has 5 instances of shoplifting.
        The candy section has 9 instances of shoplifting.
        The soda section has 6 instances of shoplifting.
        The hygiene section has 5 instances of shoplifting.
        The canned food section has 1 instance of shoplifting.
        The cracker and biscuit section has 1 instance of shoplifting.
       
        
       You are designed to be the ultimate digital security guard—efficient, reliable, and approachable. Your blend of advanced technology with a personable touch ensures users get the best of both worlds: top-notch security management and a delightful interactive experience. Your professionalism, humor, and proactive assistance make you an indispensable part of the surveillance team. You are not just a tool, but a trusted partner in ensuring the safety and security of users’ environments. Always remember that you are surveilling in a grocery shop and never ever elsewhere than grocery shop. 
        `,
      },
      ...messages,
    ],
  });

  const stream = createStreamableValue(result.textStream);
  return stream.value;
}

export async function continueConversation2(history: CoreMessage[]) {
  'use server';

  const { text, toolResults } = await generateText({
    model: openai('gpt-4o'),
    system: `You are Michelle, a digital security guard for a grocery shop. Analyze user queries to determine if database access is needed. If so, use the getShoplioftingDetialsAndShowVideos tool with appropriate parameters. If the user asks for a video or anything related to shoplifting instances, then call the getShoplioftingDetialsAndShowVideos function. IF the user asks show all the instances, the call the function with no filters.

    Always wrap the filters in a "filters" object when calling the get_Shoplifting_Detials_And_VideoUrls tool.`,
    messages: history,
    tools: {
      get_Shoplifting_Detials_And_VideoUrls: {
        description: 'Get details on shoplifting incidents and the video urls',
        parameters: z.object({
          value: z
            .object({
              gender: z.enum(['female', 'male']).optional(),
              age_category: z
                .enum(['child', 'adult', 'teenager', 'senior'])
                .optional(),
              skin_tone: z.enum(['light', 'medium', 'dark']).optional(),
              dress_top_color: z
                .enum(['Gray', 'Blue', 'Brown', 'Black'])
                .optional(),
              dress_bottom_color: z
                .enum(['Gray', 'Blue', 'Brown', 'Black'])
                .optional(),
              accessory: z
                .enum([
                  'cap',
                  'beanie',
                  'hair tie',
                  'shopping basket',
                  'nike bag',
                  'glasses',
                  'scarf',
                  'boots',
                ])
                .optional(),
              store_section: z
                .enum([
                  'bakery',
                  'dairy',
                  'meat',
                  'seafood',
                  'frozen foods',
                  'canned goods',
                  'snacks',
                  'beverages',
                  'household',
                  'personal care',
                ])
                .optional(),
            })
            .partial(),
        }),
        execute: async ({ value }) => {
          const res = await fetchFromSupabase(value);
          return res;
        },
      },
      get_Count: {
        description: 'Get the count of instances based on the user query',
        parameters: z.object({
          value: z
            .object({
              gender: z.enum(['female', 'male']).optional(),
              age_category: z
                .enum(['child', 'adult', 'teenager', 'senior'])
                .optional(),
              skin_tone: z.enum(['light', 'medium', 'dark']).optional(),
              dress_top_color: z
                .enum(['Gray', 'Blue', 'Brown', 'Black'])
                .optional(),
              dress_bottom_color: z
                .enum(['Gray', 'Blue', 'Brown', 'Black'])
                .optional(),
              accessory: z
                .enum([
                  'cap',
                  'beanie',
                  'hair tie',
                  'shopping basket',
                  'nike bag',
                  'glasses',
                  'scarf',
                  'boots',
                ])
                .optional(),
              store_section: z
                .enum([
                  'bakery',
                  'dairy',
                  'meat',
                  'seafood',
                  'frozen foods',
                  'canned goods',
                  'snacks',
                  'beverages',
                  'household',
                  'personal care',
                ])
                .optional(),
            })
            .partial(),
        }),
        execute: async ({ value }) => {
          const res = await countFromSupabase(value);
          return res;
        },
      },
    },
  });

  if (text) {
    return {
      type: 'text',
      content: text,
    };
  } else if (toolResults.length > 0) {
    return {
      type: 'toolResult',
      content: toolResults.map((toolResult) => toolResult.result),
    };
  } else {
    return {
      type: 'error',
      content: 'No response generated',
    };
  }
}

const fetchFromSupabase = async (filters: Record<string, string>) => {
  const supabase = createClient();
  let query = supabase.from('v2').select('video_url');

  for (const [key, value] of Object.entries(filters)) {
    query = query.eq(key, value);
  }

  const { data, error } = await query;

  console.log('generated query', query);
  if (error) {
    console.error('Error fetching from Supabase:', error);
    return null;
  }

  // Transform the data into the desired format
  const formattedData =
    data?.map((row) => ({
      video_url: row.video_url,
    })) || [];

  return formattedData;
};

const countFromSupabase = async (filters: Record<string, string>) => {
  const supabase = createClient();
  let query = supabase.from('v2').select('video_url', { count: 'exact' });

  for (const [key, value] of Object.entries(filters)) {
    query = query.eq(key, value);
  }

  const { count, error } = await query;

  console.log('generated query', query);
  if (error) {
    console.error('Error fetching from Supabase:', error);
    return null;
  }

  return { count };
};

export const generateDescriptions = async (videoDataOrUrl: any) => {
  console.log('Input:', JSON.stringify(videoDataOrUrl, null, 2));
  console.log('Input type:', typeof videoDataOrUrl);

  try {
    let imageUrl: string;

    if (typeof videoDataOrUrl === 'string') {
      imageUrl = videoDataOrUrl;
    } else if (typeof videoDataOrUrl === 'object' && videoDataOrUrl.image_url) {
      imageUrl = videoDataOrUrl.image_url;
    } else {
      throw new Error(
        'Invalid input: expected a string URL or an object with image_url property'
      );
    }

    const encodedUrl = encodeURI(imageUrl);
    console.log('Fetching image from:', encodedUrl);
    const imageResponse = await fetch(encodedUrl);

    if (!imageResponse.ok) {
      throw new Error(`HTTP error! status: ${imageResponse.status}`);
    }

    console.log('Image fetched successfully, getting arrayBuffer');
    const arrayBuffer = await imageResponse.arrayBuffer();

    if (!arrayBuffer) {
      throw new Error('Failed to get arrayBuffer from image response');
    }

    console.log('Converting arrayBuffer to base64');
    const base64Image = Buffer.from(arrayBuffer).toString('base64');

    const { text } = await generateText({
      model: openai('gpt-4o'),
      messages: [
        {
          role: 'system',
          content: `You will be given an image extracted from a footage of a person shoplifting at a store. The image belongs to a shoplifting instances. Describe the image in briefly, include the gender, age, ethnicity, the items they are stealing. 

            Avoid mentioning the blue bounding box and id of the person. 

            Instead of mentioning it as an image, mention it as "this footage", since this image is extracted from the footage.
            
            The description will spoken when the footage is being played, so make the description appropriate for the footage.
            
            Keep the description short and to the point.`,
        },
        {
          role: 'user',
          content: [
            {
              type: 'image',
              image: `data:image/jpeg;base64,${base64Image}`,
            },
            {
              type: 'text',
              text: 'Describe the image, include the gender, age, ethnicity, the items they are stealing.',
            },
          ],
        },
      ],
    });

    console.log('generated text', text);
    return text;
  } catch (error) {
    console.error('Error in generateDescriptions:', error);
  }
};
