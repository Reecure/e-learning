import {type FC} from "react";
import {type LessonContentType} from "@/shared/ui/course/ui/LessonContent/LessonContent";

type Props = {
	codeBlock: {
		id?: string;
		type?: LessonContentType;
		code: string;
	};
};

const CodeBlock: FC<Props> = ({codeBlock}) => (
	<code>
		<pre>{codeBlock.code}</pre>
	</code>
);

export default CodeBlock;
