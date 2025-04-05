import { NextResponse } from 'next/server';
import { chainingWorkflow } from './chaining';
import { routingWorkflow } from './routing';
import { parallelizationWorkflow } from './parallelization';
import { orchestratorWorkflow } from './orchestrator';
import { evaluatorOptimizerWorkflow } from './evaluator-optimizer';

export async function GET() {
  //   const result = await chainingWorkflow();
  //   const result = await routingWorkflow();
  //   const result = await parallelizationWorkflow();
  //   const result = await orchestratorWorkflow();

  const result = await evaluatorOptimizerWorkflow();

  return NextResponse.json(result);
}
