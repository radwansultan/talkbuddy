import { Component } from '@angular/core';
import { ChatsService } from './services/chats.service';
import { NgForm } from '@angular/forms';
import { ChatMessage } from '../models/chatMessage.model';

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
    this.chatsService.getChats().subscribe({
      next: (chatMessages: ChatMessage[]) => {
        this.chatMessages = chatMessages;
        this.isLoadingChatMessages = false;
      },
      error: (error) => {
        console.error('Failed to retrieve chat messages:', error);
        this.isLoadingChatMessages = false;
      },
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
        author: form.value.author,
        chatText: form.value.chatText,
      };
      this.chatsService.addChat(chatData);
      form.resetForm();
    }
  }
}
