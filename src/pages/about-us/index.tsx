import {FC, type ReactElement} from "react";
import Layout from "@/pages/layout";

const AboutUsPage = () => (
	<div className={"p-3 sm:p-5 md:p-7 lg:p-10 xl:px-20 "}>
		<div>AboutUsPage</div>
	</div>
);

AboutUsPage.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};

export default AboutUsPage;
