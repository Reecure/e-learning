import CounterReducer, {
	decreaseCount,
	increaseCount,
} from "./slice/counterSlice";
import {counterSelector} from "@/shared/ui/profile/model/selectors/counterSelector";

export {CounterReducer, counterSelector, increaseCount, decreaseCount};
