type QueueItem = {
  key: string;
  payload: unknown;
};

const queue: QueueItem[] = [];

export async function enqueueForSync(key: string, payload: unknown) {
  queue.push({ key, payload });
  return queue.length;
}

export async function flushQueue() {
  const snapshot = [...queue];
  queue.length = 0;
  return snapshot;
}
