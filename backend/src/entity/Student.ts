import { StudentGroup } from '../../../models/enums';
import { StudentDTO } from './../../../models/index';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Enrollment } from './Enrollment';

@Entity()
export class Student implements StudentDTO{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column( { type: 'enum', enum: StudentGroup})
  group: StudentGroup;

  @OneToMany(() => Enrollment, enrollment => enrollment.student)
  enrollments: Enrollment[];
}
