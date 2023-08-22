import {FC, ReactNode} from 'react';
import {Routes} from "@/shared/config/routes";
import {useSession} from "next-auth/react";
import {useRouter} from "next/router";
import {Sidebar} from "@/widgets/Sidebar";


interface Props {
    children: ReactNode | ReactNode[]
}

const UserLayout: FC<Props> = ({children}) => {

    const router = useRouter()

    const session = useSession({
        required: true,
        onUnauthenticated() {
            router.push(Routes.LOGIN)
        }
    })

    if (session.status === 'loading') {
        return <p>Loading</p>
    }

    return (
        <div className={'h-[calc(100vh_-_62px)] flex justify-between'}>
            <Sidebar/>
            <div className={'w-full overflow-y-auto p-5'}>
                {children}
            </div>
        </div>
    );
};
export default UserLayout;
