import {FC} from 'react';

interface Props {
}

const AccessDenied: FC<Props> = () => {

    return (
        <div className={'w-full h-full flex justify-center items-center'}>
            <p className={'text-5xl'}>Access Denied</p>
        </div>
    );
};
export default AccessDenied;
