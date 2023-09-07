import {FC, useEffect} from 'react';
import {trpc} from "@/shared/utils/trpc";
import TextBlock from "@/shared/ui/course/ui/CourseBlocks/TextBlock";
import CodeBlock from "@/shared/ui/course/ui/CourseBlocks/CodeBlock";
import ImageBlock from "@/shared/ui/course/ui/CourseBlocks/ImageBlock";

export enum LessonContentType {
    TEXT = 'TEXT',
    IMAGE = 'IMAGE',
    CODE = 'CODE'
}

export enum LessonType {
    VIDEO = 'VIDEO',
    TEXT = 'TEXT',
    QUIZ = 'QUIZ'
}

const lesson = {
    "order": 1,
    "title": "What is React",
    "lesson_content":
        [{
            "id": "9gRkY2Jpld1bXfz9ZUMWI",
            "title": "Introduction",
            "paragraphs": [
                {
                    "id": "4jRNjS8zljedQ7mSGwEkx",
                    "text": "JavaScript has come a long way since its inception in 1995. Over the years, numerous frameworks have emerged to make web development more efficient and organized. In this article, we will explore the evolution of JavaScript frameworks and how they have shaped the modern web development landscape."
                },
                {
                    "id": "MwkiKXGsm2mz9F3GdpHBD",
                    "text": "Let's dive into the history of JavaScript frameworks and understand the significant milestones along the way."
                }
            ],
            "type": "TEXT"
        },
            {
                "id": "9gRkY2Jpld1bXfz9ZUMWI",
                "title": "Introduction",
                "paragraphs": [
                    {
                        "id": "4jRNjS8zljedQ7mSGwEkx",
                        "text": "JavaScript has come a long way since its inception in 1995. Over the years, numerous frameworks have emerged to make web development more efficient and organized. In this article, we will explore the evolution of JavaScript frameworks and how they have shaped the modern web development landscape."
                    },
                    {
                        "id": "MwkiKXGsm2mz9F3GdpHBD",
                        "text": "Let's dive into the history of JavaScript frameworks and understand the significant milestones along the way."
                    }
                ],
                "type": "TEXT"
            },
            {
                "id": "9gRkY2Jpld1bXfz9ZUMWI",
                "title": "Introduction",
                "paragraphs": [
                    {
                        "id": "4jRNjS8zljedQ7mSGwEkx",
                        "text": "JavaScript has come a long way since its inception in 1995. Over the years, numerous frameworks have emerged to make web development more efficient and organized. In this article, we will explore the evolution of JavaScript frameworks and how they have shaped the modern web development landscape."
                    },
                    {
                        "id": "MwkiKXGsm2mz9F3GdpHBD",
                        "text": "Let's dive into the history of JavaScript frameworks and understand the significant milestones along the way."
                    }
                ],
                "type": "TEXT"
            },
            {
                "id": "9gRkY2Jpld1bXfz9ZUMWI",
                "title": "Introduction",
                "paragraphs": [
                    {
                        "id": "4jRNjS8zljedQ7mSGwEkx",
                        "text": "JavaScript has come a long way since its inception in 1995. Over the years, numerous frameworks have emerged to make web development more efficient and organized. In this article, we will explore the evolution of JavaScript frameworks and how they have shaped the modern web development landscape."
                    },
                    {
                        "id": "MwkiKXGsm2mz9F3GdpHBD",
                        "text": "Let's dive into the history of JavaScript frameworks and understand the significant milestones along the way."
                    }
                ],
                "type": "TEXT"
            },
            {
                "id": "9gRkY2Jpld1bXfz9ZUMWI",
                "src": "https://miro.medium.com/v2/resize:fit:1400/1*R1mfXLP9edcArZXwmGbGag.jpeg",
                "title": "Figure 3 - The Rise of AngularJS",
                "type": "IMAGE"
            },
            {
                "id": "9gRkY2Jpld1bXfz9ZUMWI",
                "title": "Introduction",
                "paragraphs": [
                    {
                        "id": "4jRNjS8zljedQ7mSGwEkx",
                        "text": "JavaScript has come a long way since its inception in 1995. Over the years, numerous frameworks have emerged to make web development more efficient and organized. In this article, we will explore the evolution of JavaScript frameworks and how they have shaped the modern web development landscape."
                    },
                    {
                        "id": "MwkiKXGsm2mz9F3GdpHBD",
                        "text": "Let's dive into the history of JavaScript frameworks and understand the significant milestones along the way."
                    }
                ],
                "type": "TEXT"
            },
            {
                "id": "9gRkY2Jpld1bXfz9ZUMWI",
                "title": "Introduction",
                "paragraphs": [
                    {
                        "id": "4jRNjS8zljedQ7mSGwEkx",
                        "text": "JavaScript has come a long way since its inception in 1995. Over the years, numerous frameworks have emerged to make web development more efficient and organized. In this article, we will explore the evolution of JavaScript frameworks and how they have shaped the modern web development landscape."
                    },
                    {
                        "id": "MwkiKXGsm2mz9F3GdpHBD",
                        "text": "Let's dive into the history of JavaScript frameworks and understand the significant milestones along the way."
                    }
                ],
                "type": "TEXT"
            },
            {
                "id": "9gRkY2Jpld1bXfz9ZUMWI",
                "code": "<div> </div>",
                "type": "CODE"
            },
            {
                "id": "9gRkY2Jpld1bXfz9ZUMWI",
                "title": "Introduction",
                "paragraphs": [
                    {
                        "id": "4jRNjS8zljedQ7mSGwEkx",
                        "text": "JavaScript has come a long way since its inception in 1995. Over the years, numerous frameworks have emerged to make web development more efficient and organized. In this article, we will explore the evolution of JavaScript frameworks and how they have shaped the modern web development landscape."
                    },
                    {
                        "id": "MwkiKXGsm2mz9F3GdpHBD",
                        "text": "Let's dive into the history of JavaScript frameworks and understand the significant milestones along the way."
                    }
                ],
                "type": "TEXT"
            },
        ],
    "lesson_type": "TEXT"
}

interface Props {
    lesson_id: string
}

const LessonContent: FC<Props> = ({lesson_id}) => {
    const lessonQuery = trpc.getLessonById.useQuery({lesson_id: lesson_id})

    const contentRender = (contentType: LessonContentType | string, block: any) => {
        switch (contentType) {
            case LessonContentType.TEXT:
                return <TextBlock textBlock={block}/>
            case LessonContentType.CODE:
                return <CodeBlock codeBlock={block}/>
            case LessonContentType.IMAGE:
                return <ImageBlock imageBlock={block}/>
        }
    }

    if (lessonQuery.isLoading) {
        return <>Loading</>
    }
    if (lessonQuery.data === undefined) {
        return <>There is no lessons of this course</>
    }
    if (lessonQuery.error) {
        return <>Something went wrong</>
    }

    return (
        <div>
            <div>
                <h4 className={'text-5xl font-extrabold my-5'}>
                    {lessonQuery.data && lessonQuery.data.title}
                </h4></div>
            {
                lesson.lesson_content.map(lesson => {
                    return contentRender(lesson.type, lesson)
                })
            }
        </div>
    );
};
export default LessonContent;
