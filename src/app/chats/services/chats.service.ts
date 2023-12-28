import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { ChatMessage } from '../../models/chatMessage.model';

@Injectable({
  providedIn: 'root',
})
export class ChatsService {
  private chatAddedSubject = new Subject<boolean>();
  chatAdded$ = this.chatAddedSubject.asObservable();

  constructor(private http: HttpClient) {}

  getChats(): Observable<ChatMessage[]> {
    return this.http
      .get<{ [key: string]: ChatMessage }>(
        'https://simplecrm2-963cd-default-rtdb.europe-west1.firebasedatabase.app/chatmessages.json'
      )
      .pipe(
        map((responseData) => {
          const chatmessagesArray: any = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              chatmessagesArray.push({ ...responseData[key], chatId: key });
            }
          }
          return chatmessagesArray;
        })
      );
  }

  addChat(chat: { author: string; chatText: string }) {
    this.http
      .post<{ chat: ChatMessage }>(
        'https://simplecrm2-963cd-default-rtdb.europe-west1.firebasedatabase.app/chatmessages.json',
        chat
      )
      .subscribe((responseData) => {
        if (responseData) {
          this.chatAddedSubject.next(true);
        }
      });
  }

  deleteChat(chatId: string) {
    return this.http.delete(
      `https://simplecrm2-963cd-default-rtdb.europe-west1.firebasedatabase.app/chatmessages/${chatId}.json`
    );
  }

  editChatText(chatId: string, newChatText: string) {
    const updatedChat = { chatText: newChatText };

    return this.http.patch(
      `https://simplecrm2-963cd-default-rtdb.europe-west1.firebasedatabase.app/chatmessages/${chatId}.json`,
      updatedChat
    );
  }
}
