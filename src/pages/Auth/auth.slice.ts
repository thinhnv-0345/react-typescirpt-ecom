import { createSlice } from '@reduxjs/toolkit'

interface AuthState {
  isLoggined: boolean
}

const initialState: AuthState = {
  isLoggined: false
}

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggined = true
    }
  }
})

const authReducer = authSlice.reducer
export default authReducer
