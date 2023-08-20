import {FC} from 'react';
import Image from "next/image";
import hero from '../../assets/Hero.svg'


interface Props {
}

const Hero: FC<Props> = () => {

    return (
        <div className={`relative`}>
            <Image src={hero} alt={'hero'} className={'w-[1920px] min-h-[400px] object-cover'}/>
            <div className={'absolute top-[15%] left-[10%] max-w-[500px] text-6xl font-bold'}>
                <h1>Elevate Education: Unleash Your Heroic Potential with Our Community.</h1>
            </div>

        </div>
    );
};
export default Hero;
