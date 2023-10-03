import {type FC} from "react";
import DragAndDrop from "@/shared/ui/DragAndDrop/DragAndDrop";
import {trpc} from "@/shared/utils/trpc";
import {Loader} from "@/shared/ui/Loader";

type Props = {
    moduleId: string;
    courseModulesEdit: boolean;
    isUserAuthor: boolean;
};

const CourseModules: FC<Props> = ({
	moduleId,
	courseModulesEdit,
	isUserAuthor,
}) => {
	const modulesQuery = trpc.getModulesByCourseId.useQuery({
		course_id: moduleId,
	});

	if (modulesQuery.isLoading) {
		return <Loader/>;
	}

	return (
		<div className={"mt-5"}>
			<DragAndDrop
				items={modulesQuery?.data?.sort((a, b) => a.order - b.order) as any}
				canEdit={courseModulesEdit}
				isModule
				refetch={modulesQuery.refetch}
				isUserAuthor={isUserAuthor}
			/>
		</div>
	);
};

export default CourseModules;
