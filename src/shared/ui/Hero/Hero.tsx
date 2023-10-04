import {type FC} from "react";
import Image from "next/image";
import hero from "../../assets/Hero.svg";

type Props = Record<string, unknown>;

const Hero: FC<Props> = () => (
	<div className={"relative mb-10"}>
		<Image
			src={hero}
			alt={"hero"}
			className={"w-[1920px] min-h-[400px] object-cover"}
		/>
		<div
			className={
				"absolute top-[20%] left-[10%] max-w-[300px] md:max-w-[350px] lg:max-w-[450px] xl:max-w-[600px] text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold"
			}
		>
			<h1 className={"tracking-wider text-white"}>
                Elevate Education: Unleash Your Heroic Potential with Our Community.
			</h1>
		</div>
	</div>
);

export default Hero;
