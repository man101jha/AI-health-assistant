export interface Message {
    content: string;
    sender: 'user' | 'ai';
    timestamp: Date;
  }
  
  export interface ApiResponse {
    answer: string;
  }
  
  export interface HealthResponse {
    status: string;
    service: string;
  }
