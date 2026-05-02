import { Controller } from "./base.controller";
import { AppDataSource } from "../data-source";
import { Enrollment } from "../entity/Enrollment";
import { Course } from "../entity/Course";

export class EnrollmentController extends Controller{
  repository = AppDataSource.getRepository(Enrollment)

  create = async (req, res) => {
    try {
      const { student, course } = req.body;
      const courseRepo = AppDataSource.getRepository(Course);
      const targetCourse = await courseRepo.findOne({
        where: { id: course },
        relations: ['subject']
      });

      if(!targetCourse) return this.handleError(res, null, 404, 'No course exist with the given id');

      const existingEnrollments = await this.repository.find({
        where: { student: { id: student }},
        relations: ['course', 'course.subject']
      });

      const hasAlreadyTakenSubject = existingEnrollments.some(
         (x) => x.course.subject.id === targetCourse.subject.id);

      if (hasAlreadyTakenSubject) {
        return this.handleError(res, null, 400, 'The student has taken this subject previously')
      }

      const entityToCreate = this.repository.create(req.body);
      delete entityToCreate['id'];
      const entitySaved = await this.repository.save(entityToCreate);
      res.json(entitySaved);
    } catch (err) {
      this.handleError(res, err);
    }
  }
}
