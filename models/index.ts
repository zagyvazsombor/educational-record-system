import { Department, Grade, StudentGroup } from "./enums";

export interface SubjectDTO{
    id: number;
    name: string;
    courses: CourseDTO[];
}

export interface InstructorDTO{
    id: number;
    name: string;
    department: Department;
    subjects: SubjectDTO[];
}

export interface CourseDTO{
    id: number;
    name: string;
    subject: SubjectDTO;
}

export interface StudentDTO{
    id: number;
    name: string;
    group: StudentGroup;
    enrollments: EnrollmentDTO[];
}

export interface EnrollmentDTO{
    id: number;
    grade: Grade | null;
    student: StudentDTO;
    course: CourseDTO;
}
