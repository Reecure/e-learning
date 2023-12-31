import {type FC, useState} from "react";
import Image from "next/image";
import {AiOutlineStar} from "react-icons/ai";
import {Button} from "@/shared/ui";
import {ButtonThemes} from "@/shared/ui/Button/Button";
import {type Course} from "@/enteties/Course";
import Link from "next/link";
import {Routes} from "@/shared/config/routes";

type Props = {
	course: Course;
};

const SmallCard: FC<Props> = ({course}) => {
	const [stars, setStars] = useState(5 - course.rating);
	return (
		<div
			className={
				"flex sm:flex-col max-w-[450px] sm:max-w-[350px] min-h-[230px] p-4 gap-x-5 border-2 rounded-3xl border-light-primary-main dark:border-dark-primary-main "
			}
		>
			<div className={""}>
				<Image
					src={course.cover_image}
					width={600}
					height={600}
					alt={"card-image"}
					className={"w-[160px] sm:w-full sm:h-[100px] h-full rounded-xl object-cover"}
				/>
			</div>
			<div className={"w-[300px] flex flex-col justify-between"}>
				<h4 className={"font-bold mb-1 text-2xl"}>{course.title}</h4>
				<p className={"text-sm text-neutral-400"}>{course.cover_description.slice(0, 90)}</p>
				<div>
					<div className={"flex justify-between my-3"}>
						<div className={"flex text-md gap-x-2"}>
							{Array(course.rating)
								.fill(null)
								.map((star, i) => (
									<AiOutlineStar key={i} className={"text-yellow-300"}/>
								))}
							{Array(stars)
								.fill(null)
								.map((star, i) => <AiOutlineStar key={i}/>)}
						</div>
					</div>

					<Link href={`${Routes.USER_COURSE_PAGE}/${course.id}`}>
						<Button theme={ButtonThemes.OUTLINED} className={"w-full"}>
                     Explore
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default SmallCard;
