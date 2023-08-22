import { configureStore } from '@reduxjs/toolkit'
import authReducer from 'pages/Auth/auth.slice'
import sidebarReducer from 'pages/Grid/components/Sidebar/sidebar.slice'
import gridReducer from 'pages/Grid/grid.slide'

export const store = configureStore({
  reducer: { grid: gridReducer, sidebar: sidebarReducer, auth: authReducer }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
