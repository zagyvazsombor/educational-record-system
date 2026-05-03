import { ChangeDetectorRef, Component, inject, OnInit, signal } from '@angular/core';
import { StudentService } from '../services/student.service';
import { Router } from '@angular/router';
import { StudentDTO } from '../../../models';
import { StudentGroup } from '../../../models/enums';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-student-list',
  imports: [FormsModule],
  templateUrl: './student-list.html',
  styleUrl: './student-list.css',
})
export class StudentList implements OnInit {
  studentService = inject(StudentService);
  router = inject(Router);
  students = signal<StudentDTO[]>([]);
  cdRef = inject(ChangeDetectorRef);

  groups = Object.values(StudentGroup);
  selectedGroup: string = '';
  groupAverageResult: number | null = null;
  studentAverages: { [studentId: number]: number | string } = {};

  ngOnInit(): void {
    this.studentService.getAll().subscribe({
      next: (data) => { this.students.set(data); },
      error: (err) => {
        alert('Error during loading the students');
        console.error(err);
      }
    });
  }

  deleteStudent(student: StudentDTO) {
    if (!confirm(`Are you sure you want to delete "${student.name}" student?`)) return;

    this.studentService.delete(student.id).subscribe({
      next: () => {
        const currentStudents = this.students();
        const index = currentStudents.indexOf(student);
        if(index > -1) {
          currentStudents.splice(index, 1);
          this.students.set([...currentStudents]);
        }
      },
      error: (err) => {
        alert('Error during deleting students.');
        console.error('Error during deleting student', err);
      }
    });
  }

  editStudent(student: StudentDTO) {
    this.router.navigate(['/student-editor', student.id]);
  }

  createStudent() {
    this.router.navigate(['/student-editor']);
  }

calculateGroupAverage() {
    if (!this.selectedGroup) return;

    this.studentService.getGroupAverage(this.selectedGroup).subscribe({
      next: (res) => {
        this.groupAverageResult = res.average;
        this.cdRef.markForCheck(); // FRISSÍTJÜK A KÉPERNYŐT (Nincs több dupla kattintás!)
      },
      error: (err) => console.error('Hiba az átlag számításakor', err)
    });
  }

  calculateStudentAverage(id: number) {
    this.studentService.getStudentAverage(id).subscribe({
      next: (res) => {
        this.studentAverages[id] = res.average > 0 ? res.average.toFixed(2) : 'Nincs jegy';
        this.cdRef.markForCheck(); // FRISSÍTJÜK A KÉPERNYŐT ITT IS!
      },
      error: (err) => console.error('Hiba az átlag számításakor', err)
    });
  }

  onGroupChange() {
    this.groupAverageResult = null;
  }
}
