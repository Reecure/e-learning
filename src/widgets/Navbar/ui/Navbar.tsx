import {FC, useState} from 'react';
import ThemeToggle, {Themes} from "@/widgets/ThemeTogler/ui/ThemeToggle";
import {Button} from "@/shared/ui";
import Link from "next/link";
import {Routes} from "@/shared/config/routes";
import Menu from "@/shared/ui/Menu/Menu";
import {ButtonThemes} from "@/shared/ui/Button/Button";
import {AiOutlineUser} from "react-icons/ai";

interface Props {
    className?: string
    theme: Themes;
    toggleTheme: () => void;
}

const Navbar: FC<Props> = ({className, theme, toggleTheme}) => {
    const [menuOpen, setMenuOpen] = useState(false);
    return (
        <nav
            className={`${className} bg-light-background dark:bg-dark-background text-primary-light border-b-[2px] border-black text-light-text dark:text-dark-text`}>
            <div className="mx-auto px-4 py-3 flex justify-between items-center">
                <div className="flex items-center">

                    <div className={'flex items-center text-lg'}>
                        <ul className="flex space-x-4">
                            <li><Link href={Routes.COURSES}
                                      className="hover:text-dark-accent duration-150 uppercase font-bold">Courses</Link>
                            </li>
                            <li><Link href={Routes.BLOG}
                                      className="hover:text-dark-accent duration-150 uppercase font-bold">Blog</Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div>
                    <input type="text" placeholder="Search..."
                           className="bg-transparent border border-light-border dark:border-dark-border
                               rounded-full px-3 py-1 focus:outline-0"/>
                </div>

                <div className={'flex items-center space-x-4'}>


                    <div className={'flex items-center space-x-2'}>
                        <Link href={'/auth/signin'}
                              className={`px-2 py-1 bg-light-button rounded-md text-shadow-lg hover:bg-light-button/90 `}>Sign
                            In</Link>
                        <Link href={'/auth/signup'}
                              className={`px-2 py-1 bg-light-button rounded-md hover:bg-light-button/90 `}>Sign
                            Up</Link>
                    </div>
                    <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen}
                          buttonChildren={<Button theme={ButtonThemes.CLEAR}
                                                  onClick={() => setMenuOpen(!menuOpen)}
                                                  className={'text-2xl flex justify-center p-1 rounded-md items-center hover:bg-black/30 duration-150'}><AiOutlineUser/></Button>}
                          className={'top-[40px]'}>
                        <div className={'flex justify-between items-center'}>
                            <p>Theme</p>
                            <ThemeToggle theme={theme} toggleTheme={toggleTheme}/>
                        </div>
                        <Link href={'/courses'}>Log in</Link>
                    </Menu>

                </div>


            </div>
        </nav>
    );
};

export default Navbar;
