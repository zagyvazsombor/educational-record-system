import { Subject } from "../entity/Subject";
import { AppDataSource } from "../data-source";
import { Controller } from "./base.controller";

export class SubjectController extends Controller{
  repository = AppDataSource.getRepository(Subject);
}
