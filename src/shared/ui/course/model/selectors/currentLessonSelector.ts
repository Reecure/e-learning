import {RootState} from "@/app/ReduxProvider/config/store";

export const currentLessonSelector = (state: RootState) => state.CurrentLessonReducer.currentLessonId
