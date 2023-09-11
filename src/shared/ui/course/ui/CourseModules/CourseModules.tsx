import {FC} from 'react';
import DragAndDrop from "@/shared/ui/DragAndDrop/DragAndDrop";

interface Props {
    modules: any,
    courseModulesEdit: boolean
}

const CourseModules: FC<Props> = ({modules, courseModulesEdit}) => {

    if (modules.isLoading) {
        return <>Loading...</>;
    }
    return (
        <div className={'mt-5'}>
            <DragAndDrop items={modules.data} canEdit={courseModulesEdit} isModule/>
        </div>
    );
};

export default CourseModules;

