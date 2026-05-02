import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SubjectDTO } from "../../../models";
import { Course } from "./Course";
import { Instructor } from "./Instructor";

@Entity()
export class Subject implements SubjectDTO{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Course, course => course.subject)
  courses: Course[]

  @ManyToMany(() => Instructor, instructor => instructor.subjects)
  instructors: Instructor[];
}
