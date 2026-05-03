import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { SubjectDTO } from './../../../models/index';

@Injectable({
  providedIn: 'root',
})
export class SubjectService {
  http = inject(HttpClient);

  getAll() {
    return this.http.get<SubjectDTO[]>('/api/subject');
  }

  getOne(id: number) {
    return this.http.get<SubjectDTO>('/api/subject/' + id);
  }

  create(subject: SubjectDTO) {
    return this.http.post<SubjectDTO>('/api/subject', subject);
  }

  update(subject: SubjectDTO) {
    return this.http.put<SubjectDTO>('/api/subject', subject);
  }

  delete(id: number) {
    return this.http.delete('/api/subject/' + id);
  }
}
