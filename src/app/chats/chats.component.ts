import { Component } from '@angular/core';
import { ChatMessage, ChatsService } from './services/chats.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrl: './chats.component.scss',
})
export class ChatsComponent {
  chatMessages: ChatMessage[] = [];
  chatmessageAdded: boolean = false;
  isLoadingChatMessages: boolean = false;
  constructor(private chatsService: ChatsService) {}

  ngOnInit() {
    this.getChatMessages();
    this.checkAddedMessages();
  }

  getChatMessages() {
    this.isLoadingChatMessages = true;
    this.chatsService.getChats().subscribe((chatMessages: ChatMessage[]) => {
      this.chatMessages = chatMessages;
      this.isLoadingChatMessages = false;
    });
  }

  checkAddedMessages() {
    this.chatsService.chatAdded$.subscribe((added) => {
      this.chatmessageAdded = added;
      this.getChatMessages();
      setTimeout(() => {
        this.chatmessageAdded = false;
      }, 2000);
    });
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const chatData = {
        chatId: this.generateChatId(),
        author: form.value.author,
        chatText: form.value.chatText,
      };
      this.chatsService.addChat(chatData);
      form.resetForm();
    }
  }

  private generateChatId(): number {
    return Math.floor(Math.random() * 1000);
  }
}
