import { createAI } from 'ai/rsc';
import { submitUserMessage } from './actions';

// create an AI context that will hold the UI State and AI State.
export const AI = createAI<React.ReactNode[], React.ReactNode[]>({
  initialUIState: [],
  initialAIState: [],
  actions: {
    submitUserMessage,
  },
});
