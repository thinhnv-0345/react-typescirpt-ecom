import { createSlice } from '@reduxjs/toolkit'

interface SidebarState {
  currCategoryLvl0: string
  currCategoryLvl1: string
  currBrands: string[]
  currRangeValue: number[]
  isFreeShip: boolean
  rating: number
  filterFetchtUrl: string
}

const initialState: SidebarState = {
  currCategoryLvl0: '',
  currCategoryLvl1: '',
  currBrands: [],
  currRangeValue: [0, 100],
  rating: 0,
  isFreeShip: false,
  filterFetchtUrl: '/products?_page=1&limit=16'
}

const sidebarSlide = createSlice({
  name: 'sidebar',
  initialState: initialState,
  reducers: {
    resetFilter: state => {
      state.currCategoryLvl0 = ''
      state.currCategoryLvl1 = ''
      state.currBrands = []
      state.currRangeValue = [0, 100]
      state.rating = 0
      state.isFreeShip = false
    },
    setCurrCategoryLnl0: (state, action) => {
      state.currCategoryLvl0 = action.payload
    },
    setCurrCategoryLnl1: (state, action) => {
      state.currCategoryLvl1 = action.payload
    },
    addCurrBrands: (state, action) => {
      if (!state.currBrands.includes(action.payload)) {
        state.currBrands.push(action.payload)
      }
    },
    removeCurrBrands: (state, action) => {
      if (state.currBrands.includes(action.payload)) {
        state.currBrands = state.currBrands.filter(val => val !== action.payload)
      }
    },
    setCurrRangeValue: (state, action) => {
      state.currRangeValue = action.payload
    },
    setRating: (state, action) => {
      state.rating = action.payload
    },
    setIsFreeShip: (state, action) => {
      state.isFreeShip = action.payload
    },
    setFilterFetchUrl: (state, action) => {
      state.filterFetchtUrl = action.payload
    }
  }
})

export const {
  setCurrCategoryLnl0,
  setCurrCategoryLnl1,
  setCurrRangeValue,
  setIsFreeShip,
  setRating,
  addCurrBrands,
  removeCurrBrands,
  resetFilter,
  setFilterFetchUrl
} = sidebarSlide.actions

const sidebarReducer = sidebarSlide.reducer

export default sidebarReducer
