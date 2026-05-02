import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { InstructorDTO } from "../../../models";
import { Department } from "../../../models/enums";
import { Subject } from "./Subject";

@Entity()
export class Instructor implements InstructorDTO{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column( {type: 'enum', enum: Department})
    department: Department;

    @ManyToMany(() => Subject, subject => subject.instructors)
    @JoinTable()
    subjects: Subject[];
}
