import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    currentLessonId: ''
}

const currentLessonSlice = createSlice({
    name: 'currentLesson',
    initialState,
    reducers: {
        setCurrentLessonId: (state, action) => {
            state.currentLessonId = action.payload
        }
    },
});

export default currentLessonSlice.reducer;

export const {setCurrentLessonId} = currentLessonSlice.actions;
