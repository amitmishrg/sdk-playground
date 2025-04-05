/* Evaluator-Optimizer
The evaluator-optimizer is a pattern that is used to evaluate the performance of an agent and to optimize it.
https://cdn.prod.website-files.com/64d4ce10600bd67e51c42838/678a6f6390cfb5848adaa33f_678a6f565842c5647b61962a_Evaluator-Optimizer%2520Workflow.png
*/

import { localModel } from '@/utils/local-model';
import { CoreMessage, generateObject, generateText } from 'ai';
import { z } from 'zod';

const messages: CoreMessage[] = [
  { role: 'user', content: "Let's see your first draft!" },
];

export async function evaluatorOptimizerWorkflow() {
  let satisfied = false;
  let repetitions = 0;

  while (!satisfied && repetitions < 6) {
    const kewinsArticle = await generateText({
      model: localModel,
      system: `You are a writer. You write articles about AI.
            Your task is to write an article about AI agents, and to do it in only 5 sentences!
            You might get additional feedback from your supervisor!`,
      messages,
    });

    messages.push({ role: 'assistant', content: kewinsArticle.text });

    const supervisorFeedback = await generateObject({
      model: localModel,
      system: `You are a writers supervisor! Your agency specializes in 5 sentence long articles!
            Your task is to evaluate given work, and provide feedback for improvements!
            Repeat for as long as the article doesn't satisfy your requirements!`,
      schema: z.object({
        feedback: z.string(),
        satisfied: z.boolean(),
      }),
      messages,
    });

    if (supervisorFeedback.object.satisfied) {
      satisfied = true;
    }

    messages.push({
      role: 'user',
      content: supervisorFeedback.object.feedback,
    });

    repetitions = ++repetitions;
  }

  return messages;
}
