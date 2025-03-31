import { localModel } from '@/utils/local-model';
import { tools } from '@/utils/tools';
import { streamText } from 'ai';

export async function POST(request: Request) {
  const { messages } = await request.json();

  const result = streamText({
    model: localModel,
    system: 'You are a friendly assistant!',
    messages,
    maxSteps: 5,
    tools,
  });

  return result.toDataStreamResponse();
}
