import express from 'express';
import { CourseController } from './controller/course.controller';
import { EnrollmentController } from './controller/enrollment.controller';
import { InstructorController } from './controller/instructor.controller';
import { SubjectController } from './controller/subject.controller';
import { StudentController } from './controller/student.controller';

export const appRouter = express.Router();

const courseController = new CourseController();
appRouter.get('/course', courseController.getAll);
appRouter.get('/course/:id', courseController.getOne);
appRouter.post('/course', courseController.create);
appRouter.put('/course', courseController.update);
appRouter.delete('/course/:id', courseController.delete);

const enrollmentController = new EnrollmentController();
appRouter.get('/enrollment', enrollmentController.getAll);
appRouter.get('/enrollment/:id', enrollmentController.getOne);
appRouter.post('/enrollment', enrollmentController.create);
appRouter.put('/enrollment', enrollmentController.update);
appRouter.delete('/enrollment/:id', enrollmentController.delete);

const instructorController = new InstructorController();
appRouter.get('/instructor', instructorController.getAll);
appRouter.get('/instructor/:id', instructorController.getOne);
appRouter.post('/instructor', instructorController.create);
appRouter.put('/instructor', instructorController.update);
appRouter.delete('/instructor/:id', instructorController.delete);

const subjectController = new SubjectController();
appRouter.get('/subject', subjectController.getAll);
appRouter.get('/subject/:id', subjectController.getOne);
appRouter.post('/subject', subjectController.create);
appRouter.put('/subject', subjectController.update);
appRouter.delete('/subject/:id', subjectController.delete);

const studentController = new StudentController();
appRouter.get('/student', studentController.getAll);
appRouter.get('/student/group/:group/average', studentController.getGroupAverage);
appRouter.get('/student/:id/average', studentController.getStudentAverage);
appRouter.get('/student/:id', studentController.getOne);
appRouter.post('/student', studentController.create);
appRouter.put('/student', studentController.update);
appRouter.delete('/student/:id', studentController.delete);
