import { createOpenAICompatible } from '@ai-sdk/openai-compatible';

export const lmstudio = createOpenAICompatible({
  name: 'lmstudio',
  baseURL: `http://127.0.0.1:1234/v1/`,
});

export const localModel = lmstudio('gemma-2-2b-it');
