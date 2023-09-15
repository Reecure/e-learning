import {FC} from 'react';
import {Button} from "@/shared/ui";
import {ButtonThemes} from "@/shared/ui/Button/Button";
import {Tabs} from "@/pages/user/my-courses/course/[id]";

interface Props {
    currentTab: Tabs
    setCurrentTab: (currentTab: Tabs) => void
}

const CourseTabs: FC<Props> = ({currentTab, setCurrentTab}) => {

    return (
        <div className={'flex flex-col relative w-full'}>
            <div className={'flex gap-3'}>
                <div
                    className={`${currentTab === Tabs.ABOUT ? 'border-b-[4px] border-dark-primary-main z-[1] pb-2' : ''}`}>
                    <Button theme={ButtonThemes.TEXT} onClick={() => {
                        setCurrentTab(Tabs.ABOUT)
                    }}>
                        {Tabs.ABOUT}
                    </Button>
                </div>
                <div
                    className={`${currentTab === Tabs.COURSE_CONTENT ? 'border-b-[4px] border-dark-primary-main z-[1] pb-2' : ''}`}>
                    <Button theme={ButtonThemes.TEXT} onClick={() => {
                        setCurrentTab(Tabs.COURSE_CONTENT)
                    }}>
                        {Tabs.COURSE_CONTENT}
                    </Button>
                </div>
                <div
                    className={`${currentTab === Tabs.REVIEWS ? 'border-b-[4px] border-dark-primary-main z-[1] pb-2' : ''}`}>
                    <Button theme={ButtonThemes.TEXT} onClick={() => {
                        setCurrentTab(Tabs.REVIEWS)
                    }}>
                        {Tabs.REVIEWS}
                    </Button>
                </div>
            </div>
            <div className={'w-full h-[1px] bg-dark-primary-main absolute bottom-[1px] left-0'}/>
        </div>
    );
};
export default CourseTabs;
