import { Component } from '@angular/core';
import { ChatsService } from './services/chats.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrl: './chats.component.scss',
})
export class ChatsComponent {
  defaultGender = 'male';

  constructor(private chatsSercive: ChatsService) {}

  ngOnInit() {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      const chatData = {
        chatId: this.generateChatId(),
        author: form.value.author,
        chatText: form.value.chatText,
      };
      this.chatsSercive.addChat(chatData);
      form.resetForm();
    }
  }

  private generateChatId(): number {
    return Math.floor(Math.random() * 1000);
  }
}
