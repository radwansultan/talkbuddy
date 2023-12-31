import { Component, Input } from '@angular/core';
import { ChatsService } from '../chats/services/chats.service';
import { ChatMessage } from '../models/chatMessage.model';
import { ModalService } from '../directives/modal.sercive';

@Component({
  selector: 'app-chatmessage',
  templateUrl: './chatmessage.component.html',
  styleUrl: './chatmessage.component.scss',
})
export class ChatmessageComponent {
  @Input() chats: ChatMessage[] = [];
  selectedChatId!: string;
  newChatText!: string;

  constructor(
    private chatsSercive: ChatsService,
    public modalService: ModalService
  ) {}

  get isModalOpen(): boolean {
    return this.modalService.isOpen;
  }

  ngOnInit() {}

  getChatId(chatId: string) {
    this.selectedChatId = chatId;
    this.newChatText = '';
  }

  onDelete(chatId: string) {
    this.chatsSercive.deleteChat(chatId).subscribe({
      next: () => {
        this.chats = this.chats.filter((chat) => chat.chatId !== chatId);
      },
      error: (error) => {
        console.error('Failed to delete chat:', error);
      },
    });
  }

  onEditChat(chatId: string, newChatText: string) {
    this.chatsSercive.editChatText(chatId, newChatText).subscribe({
      next: () => {
        const chatToUpdateIndex = this.chats.findIndex(
          (chat) => chat.chatId === this.selectedChatId
        );
        if (chatToUpdateIndex !== -1) {
          this.chats[chatToUpdateIndex].chatText = newChatText;
        }
      },
      error: (error) => {
        console.error('Failed to update chat message:', error);
      },
      complete: () => {
        this.modalService.isOpen = false;
      },
    });
  }

  onClose() {
    this.modalService.closeModal();
  }

  isChatTextEmpty(): boolean {
    return this.newChatText.trim().length === 0;
  }
}
