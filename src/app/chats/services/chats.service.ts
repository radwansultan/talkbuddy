import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ChatMessage } from '../../models/chatMessage.model';
import { SubjectsService } from '../../subjects/subjects.service';
@Injectable({
  providedIn: 'root',
})
export class ChatsService {
  chatAdded$ = this.subjectsService.getSuccessSubject().asObservable();
  chatDeleted$ = this.subjectsService.getErrorSubject().asObservable();

  constructor(
    private http: HttpClient,
    private subjectsService: SubjectsService
  ) {}

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
          this.subjectsService.getSuccessSubject().next(true);
        }
      });
  }

  deleteChat(chatId: string) {
    this.subjectsService.getErrorSubject().next(true);
    return this.http.delete(
      `https://simplecrm2-963cd-default-rtdb.europe-west1.firebasedatabase.app/chatmessages/${chatId}.json`
    );
  }

  editChatText(chatId: string, newChatText: string) {
    this.subjectsService.getSuccessSubject().next(true);
    const updatedChat = { chatText: newChatText };

    return this.http.patch(
      `https://simplecrm2-963cd-default-rtdb.europe-west1.firebasedatabase.app/chatmessages/${chatId}.json`,
      updatedChat
    );
  }
}
