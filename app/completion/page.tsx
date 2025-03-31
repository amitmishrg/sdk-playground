'use client';

import { Spinner } from '@/components/Spinner';
import { useCompletion } from '@ai-sdk/react';

export default function Page() {
  const { isLoading, completion, input, handleInputChange, handleSubmit } =
    useCompletion({
      api: '/api/completion',
    });

  if (isLoading) return <Spinner />;

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="prompt"
        value={input}
        onChange={handleInputChange}
        id="input"
      />
      <button type="submit">Submit</button>
      <div>{completion}</div>
    </form>
  );
}
