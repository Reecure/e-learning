import {FC, useState} from 'react';
import ThemeToggle, {Themes} from "@/widgets/ThemeTogler/ui/ThemeToggle";
import {Button} from "@/shared/ui";
import Link from "next/link";
import {Routes} from "@/shared/config/routes";
import Menu from "@/shared/ui/Menu/Menu";
import {ButtonThemes} from "@/shared/ui/Button/Button";
import {AiOutlineUser} from "react-icons/ai";
import {signOut, useSession} from "next-auth/react";

interface Props {
    className?: string
    theme: Themes;
    toggleTheme: () => void;
}

const Navbar: FC<Props> = ({className, theme, toggleTheme}) => {
    const [menuOpen, setMenuOpen] = useState(false);

    const {status} = useSession()

    return (
        <nav
            className={`${className} bg-light-background dark:bg-dark-background text-primary-light border-b-[2px] border-black text-light-text dark:text-dark-text flex justify-between items-center
            px-20 py-2
            `}>
            <div className="flex items-center">
                <div className={'flex items-center text-lg'}>
                    <ul className="flex space-x-4">
                        <li><Link href={Routes.MAIN}
                                  className="hover:text-dark-accent duration-150 uppercase font-bold">Main</Link>
                        </li>
                        <li><Link href={Routes.COURSES}
                                  className="hover:text-dark-accent duration-150 uppercase font-bold">Courses</Link>
                        </li>
                        <li><Link href={Routes.BLOG}
                                  className="hover:text-dark-accent duration-150 uppercase font-bold">Blog</Link>
                        </li>
                        <li><Link href={Routes.ABOUT_US}
                                  className="hover:text-dark-accent duration-150 uppercase font-bold">About us</Link>
                        </li>

                    </ul>
                </div>
            </div>

            <div className={'flex items-center'}>
                {
                    status === 'unauthenticated' ? <Link href={'/auth/signin'}>Log in</Link> : null
                }
                <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen}
                      buttonChildren={<Button theme={ButtonThemes.CLEAR}
                                              onClick={() => setMenuOpen(!menuOpen)}
                                              className={'text-2xl flex justify-center !p-2 rounded-md items-center hover:bg-light-primary-main/10 dark:hover:bg-dark-primary-main/10'}><AiOutlineUser/></Button>}
                      className={'!right-0 !py-3 '}>
                    <div className={'flex flex-col gap-y-1 items-start'}>
                        {
                            status === 'authenticated' &&
                            <>
                                <div>
                                    <Link href={'/user/profile'} className={'hover:opacity-70'}>Profile</Link>
                                </div>
                                <div>
                                    <Link href={'/user/my-courses'} className={'hover:opacity-70'}>My courses</Link>
                                </div>
                            </>
                        }
                        <div className={'flex justify-between items-center w-full'}>
                            <p>Theme</p>
                            <ThemeToggle theme={theme} toggleTheme={toggleTheme}/>
                        </div>
                        <div className={'w-full h-[1px] rounded-full bg-white mt-1 mb-[6px]'}>

                        </div>
                        {
                            status === 'unauthenticated' ? <Link href={'/auth/signin'}>Log in</Link> :
                                <Button theme={ButtonThemes.CLEAR} onClick={() => {
                                    signOut({callbackUrl: '/'})
                                }} className={'!p-0'}>Log out</Button>
                        }
                    </div>
                </Menu>
            </div>
        </nav>
    );
};

export default Navbar;
