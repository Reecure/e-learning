import {FC, useEffect} from 'react';
import CourseModules from "@/shared/ui/course/ui/CourseModules/CourseModules";
import {Module} from "@/enteties/Module";


interface Props {
    courseModulesEdit: boolean
    modules: Module[]
}


const CourseContentTab: FC<Props> = ({courseModulesEdit, modules}) => {
    return (
        <>
            <CourseModules courseModulesEdit={courseModulesEdit} modules={modules}/>
        </>
    );
};
export default CourseContentTab;
