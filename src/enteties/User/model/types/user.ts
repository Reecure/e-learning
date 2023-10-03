import {LessonType} from "@/enteties/Lesson";

export enum UserRoles {
    ADMIN = "admin",
    USER = "user",
    TEACHER = "teacher",
}

export type CourseProgress = {
    course_id: string;
    is_completed: boolean;
    course_name: string
};

export type ModuleProgress = {
    module_id: string;
    course_id: string;
    is_completed: boolean;
    module_name: string
};

export type LessonProgress = {
    lesson_id: string;
    module_id: string;
    lesson_name: string
    lessonType: LessonType | string;
    quizScore?: number;
    is_completed: boolean;
};


export type User = {
    id: string;
    courses: string[];
    avatar: string;
    email: string;
    firstname: string;
    is_new_user: boolean;
    lastname: string;
    password: string;
    registration_date: string;
    role: UserRoles;
    modules_progress: ModuleProgress[];
    courses_progress: CourseProgress[];
    lessons_progress: LessonProgress[];

};
