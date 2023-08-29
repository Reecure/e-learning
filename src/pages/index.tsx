import {ReactElement, useEffect} from "react";
import Layout from "@/pages/layout";
import {Hero} from "@/shared/ui";


const Home = () => {
    return (
        <>
            <div className={''}>
                <Hero/>
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
