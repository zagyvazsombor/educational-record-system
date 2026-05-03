import { Component, inject, OnInit, signal } from '@angular/core';
import { SubjectService } from '../services/subject.service';
import { Router } from '@angular/router';
import { SubjectDTO } from '../../../models';

@Component({
  selector: 'app-subject-list',
  imports: [],
  templateUrl: './subject-list.html',
  styleUrl: './subject-list.css',
})
export class SubjectList implements OnInit {
  subjectService = inject(SubjectService);
  router = inject(Router);
  subjects = signal<SubjectDTO[]>([]);

  ngOnInit(): void {
    this.subjectService.getAll().subscribe({
      next: (data) => { this.subjects.set(data); },
      error: (err) => {
        alert('Error during loading the subjects');
        console.error(err);
      }
    });
  }

  deleteSubject(subject: SubjectDTO) {
    if (!confirm(`Are you sure you want to delete "${subject.name}" subject?`)) return;

    this.subjectService.delete(subject.id).subscribe({
      next: () => {
        const currentSubjects = this.subjects();
        const index = currentSubjects.indexOf(subject);
        if (index > -1) {
          currentSubjects.splice(index, 1);
          this.subjects.set([...currentSubjects]);
        }
      },
      error: (err) => {
        alert('Error during deleting subject.');
        console.error('Error during deleting subject', err);
      }
    });
  }

  editSubject(subject: SubjectDTO) {
    this.router.navigate(['/subject-editor', subject.id]);
  }

  createSubject() {
    this.router.navigate(['/subject-editor']);
  }
}
