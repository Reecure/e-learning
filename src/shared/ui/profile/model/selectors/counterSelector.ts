import {type RootState} from "@/app/ReduxProvider/config/store";

export const counterSelector = (state: RootState) => state.CounterReducer.count;
