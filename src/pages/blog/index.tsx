import {FC, ReactElement} from 'react';
import Layout from "@/pages/layout";

const BlogPage = () => {

    return (
        <div className={'bg-amber-500'}>
            <div>BlogPage</div>
        </div>
    );
};

BlogPage.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}
export default BlogPage;
