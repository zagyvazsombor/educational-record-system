import { AppDataSource } from "../data-source";
import { Instructor } from "../entity/Instructor";
import { Controller } from "./base.controller";

export class InstructorController extends Controller{
  repository = AppDataSource.getRepository(Instructor)

  getAll = async (req, res) => {
    try {
      const entities = await this.repository.find({
        relations: ['subjects']
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
        relations: ['subjects']
      });
      if (!entity) return this.handleError(res, null, 404, 'No instructor exist with the give id');
      res.json(entity);
    } catch (err) {
      this.handleError(res, err);
    }
  };


}
