'use server';

import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
  organization: process.env.OPENAI_ORGANIZATION!,
});

export async function CheckVideoPlayback({ message }: { message: string }) {
  const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
    {
      role: 'system',
      content: `You are a video playback assistant for a security surveillance system. Your task is to determine if video playback is required based on the last chat message from an AI assistant, and if so, generate and provide the appropriate video URLs.

      Instructions:
      1. Always call the check_if_video_playback_required() function.
      2. Respond with a boolean (true/false) indicating if video playback is needed.
      3. If true, provide the relevant categories based on the chat message.
      4. If a video playback is required and if there are any specific conditions like gender, cloth color, section, the respond with the appropriate categories.

      #Below is a list of all the shoplifting categorised
      
      female_blue_pants

      female_black_pants

      female_black_jacket

      male_black_pants

      male_brown_pants

      male_black_jacket

      white_male

      dark_male

      male_blue_pants

      nike_bags

      old_man

      old_women

      kids_in_a_trolley

      bread_section

      frozen_food_section

      bakery_section

      candy_section

      soda_section

      hygiene_section

      canned_food_section

      cracker_and_biscuit_section

     `,
    },
    { role: 'user', content: message },
  ];
  const tools: OpenAI.Chat.ChatCompletionTool[] = [
    {
      type: 'function',
      function: {
        name: 'check_if_video_playback_required',
        description: 'Check if the chat message pair requires a video playback',
        parameters: {
          type: 'object',
          properties: {
            video_playback_required: {
              type: 'boolean',
              description: 'Whether a video playback is required',
            },
            // video_playback_urls: {
            //   type: 'array',
            //   items: {
            //     type: 'string',
            //   },
            //   description: 'An array of URLs for video playback',
            // },
            shoplifting_categories: {
              type: 'array',
              items: {
                type: 'string',
              },
              description: 'The category of shoplifting',
            },
          },
          required: ['video_playback_required', 'shoplifting_categories'],
        },
      },
    },
  ];

  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: messages,
    tools: tools,
    tool_choice: 'auto',
  });

  const res = response.choices[0].message.tool_calls?.[0].function.arguments;

  console.log(res);
  return res;
}

// `Here are the shoplifting instances for a 7 day period.

// Today: 34.mp4, 52.mp4, 2.mp4, 37.mp4, 4.mp4, 81.mp4, 119.mp4, 73.mp4, 57.mp4

// Yesterday: 67.mp4, 131.mp4, 89.mp4, 129.mp4, 11.mp4, 90.mp4, 80.mp4, 13.mp4, 92.mp4, 124.mp4, 132.mp4

// 3 days ago: 63.mp4, 117.mp4, 23.mp4, 25.mp4, 35.mp4, 27.mp4, 32.mp4, 42.mp4, 21.mp4, 103.mp4, 125.mp4, 82.mp4, 17.mp4

// 4 days ago: 107.mp4, 101.mp4, 93.mp4, 47.mp4, 74.mp4, 113.mp4, 88.mp4, 56.mp4, 53.mp4, 76.mp4

// 5 days ago: 10.mp4, 120.mp4, 7.mp4, 111.mp4, 19.mp4, 104.mp4, 98.mp4, 8.mp4, 105.mp4, 5.mp4, 1.mp4, 78.mp4

// 6 days ago: 48.mp4, 97.mp4, 43.mp4, 66.mp4, 75.mp4, 96.mp4, 28.mp4, 102.mp4, 24.mp4, 36.mp4, 3.mp4, 72.mp4, 62.mp4, 128.mp4, 64.mp4, 126.mp4

// 7 days ago: 33.mp4, 30.mp4, 123.mp4, 68.mp4, 84.mp4, 94.mp4, 140.mp4, 127.mp4`;

// Instructions:
//       1. Always call the check_if_video_playback_required() function.
//       2. Respond with a boolean (true/false) indicating if video playback is needed.
//       3. If true, generate and provide the relevant video URLs based on the criteria mentioned.
//       4. The URLs should be in the following format: /footage/<index>.mp4

//       Below is a list of all the shoplifting instances categorised based on different aspects, and the numbers are the video index (video IDs) of all the video instances for each categories.

//       If a video playback is required and if there are any specific conditions like gender, cloth color, section, the respond with the appropriate video indexes.

//       Female Blue Pants: 1, 4, 6, 7, 8, 11, 25, 15, 17, 37

//       Female Black Pants: 3, 5, 6, 9, 10, 16, 18, 8, 13

//       Female Black Jacket: 18, 25, 28, 37

//       Male Black Pants: 12, 14, 19, 20, 21, 23, 24, 32, 33, 34, 35, 38

//       Male Brown Pants: 26, 28, 29, 30, 31, 36, 41

//       Male Black Jacket: 19, 20, 21, 22, 23, 24, 27, 29, 30, 31, 32, 33, 34, 35, 36, 38, 39, 41

//       White Male: 12, 14, 19, 20, 21, 23, 22, 27, 32, 33, 34, 39, 24, 35, 38

//       Dark Male: 2, 26, 28, 29, 30, 31, 36, 41

//       Male Blue pants: 22, 27, 39

//       Nike Bags: 7, 34, 36, 24, 26, 30, 33, 35

//       Old man: 15

//       Old women: 17

//       Kids in a trolley: 41

//       Bread Section: 22, 30, 33, 36, 39, 27, 36

//       Frozen Food Section: 9

//       Bakery Section: 10, 13, 16, 18, 25

//       Candy Section: 11, 15, 17, 18, 26, 28, 29, 30, 31

//       Soda Section: 12, 14, 32, 33, 34, 35, 38

//       Hygiene Section: 19, 20, 21, 23, 24

//       Canned Food Section: 37

//       Cracker and Biscuit Section: 41

//       Construct the URL for each video as shown below
//       URL: /footage/<index>.mp4`,
