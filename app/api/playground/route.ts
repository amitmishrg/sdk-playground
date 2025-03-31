import { generateObject } from 'ai';
import { NextResponse } from 'next/server';
import { localModel } from '@/utils/local-model';
import { z } from 'zod';

export async function GET() {
  try {
    const { object } = await generateObject({
      model: localModel,
      schema: z.object({
        recipe: z.object({
          name: z.string(),
          ingredients: z.array(
            z.object({ name: z.string(), amount: z.string() })
          ),
          steps: z.array(z.string()),
        }),
      }),
      prompt: 'Generate a lasagna recipe.',
    });

    return NextResponse.json({ object });
  } catch (error: unknown) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
