import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map, Observable } from 'rxjs';

export interface Message {
  sender: string;
  receiver: string;
  text: string;
  timestamp: number;
}

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private readonly messagesPath = 'messages';

  constructor(private db: AngularFireDatabase) {}
  getUsersMessagingUser(userId: string): Observable<string[]> {
    return this.db
      .list<Message>(`${this.messagesPath}/${userId}`, (ref) => ref.orderByChild('timestamp'))
      .valueChanges()
      .pipe(
        map((messages) => {
          const senders = new Set<string>();
          messages.forEach((message) => {
            if (message.sender !== userId) {
              senders.add(message.sender);
            }
          });
          return Array.from(senders);
        }),
      );
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getAllUserChat(): Observable<any[]> {
    return this.db
      .list<Message>(`${this.messagesPath}`, (ref) => ref.orderByChild('timestamp'))
      .snapshotChanges()
      .pipe(
        map((changes) => {
          return changes.map((change) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const message = change.payload.val() as any;
            const key = change.payload.key;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const messages: any[] = [];
            Object.keys(message).forEach((key) => {
              messages.push({
                id: key,
                ...message[key],
              });
            });
            return { id: key, messages : messages };
          });
        }),
      );
  }

  getMessagesByUserId(userId: string): Observable<Message[]> {
    return this.db
      .list<Message>(`${this.messagesPath}/${userId}`, (ref) => ref.orderByChild('timestamp'))
      .valueChanges();
  }

  sendMessageToUser(userId: string, text: string): void {
    const message: Message = {
      sender: '-OH8Ji1fTYf0VBeI0Zzy',
      receiver: userId,
      text,
      timestamp: Date.now(),
    };

    this.db.list(`${this.messagesPath}/${userId}`).push(message);
  }
}
