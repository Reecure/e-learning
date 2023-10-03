export enum LessonType {
    TEXT = "TEXT",
    QUIZ = "QUIZ",
}

export enum LessonContentType {
    TEXT = "TEXT",
    IMAGE = "IMAGE",
    CODE = "CODE",
    VIDEO = "VIDEO",
}

export enum QuizContentType {
    DRAG_BLOCKS = " DRAG_BLOCKS",
    QUESTION_ANSWER = "QUESTION_ANSWER",
    ANSWER_WITH_FIXED_LETTERS = "ANSWER_WITH_FIXED_LETTERS",
    SORT_ANSWER = "SORT_ANSWER",
}

export interface ITextBlock {
    id: string;
    title: string;
    paragraphs: Array<{
        id: string;
        text: string;
    }>;
    type: LessonContentType.TEXT;
}

export interface ICodeBlock {
    id: string;
    type: LessonContentType.CODE;
    code: string;
}

export interface IImageBlock {
    id: string;
    type: LessonContentType.IMAGE;
    src: string;
    title: string;
}

export interface IVideoBlock {
    id: string;
    url: string;
    type: LessonContentType.VIDEO;
}


export type LessonBlocks = ITextBlock | ICodeBlock | IImageBlock | IVideoBlock;

export type QuestionAnswerBlock = {
    id: string;
    type: QuizContentType.QUESTION_ANSWER;
    question: string;
    correctAnswer: string;
    answer: Array<{
        otherAnswer: string;
    }>;
};

export type AnswerWithFixedLetters = {
    id: string;
    type: QuizContentType.ANSWER_WITH_FIXED_LETTERS;
    question: string;
    answer: string;
};

export type QuizBlocks = QuestionAnswerBlock | AnswerWithFixedLetters

export interface LessonsContent {
    blocks: LessonBlocks[] | QuizBlocks[];
}


export interface Lesson {
    id: string;
    title: string;
    order: number;
    author_id: string;
    is_visible: boolean;
    module_id: string;
    lesson_type: LessonType;
    lesson_content: LessonsContent;
}
