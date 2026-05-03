import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { InstructorDTO, SubjectDTO } from '../../../models';
import { Department } from '../../../models/enums';
import { FormsModule } from '@angular/forms';
import { InstructorService } from '../services/instructor.service';
import { SubjectService } from '../services/subject.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-instructor-editor',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './instructor-editor.html'
})
export class InstructorEditor implements OnInit {
  instructor: InstructorDTO = {
    id: 0,
    name: '',
    department: Department.GEIK_MAK,
    subjects: []
  };

  departments = Object.values(Department);
  allSubjects: SubjectDTO[] = [];
  selectedSubjectToAdd: SubjectDTO | null = null;

  instructorService = inject(InstructorService);
  subjectService = inject(SubjectService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  cdRef = inject(ChangeDetectorRef);

  isNew = true;

  ngOnInit(): void {
    // load subjects
    this.subjectService.getAll().subscribe(res => {
      this.allSubjects = res;
      this.cdRef.markForCheck();
    });

    const id = this.activatedRoute.snapshot.params['id'];
    if (id) {
      this.isNew = false;
      this.instructorService.getOne(id).subscribe(res => {
        this.instructor = res;
        this.cdRef.markForCheck();
      });
    }
  }

  addSubject() {
    if (this.selectedSubjectToAdd) {
      if (!this.instructor.subjects.some(s => s.id === this.selectedSubjectToAdd?.id)) {
        this.instructor.subjects.push(this.selectedSubjectToAdd);
        this.selectedSubjectToAdd = null;
        this.cdRef.markForCheck();
      } else {
        alert('Subject already taught');
      }
    }
  }

  removeSubject(index: number) {
    this.instructor.subjects.splice(index, 1);
    this.cdRef.markForCheck();
  }

  save() {
    const req = this.isNew ? this.instructorService.create(this.instructor) : this.instructorService.update(this.instructor);
    req.subscribe(() => this.router.navigateByUrl('/instructors'));
  }

  cancel() {
    this.router.navigateByUrl('/instructors');
  }
}
