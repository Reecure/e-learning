import {ReactElement} from "react";
import Layout from "@/pages/layout";
import {Hero} from "@/shared/ui";
import {useAppSelector} from "@/app/ReduxProvider/config/hooks";
import {counterSelector} from "../shared/ui/profile/model";

const Home = () => {


    const query = useAppSelector(counterSelector)

    return (
        <>
            <Hero/>
            {query}
        </>
    );
}

Home.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}

export default Home
