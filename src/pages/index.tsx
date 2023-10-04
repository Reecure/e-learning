import {type ReactElement} from "react";
import Layout from "@/pages/layout";
import {Hero} from "@/shared/ui";
import {Parallax, ParallaxLayer} from "@react-spring/parallax";

const Home = () => {

	return (
		<div className={""}>
			<Hero/>
			<div className={""}>
				<Parallax pages={3} className={"bg-dark-background px-20"} style={{left: "0"}}>
					<ParallaxLayer offset={0} speed={0.4} sticky={{start: 0, end: 0.6}}
						className={"w-full flex justify-center gap-x-20  max-h-[400px]"}>
						<div
							className={"p-10 h-[180px] max-w-[350px] border-dark-primary-main border-2 rounded-md"}></div>
						<div className={"p-10 h-[180px] max-w-[350px] border-dark-primary-main border-2 rounded-md"}>
                            Step outside into the virtual streets of education. Every path leads to a new discovery,
                            every
                            corner hides a lesson to be learned.
						</div>
					</ParallaxLayer>
					<ParallaxLayer offset={1} speed={0.4} sticky={{start: 1, end: 1.6}}
						className={"w-full flex justify-center gap-x-20 relative max-h-[400px]"}>
						<div
							className={"p-10 h-[180px] max-w-[350px] border-dark-primary-main border-2 rounded-md"}></div>
						<div className={"p-10 h-[180px] max-w-[350px] border-dark-primary-main border-2 rounded-md"}>
                            Step outside into the virtual streets of education. Every path leads to a new discovery,
                            every
                            corner hides a lesson to be learned.
						</div>
					</ParallaxLayer>
					<ParallaxLayer offset={2} speed={0.4} sticky={{start: 2, end: 2.6}}
						className={"w-full flex justify-center gap-x-20 relative max-h-[400px]"}>
						<div
							className={"p-10 h-[180px] max-w-[350px] border-dark-primary-main border-2 rounded-md"}></div>
						<div
							className={"p-10 h-[180px] max-w-[350px] border-dark-primary-main border-2 rounded-md"}>
                            Enter the library of endless possibilities. Each book holds a chapter of wisdom, waiting to
                            unfold
                            as you turn the pages of knowledge.
						</div>
					</ParallaxLayer>
					<ParallaxLayer offset={3} speed={0.4} sticky={{start: 3, end: 3.6}}
						className={"flex justify-center gap-x-20 relative max-h-[400px]"}>
						<div
							className={"p-10 h-[180px] max-w-[350px] border-dark-primary-main border-2 rounded-md"}></div>
						<div
							className={"p-10 h-[180px] max-w-[350px] border-dark-primary-main border-2 rounded-md"}>
                            Enter the library of endless possibilities. Each book holds a chapter of wisdom, waiting to
                            unfold
                            as you turn the pages of knowledge.
						</div>
					</ParallaxLayer>
				</Parallax>
			</div>
		</div>
	);
};

Home.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};

export default Home;
