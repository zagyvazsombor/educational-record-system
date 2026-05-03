import { StudentDTO } from './../../../models/index';
import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  http = inject(HttpClient);

  getAll() {
    return this.http.get<StudentDTO[]>('/api/student');
  }

  getOne(id: number) {
    return this.http.get<StudentDTO>('/api/student/' + id);
  }

  create(student: StudentDTO) {
    return this.http.post<StudentDTO>('/api/student', student);
  }

  update(student: StudentDTO) {
    return this.http.put<StudentDTO>('/api/student', student);
  }

  delete(id: number) {
    return this.http.delete('/api/student/' + id);
  }

  getStudentAverage(id: number) {
    return this.http.get<{ average: number }>('/api/student/' + id + '/average');
  }

  getGroupAverage(group: string) {
    return this.http.get<{ average: number, group: string}>('/api/student/group/' + group + '/average');
  }
}
