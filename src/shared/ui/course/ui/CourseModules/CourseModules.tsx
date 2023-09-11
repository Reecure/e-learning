import {FC, useEffect} from 'react';
import DragAndDrop from "@/shared/ui/DragAndDrop/DragAndDrop";
import {Module} from "@/enteties/Module";

interface Props {
    modules: Module[],
    courseModulesEdit: boolean
}

const CourseModules: FC<Props> = ({modules, courseModulesEdit}) => {


    return (
        <div className={'mt-5'}>
            <DragAndDrop items={modules} canEdit={courseModulesEdit} isModule/>
        </div>
    );
};

export default CourseModules;

