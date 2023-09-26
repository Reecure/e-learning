import {type RootState} from "@/app/ReduxProvider/config/store";

export const currentLessonSelector = (state: RootState) =>
	state.CurrentLessonReducer.currentLessonId;

export const isLessonPreviewVisible = (state: RootState) =>
	state.CurrentLessonReducer.previewVisible;
