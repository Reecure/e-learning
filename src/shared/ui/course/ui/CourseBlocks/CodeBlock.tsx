import {FC} from 'react';
import {LessonContentType} from "@/shared/ui/course/ui/LessonContent/LessonContent";

interface Props {
    codeBlock: {
        id?: string;
        type?: LessonContentType,
        code: string;
    }
}

const CodeBlock: FC<Props> = ({codeBlock}) => {

    return (
        <code>
            <pre>
                {codeBlock.code}
            </pre>
        </code>
    );
};
export default CodeBlock;
