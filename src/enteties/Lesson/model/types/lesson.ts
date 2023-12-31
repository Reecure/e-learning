import {type LessonType} from "@/shared/ui/course/ui/LessonContent/LessonContent";

export type Lesson = {
	id: string;
	title: string;
	order: number;
	author_id: string;
	module_id: string;
	lesson_type: LessonType | string;
	lesson_content: any[];
};
