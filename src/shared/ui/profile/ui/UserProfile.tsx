import {FC, useEffect, useState} from "react";
import {User, UserRoles} from "@/enteties/User";
import {Button, Modal} from "@/shared/ui";
import {ButtonThemes} from "@/shared/ui/Button/Button";
import EditUserProfileModal from "@/shared/ui/profile/ui/EditUserProfileModal/EditUserProfileModal";
import CreateCourse from "@/shared/ui/course/ui/CreateCourse/CreateCourse";
import {UploadButton} from "@/shared/utils/uploadthing";
import {trpc} from "@/shared/utils/trpc";
import Image from "next/image";
import Notification from "@/shared/ui/Notification/Notification";

interface Props {
   user: User;
   refetch: () => void;
}

const UserProfileComponent: FC<Props> = ({user, refetch}) => {
   const [isEditable, setEditable] = useState(false);
   const [avatarModalOpen, setAvatarModalOpen] = useState(false);
   const [uploadNotificationOpen, setUploadNotificationOpen] = useState(false);
   const [uploadError, setUploadError] = useState(false);

   const uploadAvatar = trpc.updateUserAvatar.useMutation();

   const openHandler = () => {
      setEditable((prev) => !prev);
   };

   const setAvatarModalOpenHandler = () => {
      setAvatarModalOpen((prev) => !prev);
   };

   const setUploadNotificationOpenHandler = () => {
      setUploadNotificationOpen((prev) => !prev);
   };

   useEffect(() => {
      refetch();
   }, [uploadAvatar.isLoading, isEditable]);

   return (
      <>
         {/*User hero*/}
         <div className={"flex justify-between bg-neutral-800 p-5 rounded-md"}>
            <div className={"flex items-center "}>
               {/*{Avatar}*/}
               <div>
                  {user.avatar.length === 0 ? (
                     <div
                        onClick={setAvatarModalOpenHandler}
                        className={
                           "w-32 h-32 rounded-full bg-dark-primary-main border-[1px] cursor-pointer hover:opacity-70 object-cover"
                        }
                     />
                  ) : (
                     <Image
                        src={user.avatar}
                        alt={"user-avatar"}
                        width={1920}
                        height={1080}
                        onClick={setAvatarModalOpenHandler}
                        className={
                           "w-32 h-32 rounded-full border-[1px] cursor-pointer hover:opacity-70 object-cover"
                        }
                     />
                  )}

                  <Modal
                     isOpen={avatarModalOpen}
                     setIsOpen={setAvatarModalOpenHandler}
                  >
                     <UploadButton
                        appearance={{
                           button:
                              "bg-dark-primary-hover-second hover:opacity-70 duration-300",
                        }}
                        endpoint="imageUploader"
                        onClientUploadComplete={(res) => {
                           uploadAvatar.mutateAsync({
                              email: user.email,
                              //@ts-ignore
                              avatar: res[0].fileUrl,
                           });
                           setUploadError(false);
                           setUploadNotificationOpenHandler();
                        }}
                        onUploadError={(error: Error) => {
                           setUploadError(true);
                           setUploadNotificationOpenHandler();
                        }}
                     />
                  </Modal>
                  <Notification
                     open={uploadNotificationOpen}
                     onClose={setUploadNotificationOpenHandler}
                     timeoutDelay={3000}
                     isSuccess={!uploadError}
                  >
                     {uploadError ? "error" : "success"}
                  </Notification>

               </div>

               {/*{User Info}*/}
               <div className={"ml-5 flex flex-col gap-2"}>
                  <div className={"text-2xl"}>
                     <span className={"mr-2"}>{user.firstname}</span>
                     <span className={""}>{user.lastname}</span>
                  </div>
                  <div>
                     <span className={"px-2 py-1 bg-light-primary-main rounded-full"}>
                        {user.role}
                     </span>
                     <div className={"flex gap-1 mt-2"}>
                        <p>Studying from </p>
                        <span className={"text-dark-primary-main"}>
                           {user.registration_date.slice(0, 10)}
                        </span>
                     </div>
                  </div>
               </div>
            </div>

            <div className={"flex items-end gap-x-2"}>
               <Button theme={ButtonThemes.FILLED} onClick={openHandler}>
                  Edit
               </Button>
               {(user.role === UserRoles.ADMIN ||
                  user.role === UserRoles.TEACHER) && <CreateCourse/>}
            </div>
         </div>

         <Modal isOpen={isEditable} setIsOpen={openHandler}>
            <EditUserProfileModal user={user}/>
         </Modal>
      </>
   );
};
export default UserProfileComponent;
