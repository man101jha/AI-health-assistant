import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './components/chat/chat.component';
import { UploadComponent } from './components/upload/upload.component';
import { HealthComponent } from './components/health/health.component';

import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ChatComponent, UploadComponent, HealthComponent], // ADD THESE
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Healthcare AI Assistant';
  loading$;

  constructor(private loadingService: LoadingService) {
    this.loading$ = this.loadingService.loading$;
  }
}
