import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Message } from '../../models/message.model';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  messages: Message[] = [];
  userInput: string = '';
  isLoading: boolean = false;

  constructor(private apiService: ApiService) { }
  ngOnInit(){
    this.addGreeting();
  // Listen for the "Sync Complete" broadcast
  this.apiService.onSyncComplete.subscribe(() => {
    this.messages = []; // Clear chat
    this.addGreeting(); // New greeting
  });
  }
  addGreeting() {
  this.messages.push({
    content: 'Hello! I am your Healthcare Assistant. The library has been updated with the latest documents. How can I help you today?',
    sender: 'ai',
    timestamp: new Date()
  });
}

  sendMessage() {
    if (!this.userInput.trim()) return;

    // 1. Add user message to the list
    const userMsg: Message = {
      content: this.userInput,
      sender: 'user',
      timestamp: new Date()
    };
    this.messages.push(userMsg);

    // 2. Clear input and show loading
    const query = this.userInput;
    this.userInput = '';
    this.isLoading = true;

    // 3. Call the API
    this.apiService.askQuestion(query).subscribe({
      next: (res) => {
        const aiMsg: Message = {
          content: res.answer,
          sender: 'ai',
          timestamp: new Date()
        };
        this.messages.push(aiMsg);
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  
}
