import {FC, ReactElement} from 'react';
import Layout from "@/pages/layout";

const AboutUsPage = () => {
    return (
        <>
            <div>AboutUsPage</div>
        </>
    );
};

AboutUsPage.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}

export default AboutUsPage;
