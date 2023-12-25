import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

export interface ChatMessage {
  chatText: string;
  author: string;
  chatId: number;
}

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
        'https://talkbuddy-262cb-default-rtdb.europe-west1.firebasedatabase.app/chatmessages.json'
      )
      .pipe(
        map((responseData) => {
          const chatmessagesArray = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              chatmessagesArray.push({ ...responseData[key] });
            }
          }
          return chatmessagesArray;
        })
      );
  }

  addChat(chat: ChatMessage) {
    this.http
      .post<{ chat: ChatMessage }>(
        'https://talkbuddy-262cb-default-rtdb.europe-west1.firebasedatabase.app/chatmessages.json',
        chat
      )
      .subscribe((responseData) => {
        if (responseData) {
          this.chatAddedSubject.next(true);
        }
      });
  }

  deleteChat(chatId: number) {
    // todo
  }

  editChatText(chatId: number, newChatText: string) {
    //todo
  }
}
