import { DataSource } from "typeorm";
import { Course} from "./entity/Course";
import { Student } from "./entity/Student";
import { Enrollment } from "./entity/Enrollment";
import { Instructor } from "./entity/Instructor";
import { Subject } from "./entity/Subject";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    //password: "test",
    database: "educational_record",
    synchronize: true,
    logging: true,
    entities: [Course, Student, Enrollment, Instructor, Subject],
    subscribers: [],
    migrations: [],
});
