import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ChatsService {
  private chats: {
    chatId: number;
    author: string;
    chatText: string;
  }[] = [];
  constructor() {}

  getChats() {
    return this.chats;
  }

  addChat(chat: { chatId: number; author: string; chatText: string }) {
    this.chats.push(chat);
  }

  deleteChat(chatId: number) {
    const index = this.chats.findIndex((chat) => chat.chatId === chatId);
    if (index !== -1) {
      this.chats.splice(index, 1);
    }
  }

  editChatText(chatId: number, newChatText: string) {
    const chats = this.getChats();
    const chatIndex = chats.findIndex((chat) => chat.chatId === chatId);

    if (chatIndex !== -1) {
      chats[chatIndex].chatText = newChatText;
    }
  }
}
