import { Component, inject, OnInit, signal } from '@angular/core';
import { InstructorService } from '../services/instructor.service';
import { Router } from '@angular/router';
import { InstructorDTO } from '../../../models';

@Component({
  selector: 'app-instructor-list',
  imports: [],
  templateUrl: './instructor-list.html',
  styleUrl: './instructor-list.css',
})
export class InstructorList implements OnInit{
  instructorService = inject(InstructorService);
  router = inject(Router);

  instructors = signal<InstructorDTO[]>([]);

  ngOnInit(): void {
    this.instructorService.getAll().subscribe({
      next: (data) => { this.instructors.set(data); },
      error: (err) => {
        alert('Error during loading the instructors');
        console.error(err);
      }
    });
  }

  deleteInstructor(instructor: InstructorDTO) {
    if (!confirm(`Are you sure you want to delete "${instructor.name}" instructor?`)) return;

    this.instructorService.delete(instructor.id).subscribe({
      next: () => {
        const currentInstructors = this.instructors();
        const index = currentInstructors.indexOf(instructor);
        if (index > -1) {
          currentInstructors.splice(index, 1);
          this.instructors.set([...currentInstructors]);
        }
      },
      error: (err) => {
        alert('Error during deleting instructor.');
        console.error('Error during deleting instructor', err);
      }
    });
  }

  editInstructor(instructor: InstructorDTO) {
    this.router.navigate(['/instructor-editor', instructor.id]);
  }

  createInstructor() {
    this.router.navigate(['/instructor-editor']);
  }
}
