import { Message } from './message.interface';

export function isValidMessage(message: any): message is Message {
  return (
    typeof message === 'object' &&
    typeof message.sender === 'string' &&
    typeof message.text === 'string' &&
    typeof message.timestamp === 'string'
  );
}
