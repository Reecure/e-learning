import {type FC} from "react";

type Props = {
	courseAboutText: string;
};

const CourseAboutTab: FC<Props> = ({courseAboutText}) => <div>{courseAboutText}</div>;

export default CourseAboutTab;
