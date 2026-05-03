import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { InstructorDTO } from './../../../models/index';

@Injectable({
  providedIn: 'root',
})
export class InstructorService {
  http = inject(HttpClient);

  getAll() {
    return this.http.get<InstructorDTO[]>('/api/instructor');
  }

  getOne(id: number) {
    return this.http.get<InstructorDTO>('/api/instructor/' + id);
  }

  create(instructor: InstructorDTO) {
    return this.http.post<InstructorDTO>('/api/instructor', instructor);
  }

  update(instructor: InstructorDTO) {
    return this.http.put<InstructorDTO>('/api/instructor', instructor);
  }

  delete(id: number) {
    return this.http.delete('/api/instructor/' + id);
  }
}
