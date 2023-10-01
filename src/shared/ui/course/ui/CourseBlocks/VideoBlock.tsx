import {type FC} from "react";
import {IVideoBlock} from "@/enteties/Lesson";

type Props = {
    videoBlock: IVideoBlock
};

function getVideoIdFromUrl(url: string) {
	const urlParams = new URLSearchParams(new URL(url).search);
	return urlParams.get("v");
}

const VideoBlock: FC<Props> = ({videoBlock}) => {
	const videoId = getVideoIdFromUrl(videoBlock.url);

	if (!videoId) {
		return (
			<div>
                Error: URL shoud have{" "}
				<span className={"text-dark-primary-main"}>v=</span> flag{" "}
				<span className={"text-neutral-500"}>
          https://www.youtube.com/watch?
					<span className={"italic text-dark-primary-main"}>v=n36n7Ravzwc</span>
          &ab_channel=User
				</span>
			</div>
		);
	}

	const embedUrl = `https://www.youtube.com/embed/${videoId}`;
	return (
		<>
			<iframe
				width={"100%"}
				height={500}
				className={
					"w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] mx-auto"
				}
				src={embedUrl}
				title='YouTube Video Player'
				allowFullScreen
			></iframe>
		</>
	);
};

export default VideoBlock;
