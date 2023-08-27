import {ReactElement, useEffect} from 'react';
import Layout from "@/pages/layout";
import UserLayout from "@/pages/user/layout";
import {trpc} from "@/shared/utils/trpc";
import {Button} from "@/shared/ui";
import {ButtonThemes} from "@/shared/ui/Button/Button";
import {useSession} from "next-auth/react";
import {AccessDenied} from "@/widgets/AccesDenied";


const UserAdmin = () => {
    const {data} = useSession()

    const users = trpc.getUsers.useQuery()

    useEffect(() => {
        console.log(
            users.data
        )
    }, [users])

    if (data?.user.role !== 'admin') {
        return <AccessDenied/>
    }

    if (users.fetchStatus === 'fetching') {
        return <>Loading</>
    }

    if (users.data === null || undefined) {
        return <>Error</>
    }

    return (
        <div>
            <table className={'min-w-full border-2 border-light-primary-main'}>
                <thead>
                <tr className={'border-b-2 border-light-primary-main text-2xl'}>
                    <td className={'p-3  text-center border-light-primary-main  border-r-2'}></td>
                    <td className={'p-3  text-center border-light-primary-main border-r-2'}>Firstname</td>
                    <td className={'p-3  text-center border-light-primary-main border-r-2'}>Lastname</td>
                    <td className={'p-3  text-center border-light-primary-main border-r-2'}>Email</td>
                    <td className={'p-3  text-center border-light-primary-main border-r-2'}>Role</td>
                    <td className={'p-3  text-center border-light-primary-main border-r-2'}></td>
                    <td className={'p-3  text-center  '}></td>
                </tr>
                </thead>
                <tbody>
                {
                    users.data?.map((user, i) => {
                        return <tr className={'border-b-2 border-light-primary-main'} key={i}>
                            <td className={'p-1  text-center border-light-primary-main  border-r-2'}>{i + 1}</td>
                            <td className={'p-1  text-center border-light-primary-main  border-r-2'}>{user.firstname}</td>
                            <td className={'p-1  text-center border-light-primary-main  border-r-2'}>{user.lastname}</td>
                            <td className={'p-1  text-center border-light-primary-main  border-r-2'}>{user.email}</td>
                            <td className={'p-1  text-center border-light-primary-main  border-r-2'}>{user.role}</td>
                            <td className={'p-1  text-center border-light-primary-main  border-r-2'}><Button
                                theme={ButtonThemes.FILLED} className={'!px-2 !py-1'}>Ban</Button></td>
                            <td className={'p-1  text-center '}><Button theme={ButtonThemes.OUTLINED}
                                                                        className={'!px-2 !py-1'}>Edit</Button></td>
                        </tr>
                    })
                }

                </tbody>
            </table>
        </div>
    );
};

UserAdmin.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
            <UserLayout>
                {page}
            </UserLayout>
        </Layout>
    )
}
export default UserAdmin;
