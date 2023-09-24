import { FC, ReactNode } from "react";
import Link from "next/link";

interface Props {
  children: ReactNode;
  href: string;
}

const StyledLink: FC<Props> = ({ children, href }) => {
   return (
      <Link className="" href={href}>
         {children}
      </Link>
   );
};
export default StyledLink;
