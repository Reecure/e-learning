import {LessonType} from "@/shared/ui/course/ui/LessonContent/LessonContent";

export enum UserRoles {
    ADMIN = 'admin',
    USER = 'user',
    TEACHER = "teacher"
}

export interface UserProgress {
    course_id: string;
    is_completed: boolean
}

export interface ModuleProgress {
    module_id: string;
    course_id: string
    is_completed: boolean
}

export interface LessonProgress {
    lesson_id: string;
    module_id: string;
    lessonType: LessonType | string;
    quizScore?: number;
    is_completed: boolean;
}

export interface User {
    id: string
    courses: any
    avatar: string
    email: string
    firstname: string
    is_new_user: boolean
    lastname: string
    password: string
    registration_date: string
    role: UserRoles | string
    progress: UserProgress[];
}
