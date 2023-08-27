import {FC, useEffect} from 'react';
import {ButtonThemes} from "@/shared/ui/Button/Button";
import {Button} from "@/shared/ui";
import {useRouter} from "next/router";

interface Props {
}

const AuthError: FC<Props> = () => {
    const router = useRouter()
    
    return (
        <div className={'w-full h-full flex justify-center items-center'}>
            <p className={'text-5xl'}>Something went wrong</p>
            <Button theme={ButtonThemes.FILLED_TONAL} onClick={() => router.push('/')}>go home</Button>
        </div>
    );
};
export default AuthError;
