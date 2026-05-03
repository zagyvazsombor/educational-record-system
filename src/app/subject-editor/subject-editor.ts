import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { SubjectDTO } from '../../../models';
import { FormsModule } from '@angular/forms';
import { SubjectService } from '../services/subject.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-subject-editor',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './subject-editor.html'
})
export class SubjectEditor implements OnInit {
  subject: SubjectDTO = { id: 0, name: '', courses: [] };

  subjectService = inject(SubjectService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  cdRef = inject(ChangeDetectorRef);

  isNew = true;

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    if (id) {
      this.isNew = false;
      this.subjectService.getOne(id).subscribe({
        next: (data) => {
          this.subject = data;
          this.cdRef.markForCheck();
        }
      });
    }
  }

  save() {
    const request = this.isNew
      ? this.subjectService.create(this.subject)
      : this.subjectService.update(this.subject);

    request.subscribe({
      next: () => this.router.navigateByUrl('/subjects'),
      error: (err) => console.error(err)
    });
  }

  cancel() {
    this.router.navigateByUrl('/subjects');
  }
}
