import { Controller } from "./base.controller";
import { AppDataSource } from "../data-source";
import { Course } from "../entity/Course";

export class CourseController extends Controller{
  repository = AppDataSource.getRepository(Course);

  getAll = async (req, res) => {
        try {
            const entities = await this.repository.find({
                relations: ['subject']
            });
            res.json(entities);
        } catch (err) {
            this.handleError(res, err);
        }
    };

    getOne = async (req, res) => {
        try {
            const id = req.params['id'];
            const entity = await this.repository.findOne({
                where: { id: id },
                relations: ['subject']
            });
            if (!entity) return this.handleError(res, null, 404, 'No course exist with the give id');
            res.json(entity);
        } catch (err) {
            this.handleError(res, err);
        }
    };
}
