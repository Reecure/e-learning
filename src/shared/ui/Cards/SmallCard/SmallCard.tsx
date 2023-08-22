import {FC} from 'react';
import Image from "next/image";
import {AiOutlineStar} from "react-icons/ai";
import {Button} from "@/shared/ui";
import {ButtonThemes} from "@/shared/ui/Button/Button";

interface Props {
}

const SmallCard: FC<Props> = () => {

    return (
        <div className={'max-w-[450px] p-4 flex gap-x-5 border-2 rounded-3xl border-dark-primary-main '}>
            <div className={''}>
                <Image
                    src={'https://images.unsplash.com/photo-1589810633905-e0546e1a5620?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE0fHx8ZW58MHx8fHx8&w=1000&q=80'}
                    width={400} height={600} alt={'card-image'}
                    className={' w-[160px] h-full rounded-xl object-cover'}/>
            </div>
            <div className={'w-[300px]'}>
                <h4 className={'font-bold mb-1 text-2xl'}>Inter id Orc Sed Ante Tincidunt</h4>
                <p className={'text-sm text-neutral-400'}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aspernatur consequuntur culpa cumque
                    dolores doloribus
                </p>
                <div className={'flex justify-between my-3'}>
                    <div className={'flex text-md gap-x-2'}>
                        <AiOutlineStar/><AiOutlineStar/><AiOutlineStar/><AiOutlineStar/><AiOutlineStar/>
                    </div>
                    <p>450$</p>
                </div>
                <Button className={'w-full'} theme={ButtonThemes.OUTLINED}>Explore</Button>

            </div>
        </div>
    );
};
export default SmallCard;
