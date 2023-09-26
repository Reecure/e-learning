import {ReactElement, useEffect, useState} from "react";
import Layout from "@/pages/layout";
import UserLayout from "@/pages/user/layout";
import {trpc} from "@/shared/utils/trpc";
import {useRouter} from "next/router";
import LessonContent from "@/shared/ui/course/ui/LessonContent/LessonContent";
import CreateLesson from "@/shared/ui/course/ui/CreateLesson/CreateLesson";
import {Button} from "@/shared/ui";
import {ButtonThemes} from "@/shared/ui/Button/Button";
import CourseLessons from "@/shared/ui/course/ui/CourseLessons/CourseLessons";
import {useAppDispatch, useAppSelector,} from "@/app/ReduxProvider/config/hooks";
import {currentLessonSelector} from "../../../../../shared/ui/course/model";
import {useCurrentUser} from "@/shared/hooks";
import {Loader} from "@/shared/ui/Loader";
import {isLessonPreviewVisible} from "@/shared/ui/course/model/selectors/currentLessonSelector";
import {AiOutlineClose} from "react-icons/ai";
import Overlay from "@/shared/ui/Overlay/Overlay";

const CourseModuleLessonsPage = () => {
   const [canLessonEdit, setCanLessonEdit] = useState(false);
   const [isUserCourse, setIsUserCourse] = useState(false);
   const [lessonSidebarOpen, setLessonSidebarOpen] = useState(true);

   const router = useRouter();
   const dispatch = useAppDispatch();
   const currentUserId = useCurrentUser();

   const lessons = trpc.getLessonsByModuleId.useQuery({
      module_id: router.query.id! as string,
   });
   const moduleQuery = trpc.getModuleById.useQuery({
      module_id: router.query.id! as string,
   });

   const currentLesson = useAppSelector(currentLessonSelector);

   const isVisiblePreview = useAppSelector(isLessonPreviewVisible);

   useEffect(() => {
      if (currentUserId === moduleQuery.data?.author_id) {
         setIsUserCourse(true);
      }
   }, [moduleQuery]);

   const CanLessonEditHandler = () => {
      setCanLessonEdit((prev) => !prev);
   };

   const setLessonSidebarOpenHandler = () => {
      setLessonSidebarOpen(prev => !prev);
   };

   if (lessons.isLoading && moduleQuery.isLoading) {
      return <Loader/>;
   }

   return (
      <div className={"flex"}>
         {
            lessonSidebarOpen && <div
                 className={
                    "fixed top-0 left-0 h-screen bg-light-neutral-900 dark:bg-dark-neutral-100 p-5 max-w-[250px] w-full md:static md:h-[calc(100vh_-_62px)] z-[99]"
                 }
             >
                 <Button theme={ButtonThemes.CLEAR} onClick={setLessonSidebarOpenHandler}
                         className={"!p-0 md:hidden"}><AiOutlineClose/></Button>

                 <div className={"flex justify-between items-center mb-5"}>
                     <p className={"text-xl mb-5"}>Lessons</p>
                    {isUserCourse &&
                       (!canLessonEdit ? (
                          <Button
                             theme={ButtonThemes.FILLED}
                             onClick={CanLessonEditHandler}
                             className={"p-1!"}
                          >
                             Edit
                          </Button>
                       ) : (
                          <Button
                             theme={ButtonThemes.FILLED}
                             onClick={CanLessonEditHandler}
                          >
                             Close
                          </Button>
                       ))}
                 </div>
               {isUserCourse && canLessonEdit && (
                  <CreateLesson moduleId={router.query.id as string}/>
               )}

                 <CourseLessons
                     isUserLessons={isUserCourse}
                     moduleId={router.query.id as string}
                     lessonCanEdit={canLessonEdit}
                 />
             </div>
         }

         {
            lessonSidebarOpen && <div className={`!z-[89] md:invisible`}>
                 <Overlay onClick={setLessonSidebarOpenHandler}/>
             </div>
         }

         <div className={"fixed bottom-10 left-10 bg-dark-primary-hover-second rounded-full w-16 h-16 md:hidden"}
              onClick={setLessonSidebarOpenHandler}>
         </div>

         <div className={"ml-5 w-full overflow-y-auto mr-5 md:mr-10 xl:mr-20"}>
            {
               isVisiblePreview ? <>preview</> : <LessonContent lesson_id={currentLesson}/>
            }
         </div>
      </div>
   );
};

CourseModuleLessonsPage.getLayout = function getLayout(page: ReactElement) {
   return (
      <Layout>
         <UserLayout contentClassName={"!p-0"}>{page}</UserLayout>
      </Layout>
   );
};
export default CourseModuleLessonsPage;
