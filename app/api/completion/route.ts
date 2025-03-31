import { localModel } from '@/utils/local-model';
import { streamText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { prompt }: { prompt: string } = await req.json();

  const result = streamText({
    model: localModel,
    prompt,
  });

  return result.toDataStreamResponse();
}
