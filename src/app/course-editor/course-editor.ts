import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CourseDTO, SubjectDTO } from '../../../models';
import { FormsModule } from '@angular/forms';
import { CourseService } from '../services/course.service';
import { SubjectService } from '../services/subject.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-course-editor',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './course-editor.html'
})
export class CourseEditor implements OnInit {
  course: CourseDTO = {
    id: 0,
    name: '',
    subject: { id: 0, name: '', courses: [] }
  };

  subjects: SubjectDTO[] = [];

  courseService = inject(CourseService);
  subjectService = inject(SubjectService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  cdRef = inject(ChangeDetectorRef);

  isNew = true;

  ngOnInit(): void {
    this.subjectService.getAll().subscribe(data => {
      this.subjects = data;
      this.cdRef.markForCheck();
    });

    const id = this.activatedRoute.snapshot.params['id'];
    if (id) {
      this.isNew = false;
      this.courseService.getOne(id).subscribe(data => {
        this.course = data;
        this.cdRef.markForCheck();
      });
    }
  }

  save() {
    const request = this.isNew
      ? this.courseService.create(this.course)
      : this.courseService.update(this.course);

    request.subscribe({
      next: () => this.router.navigateByUrl('/courses')
    });
  }

    cancel() {
    this.router.navigateByUrl('/courses');
  }

  compareSubjects(s1: SubjectDTO, s2: SubjectDTO): boolean {
    return s1 && s2 ? s1.id === s2.id : s1 === s2;
  }
}
