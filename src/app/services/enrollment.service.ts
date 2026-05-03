import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { EnrollmentDTO } from './../../../models/index';

@Injectable({
  providedIn: 'root',
})
export class EnrollmentService {
  http = inject(HttpClient);

  getAll() {
    return this.http.get<EnrollmentDTO[]>('/api/enrollment');
  }

  getOne(id: number) {
    return this.http.get<EnrollmentDTO>('/api/enrollment/' + id);
  }

  create(enrollment: EnrollmentDTO) {
    return this.http.post<EnrollmentDTO>('/api/enrollment', enrollment);
  }

  update(enrollment: EnrollmentDTO) {
    return this.http.put<EnrollmentDTO>('/api/enrollment', enrollment);
  }

  delete(id: number) {
    return this.http.delete('/api/enrollment/' + id);
  }
}
