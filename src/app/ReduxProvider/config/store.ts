import {configureStore} from "@reduxjs/toolkit";
import {CounterReducer} from "../../../shared/ui/profile/model";
import {CurrentLessonReducer} from "../../../shared/ui/course/model";

export const store = configureStore({
	reducer: {
		CounterReducer,
		CurrentLessonReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
