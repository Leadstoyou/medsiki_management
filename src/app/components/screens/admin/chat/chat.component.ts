/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentService } from '#services/component.service';
import { ChatService, Message } from '#services/chat.service';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseComponent } from '#components/core/base/base.component';
import { FirebaseService } from '#services/firebase.service';
import * as moment from 'moment';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent extends BaseComponent implements OnInit {
  selectedUserId: string | null = null;
  messages$!: Observable<Message[]>; // Observable type
  message: string = '';
  messages: Message[] = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  userChats: any[] = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  listUser: any[] = [];
  adminId: string = '-OH8Ji1fTYf0VBeI0Zzy';
  @ViewChild('messagesContainer') messagesContainer!: ElementRef;
  constructor(
    private chatService: ChatService,
    protected componentService: ComponentService,
    private cdr: ChangeDetectorRef,
    private firebaseService: FirebaseService,
  ) {
    super(componentService);
  }

  ngOnInit(): void {
    this.chatService.getAllUserChat().subscribe({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      next: (data: any) => {
        this.userChats = ([...data]).sort((a, b) => b.timestamp - a.timestamp);
        this.cdr.detectChanges();
      },
    });
    this.firebaseService.getData('users').subscribe({
      next: (data) => {
        this.listUser.push(...data);
        this.cdr.detectChanges();
      },
    });
  }

  selectUser(userId: string): void {
    this.selectedUserId = userId;
    this.messages$ = this.chatService.getMessagesByUserId(userId);
    this.messages$.subscribe(messages => {
      this.messages = messages;
    });
  }

  sendMessage(): void {
    if (this.message.trim() && this.selectedUserId) {
      this.chatService.sendMessageToUser(this.selectedUserId, this.message);
      this.message = '';
    }
  }

  getUserImage(userId: string): string {
    const user = this.listUser.find((user) => user.id === userId);
    return user?.avatar ? `data:image/jpeg;base64,${user?.avatar}` : 'assets/images/default-user-avatar.jpg';
  }

  getUserName(userId: string): string {
    const user = this.listUser.find((user) => user.id === userId);
    return user?.fullName ? user?.fullName : 'Unknown';
  }

  getLastMessage(data: any): string {
    return data[data.length - 1].text;
  }

  getLastMessageTime(data: any): string {
    return moment(data[data.length - 1].timestamp).format('h:mm A');
  }

  shouldShowDateSeparator(index: any): boolean {
    if (!this.messages || this.messages.length === 0) return false; 
    if (index === 0) return true; 
  
    const currentMessageDate = new Date(this.messages[index].timestamp);
    const previousMessageDate = new Date(this.messages[index - 1].timestamp);
  
    return currentMessageDate.toDateString() !== previousMessageDate.toDateString();
  }
  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }
  private scrollToBottom(): void {
    try {
      this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Error scrolling to bottom:', err);
    }
  }
}
