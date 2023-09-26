import {type LessonType} from "@/shared/ui/course/ui/LessonContent/LessonContent";

export enum UserRoles {
	ADMIN = "admin",
	USER = "user",
	TEACHER = "teacher",
}

export type UserProgress = {
	course_id: string;
	is_completed: boolean;
};

export type ModuleProgress = {
	module_id: string;
	course_id: string;
	is_completed: boolean;
};

export type LessonProgress = {
	lesson_id: string;
	module_id: string;
	lessonType: LessonType | string;
	quizScore?: number;
	is_completed: boolean;
};

export type User = {
	id: string;
	courses: any;
	avatar: string;
	email: string;
	firstname: string;
	is_new_user: boolean;
	lastname: string;
	password: string;
	registration_date: string;
	role: UserRoles | string;
	modules_progress: any[];
	courses_progress: any[];
	lessons_progress: any[];

};
