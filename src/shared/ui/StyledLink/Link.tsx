import {type FC, type ReactNode} from "react";
import Link from "next/link";

type Props = {
	children: ReactNode;
	href: string;
};

const StyledLink: FC<Props> = ({children, href}) => (
	<Link className='' href={href}>
		{children}
	</Link>
);

export default StyledLink;
