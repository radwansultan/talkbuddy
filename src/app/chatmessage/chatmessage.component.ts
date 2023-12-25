import { Component, Input } from '@angular/core';
import { ChatsService } from '../chats/services/chats.service';

@Component({
  selector: 'app-chatmessage',
  templateUrl: './chatmessage.component.html',
  styleUrl: './chatmessage.component.scss',
})
export class ChatmessageComponent {
  @Input() chats: {
    chatId: number;
    author: string;
    chatText: string;
  }[] = [];

  constructor(private chatsSercive: ChatsService) {}

  ngOnInit() {}

  onDelete(chatId: number) {
    this.chatsSercive.deleteChat(chatId);
  }

  onEditChat(chatId: number, newChatText: string) {
    this.chatsSercive.editChatText(chatId, newChatText);
  }
}
