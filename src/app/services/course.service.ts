import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CourseDTO } from './../../../models/index';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  http = inject(HttpClient);

  getAll() {
    return this.http.get<CourseDTO[]>('/api/course');
  }

  getOne(id: number) {
    return this.http.get<CourseDTO>('/api/course/' + id);
  }

  create(course: CourseDTO) {
    return this.http.post<CourseDTO>('/api/course', course);
  }

  update(course: CourseDTO) {
    return this.http.put<CourseDTO>('/api/course', course);
  }

  delete(id: number) {
    return this.http.delete('/api/course/' + id);
  }
}
