import {FC} from 'react';
import {useForm} from "react-hook-form";

interface Props {
    title:
}

const TextBlock: FC<Props> = () => {

    const {register, handleSubmit, } = useForm()

    return (
        <div>
            <div>TextBlock</div>
        </div>
    );
};
export default TextBlock;
