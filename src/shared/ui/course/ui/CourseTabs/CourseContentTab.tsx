import {FC} from 'react';
import CreateModule from "@/shared/ui/course/ui/CreateModule/CreateModule";
import CourseModules from "@/shared/ui/course/ui/CourseModules/CourseModules";
import {Module} from "@/enteties/Module";

interface Props {
    courseId: string,
    courseModulesEdit: boolean
    modules: Module[]
}

const CourseContentTab: FC<Props> = ({courseId, courseModulesEdit, modules}) => {
    return (
        <>
            <CreateModule courseId={courseId}/>
            <CourseModules courseModulesEdit={courseModulesEdit} modules={modules}/>
        </>
    );
};
export default CourseContentTab;
