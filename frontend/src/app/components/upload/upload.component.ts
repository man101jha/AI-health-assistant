import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="upload-section">
    <button (click)="ingestDocs()" [disabled]="isIngesting">
      <span *ngIf="isIngesting" class="spinner"></span>
      {{ isIngesting ? 'Updating Library...' : 'Sync Documents' }}
    </button>
    <p *ngIf="statusMessage" class="status">{{ statusMessage }}</p>
  </div>
`,
styles: [`
  .spinner {
    display: inline-block;
    width: 12px;
    height: 12px;
    border: 2px solid #ffffff;
    border-top: 2px solid transparent;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    margin-right: 8px;
  }
  @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
  .upload-section { margin-bottom: 20px; padding: 15px; background: #e9f7ef; border-radius: 8px; }
  button { background: #28a745; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer; }
  .status { margin-top: 10px; font-size: 13px; color: #155724; }
`]
})
export class UploadComponent {
  isIngesting = false;
  statusMessage = '';

  constructor(private apiService: ApiService, private loadingService: LoadingService) { }

  ingestDocs() {
    this.isIngesting = true;
    this.statusMessage = 'Starting synchronization...';
    this.loadingService.setLoading(true);

    this.apiService.ingestDocs().subscribe({
      next: (res) => {
        this.statusMessage = 'Synchronization successful!';
        this.isIngesting = false;
        this.loadingService.setLoading(false);
        // Notify other components that library is updated
        this.apiService.onSyncComplete.emit();
      },
      error: (err) => {
        this.statusMessage = 'Error during synchronization.';
        this.isIngesting = false;
        this.loadingService.setLoading(false);
      }
    });
  }
}
