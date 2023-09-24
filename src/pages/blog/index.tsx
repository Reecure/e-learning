import {FC, ReactElement} from "react";
import Layout from "@/pages/layout";

const BlogPage = () => {
   return (
      <div className={"p-3 sm:p-5 md:p-7 lg:p-10 xl:px-20 "}>
         <div>BlogPage</div>
      </div>
   );
};

BlogPage.getLayout = function getLayout(page: ReactElement) {
   return <Layout>{page}</Layout>;
};
export default BlogPage;
