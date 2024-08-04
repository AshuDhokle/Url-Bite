import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/user/userSlice'


export const createStore = () =>{
    return configureStore({
        reducer: {
            user:userReducer
        }
    })
}


export type AppStore = ReturnType<typeof createStore>

export type RootState = ReturnType<AppStore['getState']>

export type AppDispatch = AppStore['dispatch']
