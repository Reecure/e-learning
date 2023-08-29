import {FC, useEffect} from 'react';
import {trpc} from "@/shared/utils/trpc";
import Link from "next/link";

interface Props {
    course_id: string
}

const CourseModules: FC<Props> = ({course_id}) => {
    const modulesQuery = trpc.getModulesByCourseId.useQuery({course_id: course_id})
    
    if (modulesQuery.isLoading) {
        return <>Loading...</>
    }
    return (
        <div className={'flex flex-col gap-3 mt-5'}>
            {
                modulesQuery.data?.map(modules => {
                    return <div key={modules.id}
                                className={'w-full py-3 px-4 border-[1px] border-light-primary-main cursor-pointer hover:scale-[1.01] duration-200'}>
                        <Link
                            href={`/user/my-courses/course/course-module-lessons/${modules.id}`}
                        >{modules.title}</Link>
                    </div>
                })
            }
        </div>
    );
};
export default CourseModules;
