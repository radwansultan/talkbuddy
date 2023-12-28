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
  chatMessageAdded: boolean = false;
  chatMessagedeleted: boolean = false;
  chatMesageEdited: boolean = false;
  isLoadingChatMessages: boolean = false;
  constructor(private chatsService: ChatsService) {}

  ngOnInit() {
    console.log('run');
    this.getChatMessages();
    this.checkAddedMessages();
    this.checkdeletedMessages();
    this.checkEditeddMessages();
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
      this.chatMessageAdded = added;
      this.getChatMessages();
      setTimeout(() => {
        this.chatMessageAdded = false;
      }, 2000);
    });
  }

  checkdeletedMessages() {
    this.chatsService.chatDeleted$.subscribe((deleted) => {
      this.chatMessagedeleted = deleted;
      console.log(deleted);
      setTimeout(() => {
        this.chatMessagedeleted = false;
      }, 2000);
    });
  }

  checkEditeddMessages() {
    this.chatsService.chatEdited$.subscribe((edited) => {
      this.chatMesageEdited = edited;
      console.log(edited);
      setTimeout(() => {
        this.chatMesageEdited = false;
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
