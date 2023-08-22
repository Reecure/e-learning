import {FC, ReactElement} from 'react';
import Layout from "@/pages/layout";

const CoursesPage = () => {

    return (
        <>
            <div>CoursesPage</div>
        </>
    );
};

CoursesPage.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}
export default CoursesPage;
