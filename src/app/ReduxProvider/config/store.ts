import {configureStore} from '@reduxjs/toolkit'
import {CounterReducer} from '@/pages/user/profile/model'
import {CurrentLessonReducer} from '@/pages/user/my-courses/course/course-module-lessons/model'

export const store = configureStore({
    reducer: {
        CounterReducer,
        CurrentLessonReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
