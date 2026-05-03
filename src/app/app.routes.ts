import { InstructorList } from './instructor-list/instructor-list';
import { Routes } from '@angular/router';
import { StudentList } from './student-list/student-list';
import { SubjectList } from './subject-list/subject-list';
import { CourseList } from './course-list/course-list';
import { SubjectEditor } from './subject-editor/subject-editor';
import { CourseEditor } from './course-editor/course-editor';
import { InstructorEditor } from './instructor-editor/instructor-editor';
import { StudentEditor } from './student-editor/student-editor';


export const routes: Routes = [
  {
    path: '',
    component: InstructorList
  },
  {
    path: 'instructors',
    component: InstructorList
  },
  {
    path: 'students',
    component: StudentList
  },
  {
    path: 'subjects',
    component: SubjectList
  },
  {
    path: 'courses',
    component: CourseList
  },
  {
    path: 'subject-editor',
    component: SubjectEditor
  },
  {
    path: 'subject-editor/:id',
    component: SubjectEditor
  },
  {
    path: 'course-editor',
    component: CourseEditor
  },
  {
    path: 'course-editor/:id',
    component: CourseEditor
  },
  {
    path: 'instructor-editor',
    component: InstructorEditor
  },
  {
    path: 'instructor-editor/:id',
    component: InstructorEditor
  },
  {
    path: 'student-editor',
    component: StudentEditor
  },
  {
    path: 'student-editor/:id',
    component: StudentEditor
  },
];
