import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { HealthResponse } from '../../models/message.model';

@Component({
  selector: 'app-health',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="health-badge" [ngClass]="isHealthy ? 'online' : 'offline'">
      <span class="dot"></span>
      {{ isHealthy ? 'System Online' : 'System Offline' }}
    </div>
  `,
  styles: [`
    .health-badge {
      display: inline-flex;
      align-items: center;
      padding: 5px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: bold;
      background: #f8f9fa;
      border: 1px solid #ddd;
    }
    .dot {
      height: 8px;
      width: 8px;
      border-radius: 50%;
      margin-right: 8px;
    }
    .online { color: #28a745; }
    .online .dot { background-color: #28a745; box-shadow: 0 0 5px #28a745; }
    .offline { color: #dc3545; }
    .offline .dot { background-color: #dc3545; }
  `]
})
export class HealthComponent implements OnInit {
  isHealthy = false;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.checkHealth();
  }

  checkHealth() {
    this.apiService.getHealth().subscribe({
      next: (res: HealthResponse) => {
        this.isHealthy = res.status === 'healthy';
      },
      error: () => {
        this.isHealthy = false;
      }
    });
  }
}
