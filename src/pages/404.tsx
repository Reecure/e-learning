import {FC, ReactElement} from 'react';
import Layout from "@/pages/layout";
import Home from "@/pages/index";


const Custom404 = () => {

    return (
        <div className={'w-full h-full flex justify-center items-center'}>
            <p className={'text-5xl'}>Page Not Found</p>
        </div>
    );
};

Custom404.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}
export default Custom404;
