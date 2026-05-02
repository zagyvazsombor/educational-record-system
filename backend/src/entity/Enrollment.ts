import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { EnrollmentDTO } from "../../../models";
import { Grade } from "../../../models/enums"
import { Student } from "./Student";
import { Course } from "./Course";

@Entity()
@Unique(['student', 'course'])
export class Enrollment implements EnrollmentDTO{
  @PrimaryGeneratedColumn()
  id: number;

  @Column( {type: 'enum', enum: Grade, nullable: true })
  grade: number;

  @ManyToOne(() => Student, student => student.enrollments, {onDelete: 'CASCADE'})
  student: Student;

  @ManyToOne(() => Course, course => course.enrollments, { onDelete: 'CASCADE' })
  course: Course;
}
