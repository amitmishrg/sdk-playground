'use server';

import { streamUI } from 'ai/rsc';
import { z } from 'zod';
import { localModel } from '@/utils/local-model';
import { Flights } from '@/components/Flights';
import { FlightDetails } from '@/components/FlightDetails';
import { SearchLoader } from '@/components/SearchLoader';

const searchFlights = async (
  source: string,
  destination: string,
  date: string
) => {
  console.log(source, destination, date);
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return [
    {
      id: '1',
      flightNumber: 'AA123',
    },
    {
      id: '2',
      flightNumber: 'AA456',
    },
  ];
};

const lookupFlight = async (flightNumber: string) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  return {
    flightNumber: flightNumber,
    departureTime: '10:00 AM',
    arrivalTime: '12:00 PM',
  };
};

export async function submitUserMessage(input: string) {
  'use server';

  const ui = await streamUI({
    model: localModel,
    system: 'you are a flight booking assistant',
    prompt: input,
    text: async ({ content }) => (
      <div className="bg-gray-100 dark:bg-zinc-800 rounded-2xl py-2 px-4 max-w-[80%]">
        {content}
      </div>
    ),
    tools: {
      searchFlights: {
        description: 'search for flights',
        parameters: z.object({
          source: z.string().describe('The origin of the flight'),
          destination: z.string().describe('The destination of the flight'),
          date: z.string().describe('The date of the flight'),
        }),
        generate: async function* ({ source, destination, date }) {
          yield (
            <SearchLoader
              message={`Searching for flights from ${source} to ${destination} on ${date}...`}
            />
          );
          const results = await searchFlights(source, destination, date);
          return <Flights flights={results} />;
        },
      },
      lookupFlight: {
        description: 'lookup details for a flight',
        parameters: z.object({
          flightNumber: z.string().describe('The flight number'),
        }),
        generate: async function* ({ flightNumber }) {
          yield (
            <SearchLoader
              message={`Looking up details for flight ${flightNumber}...`}
            />
          );
          const details = await lookupFlight(flightNumber);
          return <FlightDetails {...details} />;
        },
      },
    },
  });

  return ui.value;
}

// const LoadingComponent = () => (
//   <div className="animate-pulse p-4">getting weather...</div>
// );

// const getWeather = async (location: string) => {
//   await new Promise((resolve) => setTimeout(resolve, 2000));
//   return `${location} 82°F️ ☀️`;
// };

// interface WeatherProps {
//   location: string;
//   weather: string;
// }

// const WeatherComponent = (props: WeatherProps) => (
//   <div className="border border-neutral-200 p-4 rounded-lg max-w-fit">
//     The weather in {props.location} is {props.weather}
//   </div>
// );

// export async function streamComponent() {
//   'use server';

//   const result = await streamUI({
//     model: localModel,
//     prompt: 'Get the weather for San Francisco',
//     text: ({ content }) => <div>{content}</div>,
//     tools: {
//       getWeather: {
//         description: 'Get the weather for a location',
//         parameters: z.object({
//           location: z.string(),
//         }),
//         generate: async function* ({ location }) {
//           yield <LoadingComponent />;
//           const weather = await getWeather(location);
//           return <WeatherComponent weather={weather} location={location} />;
//         },
//       },
//     },
//   });

//   return result.value;
// }
