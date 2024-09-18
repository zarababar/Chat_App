import * as path from 'path';
export function fileDestination(): string {
  return path.resolve(
    __dirname,
    '../../src/archives',
    `messages_${Date.now()}.txt`,
  );
}

export function formatMessages(
  messages: { sender: string; text: string; timestamp: string }[],
): string {
  return messages
    .map(
      (msg) =>
        `Sender: ${msg.sender}\n` +
        `Timestamp: ${msg.timestamp}\n` +
        `Message: ${msg.text}\n` +
        `--------------------------------------\n`,
    )
    .join('\n');
}
