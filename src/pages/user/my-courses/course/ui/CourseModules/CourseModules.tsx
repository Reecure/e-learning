import {FC, useEffect} from 'react';
import {trpc} from "@/shared/utils/trpc";
import Link from "next/link";

interface Props {
    course_id: string
}

const CourseModules: FC<Props> = ({course_id}) => {
    const modulesQuery = trpc.getModulesByCourseId.useQuery({course_id: course_id})

    useEffect(() => {
        console.log(course_id)
        console.log(modulesQuery.data)
    }, [modulesQuery])

    if (modulesQuery.isLoading) {
        return <>Loading...</>
    }
    return (
        <div>
            {
                modulesQuery.data?.map(modules => {
                    return <div>
                        <Link
                            href={`/user/my-courses/course/course-module-lessons/${modules.id}`}>{modules.title}</Link>
                    </div>
                })
            }
        </div>
    );
};
export default CourseModules;
