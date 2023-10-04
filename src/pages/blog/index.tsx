import {type ReactElement} from "react";
import Layout from "@/pages/layout";
import {useSession} from "next-auth/react";
import AccesDenied from "@/widgets/AccesDenied/ui/AccesDenied";

const BlogPage = () => {

	const session = useSession();

	if (session.data?.user.role !== "admin") {
		return <AccesDenied/>;
	}

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
