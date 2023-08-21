import { configureStore } from '@reduxjs/toolkit'
import sidebarReducer from 'pages/Grid/components/Sidebar/sidebar.slice'
import gridReducer from 'pages/Grid/grid.slide'

export const store = configureStore({
  reducer: { grid: gridReducer, sidebar: sidebarReducer }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
