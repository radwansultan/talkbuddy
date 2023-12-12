import { Component } from '@angular/core';
import { ChatsService } from '../chats/services/chats.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-chatmessage',
  templateUrl: './chatmessage.component.html',
  styleUrl: './chatmessage.component.scss',
})
export class ChatmessageComponent {
  chats: {
    chatId: number;
    author: string;
    chatText: string;
  }[] = [];

  constructor(private chatsSercive: ChatsService) {}

  ngOnInit() {
    this.chats = this.chatsSercive.getChats();
  }

  onDelete(chatId: number) {
    this.chatsSercive.deleteChat(chatId);
  }

  onEditChat(chatId: number, newChatText: string) {
    this.chatsSercive.editChatText(chatId, newChatText);
  }
}
