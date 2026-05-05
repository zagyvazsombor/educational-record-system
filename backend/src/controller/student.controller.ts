import { AppDataSource } from "../data-source";
import { Student } from "../entity/Student";
import { Controller } from "./base.controller";

export class StudentController extends Controller{
  repository = AppDataSource.getRepository(Student);

  getAll = async (req, res) => {
    try {
      const entities = await this.repository.find({
        relations: ['enrollments', 'enrollments.course', 'enrollments.course.subject']
      });
      res.json(entities);
    } catch(err) {
      this.handleError(res, err);
    }
  };

  getOne = async (req, res) => {
    try {
      const id = req.params['id'];
      const entity = await this.repository.findOne({
        where: { id: id },
        relations: ['enrollments', 'enrollments.course', 'enrollments.course.subject']
      });
      if (!entity) return this.handleError(res, null, 404, 'No student exist with the given id');
      res.json(entity);
    } catch(err) {
      this.handleError(res, err);
    }
  };

  // One student's average
  getStudentAverage = async (req, res) => {
    try {
      const id = req.params['id'];
      const student = await this.repository.findOne({
        where: { id: id },
        relations: ['enrollments']
      });

      if(!student) return this.handleError(res, null, 404, 'No student exist with the given id');

      const validGrades = student.enrollments.filter(x => x.grade !== null);
      if (validGrades.length === 0) return res.json({ average: 0 });

      const sum = validGrades.reduce((acc, curr) => acc + curr.grade, 0);
      const average = sum / validGrades.length;

      res.json({ average: average});

    } catch(err) {
      this.handleError(res, err);
    }
  };

  getGroupAverage = async (req, res) => {
    try {
      const groupName = req.params['group'];
      const studentsInGroup = await this.repository.find({
        where: { group: groupName},
        relations: ['enrollments']
      });

      let totalSum = 0;
      let totalGradesCount = 0;

      studentsInGroup.forEach(student => {
        student.enrollments.forEach(x => {
          if (x.grade !== null) {
            totalSum += Number(x.grade);
            totalGradesCount++;
          }
        });
      });

      const average = totalGradesCount === 0 ? 0 : totalSum / totalGradesCount;
      res.json({ average: average, group: groupName })
    } catch(err) {
      this.handleError(res, err);
    }
  };
}
