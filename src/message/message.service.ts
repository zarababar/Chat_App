import { Injectable } from '@nestjs/common';
import { formatMessages, fileDestination } from './message.utils';
import { writeFile } from 'fs';
import { Message } from './message.interface';
import { isValidMessage } from './message.validation';
@Injectable()
export class MessageService {
  private messages: Message[] = []; // This should hold the messages

  archiveMessages() {
    if (this.messages.length === 0) {
      console.log('No new messages to save.');
      return; // No messages to save, exit the method
    }

    const filePath = fileDestination();

    // Format the content to be appended
    const content = formatMessages(this.messages);

    writeFile(filePath, content, (err) => {
      if (err) {
        console.error('Failed to save messages:', err);
      } else {
        console.log('Messages saved to', filePath);
        this.messages = [];
      }
    });
  }

  // Method to add messages with validation
  addMessage(message: any) {
    if (isValidMessage(message)) {
      this.messages.push(message);
    } else {
      console.warn('Invalid message format. Message not added:', message);
    }
  }
}
