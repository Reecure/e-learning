import {type FC, useEffect} from "react";
import CourseModules from "@/shared/ui/course/ui/CourseModules/CourseModules";
import {Module} from "@/enteties/Module";

type Props = {
	courseModulesEdit: boolean;
	moduleId: string;
	isUserAuthor: boolean;
};

const CourseContentTab: FC<Props> = ({
	courseModulesEdit,
	moduleId,
	isUserAuthor,
}) => (
	<>
		<CourseModules
			courseModulesEdit={courseModulesEdit}
			moduleId={moduleId}
			isUserAuthor={isUserAuthor}
		/>
	</>
);

export default CourseContentTab;
