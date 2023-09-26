import {type FC, FormEvent, type ReactNode, useEffect} from "react";
import Link from "next/link";
import {Routes} from "@/shared/config/routes";
import {Button} from "@/shared/ui";
import {ButtonThemes} from "@/shared/ui/Button/Button";
import {Themes} from "@/widgets/ThemeTogler";

type Props = {
	children: ReactNode;
};

const AuthForm: FC<Props> = ({children}) => {
	useEffect(() => {
		const theme = localStorage.getItem("themeElearning");
		if (theme !== null) {
			JSON.parse(theme) === Themes.DARK && document.body.classList.add("dark");
		}
	}, []);

	return (
		<main
			className={
				"space-x-4 w-full h-screen flex justify-center items-center bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text"
			}
		>
			{children}
		</main>
	);
};

export default AuthForm;
