import { localModel } from '@/utils/local-model';
import { streamText, tool } from 'ai';
import { z } from 'zod';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  try {
    const result = streamText({
      model: localModel,
      messages,
      toolCallStreaming: true,
      tools: {
        //   weather: tool({
        //     description: 'Get the weather in a location (fahrenheit)',
        //     parameters: z.object({
        //       location: z
        //         .string()
        //         .describe('The location to get the weather for'),
        //     }),
        //     execute: async ({ location }) => {
        //       const temperature = Math.round(Math.random() * (90 - 32) + 32);
        //       return {
        //         location,
        //         temperature,
        //       };
        //     },
        //   }),
        //   convertFahrenheitToCelsius: tool({
        //     description: 'Convert a temperature in fahrenheit to celsius',
        //     parameters: z.object({
        //       temperature: z
        //         .number()
        //         .describe('The temperature in fahrenheit to convert'),
        //     }),
        //     execute: async ({ temperature }) => {
        //       const celsius = Math.round((temperature - 32) * (5 / 9));
        //       return {
        //         celsius,
        //       };
        //     },
        //   }),
        // server-side tool with execute function:
        getWeatherInformation: tool({
          description:
            'Show the weather in a given city. IMPORTANT: Must use getLocation tool first, then askForConfirmation before checking weather.',
          parameters: z.object({
            city: z.string().describe('The city to check weather for'),
          }),
          execute: async () => {
            const weatherOptions = [
              'sunny',
              'cloudy',
              'rainy',
              'snowy',
              'windy',
            ];
            return weatherOptions[
              Math.floor(Math.random() * weatherOptions.length)
            ];
          },
        }),
        // client-side tool that starts user interaction:
        askForConfirmation: tool({
          description:
            'Ask the user for confirmation before checking weather information.',
          parameters: z.object({
            message: z
              .string()
              .describe('The message to ask for confirmation.'),
          }),
        }),
        // client-side tool that is automatically executed on the client:
        getLocation: tool({
          description:
            'Get the user location first before checking weather. This should be the first tool used in weather requests.',
          parameters: z.object({}),
        }),
      },
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.log(error, 'error');
  }
}
