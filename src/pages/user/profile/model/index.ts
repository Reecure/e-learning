import CounterReducer, {decreaseCount, increaseCount} from './slice/counterSlice'
import {counterSelector} from "@/pages/user/profile/model/selectors/counterSelector";

export {CounterReducer, counterSelector, increaseCount, decreaseCount}
