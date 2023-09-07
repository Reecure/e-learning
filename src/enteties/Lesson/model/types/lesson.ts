import {LessonType} from "@/shared/ui/course/ui/LessonContent/LessonContent";

export interface Lesson {
    id: string
    title: string
    order: number
    module_id: string
    lesson_type: LessonType
    lesson_content: []
}


