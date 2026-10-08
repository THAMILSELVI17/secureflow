import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RecordItem {
  _id: string;
  recordId: string;
  title: string;
  description: string;
  ownerId: string;
  accessLevel: string;
  status: string;
}

export interface RecordResponse {
  success: boolean;
  count: number;
  data: RecordItem[];
}

@Injectable({
  providedIn: 'root'
})
export class Record {
  private apiUrl = 'https://secureflow-api-1lhe.onrender.com/api/records';

  constructor(private http: HttpClient) {}

  getRecords(): Observable<RecordResponse> {
    return this.http.get<RecordResponse>(this.apiUrl);
  }
}