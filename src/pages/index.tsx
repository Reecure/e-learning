import {ReactElement} from "react";
import Layout from "@/pages/layout";
import {Hero} from "@/shared/ui";


const Home = () => {

   return (
      <>
         <Hero/>
      </>
   );
};

Home.getLayout = function getLayout(page: ReactElement) {
   return <Layout>{page}</Layout>;
};

export default Home;
