import {type FC} from "react";
import {ICodeBlock} from "@/enteties/Lesson";

type Props = {
    codeBlock: ICodeBlock
};

const CodeBlock: FC<Props> = ({codeBlock}) => (
	<code>
		<pre>{codeBlock.code}</pre>
	</code>
);

export default CodeBlock;
