/* Orchestrator Workflow
https://cdn.prod.website-files.com/64d4ce10600bd67e51c42838/678a6f6390cfb5848adaa342_678a6f39451494dd3a1aa1f9_Orchestrator-Workkers%2520Workflow.png
*/

import { localModel } from '@/utils/local-model';
import { CoreMessage, generateObject } from 'ai';
import { z } from 'zod';

/*
Our team will consist of a QA, a Developer, and a DevOps. We pass our feature request to our virtual Tech Lead, and he splits the tasks for estimation. Later, they estimate their tasks and get back to the Scrum Master to give us the final estimation in man days. 
*/

const pmMessage: CoreMessage = {
  role: 'user',
  content: `I want to add a simple account details screen in our NextJS application.`,
};

export async function orchestratorWorkflow() {
  const techLeadResponse = await generateObject({
    model: localModel,
    system: `
	  You are a tech lead. You receive a message from the PM,
    Your job is to delegate tasks to your team made of a QA, Developer and DevOps. 
    Split tasks for them to estimate.
  `,
    schema: z.object({
      qa_task: z.string(),
      developer_task: z.string(),
      dev_ops_task: z.string(),
    }),
    messages: [pmMessage],
  });

  const responseSchema = z.object({
    man_days_estimate: z.number(),
    reasoning: z.string(),
  });

  const qaResponse = generateObject({
    model: localModel,
    system: `
  	  You are a QA specialist. You receive a message from your Tech Lead,
      Your job is to estimate given task in man days, and provide reasoning behind it.
    `,
    schema: responseSchema,
    messages: [
      {
        role: 'user',
        content: `Task from your Tech Lead:
      ${techLeadResponse.object.qa_task}`,
      },
    ],
  });

  const developerResponse = generateObject({
    model: localModel,
    system: `
  	  You are a Developer. You receive a message from your Tech Lead,
      Your job is to estimate given task in man days, and provide reasoning behind it.
    `,
    schema: responseSchema,
    messages: [
      {
        role: 'user',
        content: `Task from your Tech Lead:
      ${techLeadResponse.object.developer_task}`,
      },
    ],
  });

  const devOpsResponse = generateObject({
    model: localModel,
    system: `
  	  You are a Dev Op. You receive a message from your Tech Lead,
      Your job is to estimate given task in man days, and provide reasoning behind it.
    `,
    schema: responseSchema,
    messages: [
      {
        role: 'user',
        content: `
  	      Task from your Tech Lead:
  		    ${techLeadResponse.object.dev_ops_task}
  	    `,
      },
    ],
  });

  const [qa, developer, devOps] = await Promise.all([
    qaResponse,
    developerResponse,
    devOpsResponse,
  ]);

  // Now that we have all the responses, let’s pass them to our Scrum Master for the final report.
  const scrumMasterResponse = await generateObject({
    model: localModel,
    system: `
	  You are a Scrum Master in team. You receive estimations from your team.
    Your task is to summarize the responses, voice issues, give feedback, and prepare the raport for PM
  `,
    schema: z.object({
      final_estimation: z.number(),
      issues: z.string().optional(),
      feedback: z.string(),
      raport_for_pm: z.string(),
    }),
    messages: [
      {
        role: 'user',
        content: `
        Task from pm: ${pmMessage.content}
        ---
        QA response:
        ${JSON.stringify(qa.object)}
        ---
        Developer response:
        ${JSON.stringify(developer.object)}
        ---
        Dev Ops response:
        ${JSON.stringify(devOps.object)}
      `,
      },
    ],
  });

  return scrumMasterResponse.object;
}
