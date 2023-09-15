import {FC} from 'react';

interface Props {
    courseAboutText: string
}

const CourseAboutTab: FC<Props> = ({courseAboutText}) => {

    return (
        <div>
            {courseAboutText}
        </div>
    );
};
export default CourseAboutTab;
