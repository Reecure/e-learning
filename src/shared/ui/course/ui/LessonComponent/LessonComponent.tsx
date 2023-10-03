import {FC, useEffect} from "react";
import {
	ICodeBlock,
	IImageBlock,
	ITextBlock,
	IVideoBlock,
	Lesson,
	LessonBlocks,
	LessonContentType
} from "@/enteties/Lesson";
import TextBlock from "@/shared/ui/course/ui/CourseBlocks/TextBlock";
import CodeBlock from "@/shared/ui/course/ui/CourseBlocks/CodeBlock";
import ImageBlock from "@/shared/ui/course/ui/CourseBlocks/ImageBlock";
import VideoBlock from "@/shared/ui/course/ui/CourseBlocks/VideoBlock";

interface Props {
    items: Lesson
}

const LessonComponent: FC<Props> = ({items}) => {

	useEffect(() => {
	}, [items]);
	const contentRender = (
		contentType: LessonContentType,
		block: LessonBlocks,
	) => {
		switch (contentType) {
		case LessonContentType.TEXT:
			return <TextBlock textBlock={block as ITextBlock}/>;
		case LessonContentType.CODE:
			return <CodeBlock codeBlock={block as ICodeBlock}/>;
		case LessonContentType.IMAGE:
			return <ImageBlock imageBlock={block as IImageBlock}/>;
		case LessonContentType.VIDEO:
			return <VideoBlock videoBlock={block as IVideoBlock}/>;
		}
	};
	return (
		<div>
			{
				items.lesson_content.blocks.map(lesson =>
					contentRender(lesson.type as LessonContentType, lesson as LessonBlocks),
				)
			}
		</div>
	);
};

export default LessonComponent;