import { Injectable ,EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiResponse, HealthResponse } from '../models/message.model'; 

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.apiUrl;
  onSyncComplete = new EventEmitter<void>();

  constructor(private http: HttpClient) {}

  getHealth(): Observable<HealthResponse> {
    return this.http.get<HealthResponse>(`${this.baseUrl}/health`);
  }

  ingestDocs(): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/ingest`, {});
  }

  askQuestion(question: string): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.baseUrl}/ask`, { question });
  }
}
