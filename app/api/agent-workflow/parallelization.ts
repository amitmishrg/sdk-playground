/*  Parallelization Workflow
https://cdn.prod.website-files.com/64d4ce10600bd67e51c42838/678a6f6390cfb5848adaa33c_678a6f207ad24f1b23ccaeaa_Parallelization%2520Workflow.png
*/

import { localModel } from '@/utils/local-model';
import { CoreMessage, generateObject, generateText } from 'ai';
import { z } from 'zod';

const userMessage: CoreMessage = {
  role: 'user',
  content: `
	  In this article we will cover AI Agents workflows. We hope to provide an explanation, but be aware, that in-depth explanation
    would be too long for all of them. So this time, we will focus on the idea behind workflows. In future, we can make separate articles
    and implement a more complex case, or even a working application for each of them.
  `,
};

export async function parallelizationWorkflow() {
  const germanResponse = generateText({
    model: localModel,
    system:
      'You are German Translator. Your job is to translate text received from user, and translate it to German. Respond only with translation!',
    messages: [userMessage],
  });

  const spanishResponse = generateText({
    model: localModel,
    system:
      'You are Spanish Translator. Your job is to translate text received from user, and translate it to Spanish. Respond only with translation!',
    messages: [userMessage],
  });

  const polishResponse = generateText({
    model: localModel,
    system:
      'You are Polish Translator. Your job is to translate text received from user, and translate it to Polish. Respond only with translation!',
    messages: [userMessage],
  });

  const [german, spanish, polish] = await Promise.all([
    germanResponse,
    spanishResponse,
    polishResponse,
  ]);

  // Now, we need an Agent that calls an Aggregator to make small corrections and give us all the translations. Aggregating Agents at the end grants us additional protection.
  const aggregateResponse = await generateObject({
    model: localModel,
    system: `You are tasked with aggregating translations of an article. 
  You can provide additional tweaks and fixes to formatting or translation. 
  You will receive a message with original, and then translations done with previous agents`,
    schema: z.object({
      original_text: z.string(),
      german_translation: z.string(),
      spanish_translation: z.string(),
      polish_translation: z.string(),
    }),
    messages: [
      {
        role: 'user',
        content: `
	      original: ${userMessage.content}
	      ---
	      german: ${german.text}
	      ---
	      spanish: ${spanish.text}
	      ---
	      polish: ${polish.text}
	    `,
      },
    ],
  });

  return aggregateResponse.object;
}
