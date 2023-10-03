import {type FC, useState} from "react";
import {Course} from "@/enteties/Course";
import {useSession} from "next-auth/react";
import {Button, Modal} from "@/shared/ui";
import {ButtonThemes} from "@/shared/ui/Button/Button";
import {trpc} from "@/shared/utils/trpc";
import CourseForm from "@/shared/ui/course/ui/CourseForms/CourseForm";

type Props = Record<string, unknown>;

const CreateCourse: FC<Props> = () => {
	const [createCourseModalOpen, setCreateCourseModalOpen] = useState(false);

	const session = useSession();

	const createCourse = trpc.createCourse.useMutation();

	const openModalCreateCourseHandler = () => {
		setCreateCourseModalOpen(prev => !prev);
	};

	const createCourseHandler = async (data: Course) => {
		const res = await createCourse.mutate({
			title: data.title,
			cover_description: data.cover_description,
			cover_image: data.cover_image,
			description: data.description,
			difficulty_level: data.difficulty_level,
			duration: data.duration,
			isVisible: data.is_visible,
			rating: 0,
			creation_date: new Date().toISOString(),
			category_id: "",
			author_id: session.data?.user.id || "",
		});
	};

	return (
		<div>
			<Button
				theme={ButtonThemes.OUTLINED}
				onClick={openModalCreateCourseHandler}
			>
                Create course
			</Button>
			<Modal
				isOpen={createCourseModalOpen}
				setIsOpen={openModalCreateCourseHandler}
			>
				<div className={"w-full max-w-[500px]"}>
					<CourseForm
						courseData={{} as Course}
						onSubmit={createCourseHandler}
						isCreating={true}
					/>
				</div>
			</Modal>
		</div>
	);
};

export default CreateCourse;
