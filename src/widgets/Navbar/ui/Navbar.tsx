import {FC, useState} from "react";
import ThemeToggle, {Themes} from "@/widgets/ThemeTogler/ui/ThemeToggle";
import {Button} from "@/shared/ui";
import Link from "next/link";
import {Routes} from "@/shared/config/routes";
import Menu from "@/shared/ui/Menu/Menu";
import {ButtonThemes} from "@/shared/ui/Button/Button";
import {AiOutlineClose, AiOutlineUser} from "react-icons/ai";
import {signOut, useSession} from "next-auth/react";
import {GiHamburgerMenu} from "react-icons/gi";
import Overlay from "@/shared/ui/Overlay/Overlay";

const Links = [{
   name: "Main",
   link: Routes.MAIN
}, {
   name: "Courses",
   link: Routes.COURSES
}, {
   name: "Blog",
   link: Routes.BLOG
}, {
   name: "About us",
   link: Routes.ABOUT_US
}];

interface Props {
   className?: string;
   theme: Themes;
   toggleTheme: () => void;
}

const Navbar: FC<Props> = ({className, theme, toggleTheme}) => {
   const [menuOpen, setMenuOpen] = useState(false);
   const [hamburgerOpen, setHamburgerOpen] = useState(false);

   const {status} = useSession();

   const openHamburgerHandler = () => {
      setHamburgerOpen(prev => !prev);
   };

   return (
      <nav
         className={`${className} bg-light-background dark:bg-dark-background text-primary-light border-b-[2px] border-black text-light-text dark:text-dark-text flex justify-between items-center
            px-5 sm:px-7 md:px-10 lg:px-16 xl:px-20 py-2 z-[12]
            `}
      >
         <Button theme={ButtonThemes.CLEAR} onClick={() => {
            openHamburgerHandler();
         }} className={"sm:hidden"}>

            {hamburgerOpen ? <AiOutlineClose/> : <GiHamburgerMenu/>}

         </Button>
         <div className="hidden sm:flex items-center">
            <div className={"flex items-center text-lg"}>
               <ul className="flex space-x-4">
                  {
                     Links.map(item => {
                        return <li key={item.link}>
                           <Link
                              href={item.link}
                              className="hover:text-dark-accent duration-150 uppercase font-bold"
                           >
                              {item.name}
                           </Link>
                        </li>;
                     })
                  }
               </ul>
            </div>
         </div>

         {/*Hamburger*/}
         {hamburgerOpen &&
             <div className={"fixed top-0 bottom-0 right-0 left-0 cursor-pointer z-[1000] bg-black/40"}
                  onClick={openHamburgerHandler}>
                 <ul className="absolute top-[58px] flex flex-col bg-dark-background h-screen px-10 py-5 space-y-3 w-[200px] z-[1011]"
                     onClick={(e) => {
                        e.stopPropagation();
                     }}>
                    {
                       Links.map(item => {
                          return <li key={item.link}>
                             <Link
                                href={item.link}
                                className="uppercase font-bold"
                                onClick={openHamburgerHandler}
                             >
                                {item.name}
                             </Link>
                          </li>;
                       })
                    }
                 </ul>
             </div>}

         <div className={"flex items-center"}>
            {status === "unauthenticated" ? (
               <Link href={"/auth/signin"}>Log in</Link>
            ) : null}
            <Menu
               menuOpen={menuOpen}
               setMenuOpen={setMenuOpen}
               buttonChildren={
                  <Button
                     theme={ButtonThemes.CLEAR}
                     onClick={() => setMenuOpen(!menuOpen)}
                     className={
                        "text-2xl flex justify-center !px-[10px] !py-[8px] rounded-md items-center hover:bg-light-primary-main/10 dark:hover:bg-dark-primary-main/10 z-[1]"
                     }
                  >
                     <AiOutlineUser/>
                  </Button>
               }
               className={"!right-0 !py-3 "}
            >
               <div className={"flex flex-col gap-y-1 items-start"}>
                  {status === "authenticated" && (
                     <>
                        <div>
                           <Link href={"/user/profile"} className={"hover:opacity-70"}
                                 onClick={() => setMenuOpen(!menuOpen)}
                           >
                              Profile
                           </Link>
                        </div>
                        <div>
                           <Link
                              href={"/user/my-courses"}
                              className={"hover:opacity-70"}
                              onClick={() => setMenuOpen(!menuOpen)}
                           >
                              My courses
                           </Link>
                        </div>
                     </>
                  )}
                  <div className={"flex justify-between items-center w-full"}>
                     <p>Theme</p>
                     <ThemeToggle theme={theme} toggleTheme={toggleTheme}/>
                  </div>
                  <div
                     className={"w-full h-[1px] rounded-full bg-white mt-1 mb-[6px]"}
                  ></div>
                  {status === "unauthenticated" ? (
                     <Link href={"/auth/signin"}>Log in</Link>
                  ) : (
                     <Button
                        theme={ButtonThemes.CLEAR}
                        onClick={() => {
                           signOut({callbackUrl: "/"});
                        }}
                        className={"!p-0"}
                     >
                        Log out
                     </Button>
                  )}
               </div>
            </Menu>
         </div>
      </nav>
   );
};

export default Navbar;
