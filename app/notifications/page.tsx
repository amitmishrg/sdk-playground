'use client';

import { experimental_useObject as useObject } from '@ai-sdk/react';
import { notificationSchema } from '../api/notifications/schema';
import { Spinner } from '@/components/Spinner';

export default function Page() {
  const { isLoading, object, stop, submit } = useObject({
    api: '/api/notifications',
    schema: notificationSchema,
  });

  return (
    <>
      {isLoading && (
        <div className="flex gap-2">
          <Spinner />
          <button className="text-red-500" type="button" onClick={() => stop()}>
            Stop
          </button>
        </div>
      )}

      <button
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => submit('Messages during finals week.')}
      >
        Generate notifications
      </button>

      <h2 className="mt-4">Notifications</h2>

      {object?.notifications?.map((notification, index) => (
        <div key={index}>
          <p>{notification?.name}</p>
          <p>{notification?.message}</p>
        </div>
      ))}
    </>
  );
}
