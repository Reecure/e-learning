import {FC} from "react";
import {Provider} from "react-redux";
import {store} from "@/app/ReduxProvider/config/store";

interface Props {
   children: React.ReactNode;
}

const ReduxProvider: FC<Props> = ({children}) => {
   return <Provider store={store}>{children}</Provider>;
};
export default ReduxProvider;
