import { CourseDTO } from './../../../models/index';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Subject } from './Subject';
import { Enrollment } from './Enrollment';

@Entity()
export class Course implements CourseDTO {
  @PrimaryGeneratedColumn()
  id: number;

  @Column( {length: 50} )
  name: string;

  @ManyToOne(() => Subject, subject => subject.courses, { onDelete: 'CASCADE' })
  subject: Subject;

  @OneToMany(() => Enrollment, enrollment => enrollment.course)
  enrollments: Enrollment[];
}
