/*  Routng Workflow
https://cdn.prod.website-files.com/64d4ce10600bd67e51c42838/678a6f6390cfb5848adaa355_678a6efeb6713368bb51f131_Routing%2520Workflow.png
*/

import { localModel } from '@/utils/local-model';
import { generateObject, generateText } from 'ai';
import { z } from 'zod';

const agentTypes = ['technical', 'account', 'finance', 'unknown'] as const;

const agents = {
  technical:
    'You are a tech specialist. Clients call you with technical problems.',
  account:
    'You are an account manager. Clients call you with topics related to their account.',
  finance:
    'You are finance specialist. Clients call you with finance related topics.',
};

export async function routingWorkflow() {
  const routingResponse = await generateObject({
    model: localModel,
    system:
      'You are a first point of contact for a call center. Your job is to redirect the client to a correct agent.',
    schema: z.object({
      agent_type: z.enum(agentTypes),
    }),
    messages: [
      {
        role: 'user',
        content: `
	      Hi! I want to cancel my subscription now! I am very unhappy and mad.
      `,
      },
    ],
  });

  if (routingResponse.object.agent_type === 'unknown') {
    process.exit(1);
  }

  const response = await generateText({
    model: localModel,
    system: agents[routingResponse.object.agent_type],
    messages: [
      {
        role: 'user',
        content: `Hi! I want to cancel my subscription now! I am very unhappy and mad.`,
      },
    ],
  });

  return response.text;
}
