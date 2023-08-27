import {FC, useEffect} from 'react';
import {trpc} from "@/shared/utils/trpc";

interface Props {
    lesson_id: string
}

const LessonContent: FC<Props> = ({lesson_id}) => {
    const lessonQuery = trpc.getLessonById.useQuery({lesson_id: lesson_id})

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
            <div>{lessonQuery.data && lessonQuery.data.title}</div>
        </div>
    );
};
export default LessonContent;
