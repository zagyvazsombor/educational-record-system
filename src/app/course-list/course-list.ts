import { Component, inject, OnInit, signal } from '@angular/core';
import { CourseDTO } from '../../../models';
import { CourseService } from '../services/course.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-list',
  imports: [],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css',
})
export class CourseList implements OnInit {
  courseService = inject(CourseService);
  router = inject(Router);
  courses = signal<CourseDTO[]>([]);

  ngOnInit(): void {
    this.courseService.getAll().subscribe({
      next: (data) => { this.courses.set(data); },
      error: (err) => {
        alert('Error during loading the courses');
        console.error(err);
      }
    });
  }

  deleteCourse(course: CourseDTO) {
    if (!confirm(`Are you sure you want to delete "${course.name}" course?`)) return;

    this.courseService.delete(course.id).subscribe({
      next: () => {
        const currentCourses = this.courses();
        const index = currentCourses.indexOf(course);
        if (index > -1) {
          currentCourses.splice(index, 1);
          this.courses.set([...currentCourses]);
        }
      },
      error: (err) => {
        alert('Error during deleting courses.');
        console.error('Error during deleting courses', err);
      }
    });
  }

  editCourse(course: CourseDTO) {
    this.router.navigate(['/course-editor', course.id]);
  }

  createCourse() {
    this.router.navigate(['/course-editor']);
  }
}
