/*  Chaining Workflow
https://www.callstack.com/blog/building-ai-agent-workflows-with-vercels-ai-sdk-a-practical-guide
https://cdn.prod.website-files.com/64d4ce10600bd67e51c42838/678a6f6290cfb5848adaa32f_678a6ed79b8844c72ec646d0_Chaining%2520Workflow.png
*/

import { localModel } from '@/utils/local-model';
import { generateObject } from 'ai';
import { z } from 'zod';

export async function chainingWorkflow() {
  const firstResponse = await generateObject({
    model: localModel,
    system:
      'You are a first point of contact for a loan company. Your job is to turn client conversation into loan application.',
    schema: z.object({
      name: z.string(),
      loan_amount: z.number(),
      loan_time_in_months: z.number(),
      monthly_income: z.number(),
    }),
    messages: [
      {
        role: 'user',
        content: `
    Hi! My name is Kewin. 
    I'd like to ask for a loan. 
    I need 2000$. 
    I can pay it back in a year. 
    My salary is 3000$ a month
    `,
      },
    ],
  });

  const gateResponse = await generateObject({
    model: localModel,
    system:
      'You are a loan specialist. Based on the given json file with client data, your job is to decide if a client can be further processed.',
    schema: z.object({
      is_client_accepted: z.boolean(),
      denial_reason: z
        .string()
        .optional()
        .describe('If client is rejected, you need to give a reason.'),
    }),
    messages: [{ role: 'user', content: JSON.stringify(firstResponse.object) }],
  });

  return gateResponse.object;
}
