import {type FC} from "react";
import {ITextBlock} from "@/enteties/Lesson";


type Props = {
    textBlock: ITextBlock
};

const TextBlock: FC<Props> = ({textBlock}) => (
	<div>
		<h5 className={"text-3xl font-bold mb-3"}>{textBlock?.title}</h5>
		<p>
			{textBlock?.paragraphs.map(paragraph => (
				<p className={"mb-3"} key={paragraph.id}>
					{paragraph.text}
				</p>
			))}
		</p>
	</div>
);

export default TextBlock;
