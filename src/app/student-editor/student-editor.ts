import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CourseDTO, EnrollmentDTO, StudentDTO } from '../../../models';
import { StudentGroup } from '../../../models/enums';
import { FormsModule } from '@angular/forms';
import { StudentService } from '../services/student.service';
import { CourseService } from '../services/course.service';
import { EnrollmentService } from '../services/enrollment.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-student-editor',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './student-editor.html'
})
export class StudentEditor implements OnInit {
  student: StudentDTO = {
    id: 0,
    name: '',
    group: StudentGroup.G1BI1,
    enrollments: []
  };

  groups = Object.values(StudentGroup);
  Courses: CourseDTO[] = [];
  selectedCourseIdToAdd: number | null = null;

  studentService = inject(StudentService);
  courseService = inject(CourseService);
  enrollmentService = inject(EnrollmentService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  cdRef = inject(ChangeDetectorRef);

  isNew = true;

  ngOnInit(): void {
    //load every course and related subjects
    this.courseService.getAll().subscribe(res => {
      this.Courses = res;
      this.cdRef.markForCheck();
    });

    const id = this.activatedRoute.snapshot.params['id'];
    if (id) {
      this.isNew = false;
      this.loadStudent(id);
    }
  }

  loadStudent(id: number) {
    this.studentService.getOne(id).subscribe(res => {
      this.student = res;
      this.cdRef.markForCheck();
    });
  }

  saveStudentInfo() {
    const req = this.isNew
      ? this.studentService.create(this.student)
      : this.studentService.update(this.student);

    req.subscribe({
      next: (savedStudent) => {
        if (this.isNew) {
          // If new, sending to editor to assign courses
          this.router.navigate(['/student-editor', savedStudent.id]);
        } else {
          this.router.navigate(['/students']);
        }
      },
      error: (err) => alert('Error during saving basic informations')
    });
  }

  addCourse() {
    if (this.selectedCourseIdToAdd) {
      const newEnrollment = {
        student: this.student.id,
        course: this.selectedCourseIdToAdd,
        grade: null
      };

      this.enrollmentService.create(newEnrollment as any).subscribe({
        next: () => {
          this.selectedCourseIdToAdd = null;
          this.loadStudent(this.student.id);
        },
        error: (err) => {
          const errorMessage = err.error?.error || 'Error during enrollment';
          alert(errorMessage);
        }
      });
    }
  }

  updateGrade(enrollment: EnrollmentDTO) {
    enrollment.grade = enrollment.grade ? Number(enrollment.grade) : null;

    this.enrollmentService.update(enrollment).subscribe({
      next: () => alert('Jegy sikeresen elmentve!'),
      error: (err) => alert('Hiba a jegy mentésekor!')
    });
  }

  removeEnrollment(enrollmentId: number) {

    this.enrollmentService.delete(enrollmentId).subscribe({
      next: () => this.loadStudent(this.student.id),
      error: (err) => alert('Hiba a leadás során!')
    });
  }

  back() {
    this.router.navigateByUrl('/students');
  }
}
