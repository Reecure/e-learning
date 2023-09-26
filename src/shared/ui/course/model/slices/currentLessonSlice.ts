import {createSlice} from "@reduxjs/toolkit";

const initialState = {
	previewVisible: true,
	currentLessonId: "",
};

const currentLessonSlice = createSlice({
	name: "currentLesson",
	initialState,
	reducers: {
		setCurrentLessonId(state, action) {
			state.currentLessonId = action.payload;
		},
		setPreviewVisible(state, action) {
			state.previewVisible = action.payload;
		},
	},
});

export default currentLessonSlice.reducer;

export const {setCurrentLessonId, setPreviewVisible} = currentLessonSlice.actions;
