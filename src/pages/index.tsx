import {ReactElement, useEffect} from "react";
import Layout from "@/pages/layout";
import {useSession} from "next-auth/react";
import {Hero} from "@/shared/ui";

const Home = () => {
    const session = useSession()

    useEffect(() => {
        console.log(session)
    }, [session])

    return (
        <>
            <div className={''}>
                <Hero/>
                <div className={''}>
                    <p>Hello</p>
                </div>
            </div>
        </>
    )
}

Home.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}

export default Home
