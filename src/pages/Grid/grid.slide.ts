import { AsyncThunk, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import requestAPI from 'helpers/http'
import { Brand, CategoryLvl0, Product, Rating } from 'types/grid.type'

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>

type PendingAction = ReturnType<GenericAsyncThunk['pending']>
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>

interface GridState {
  products: Product[]
  categories: CategoryLvl0[]
  brands: Brand[]
  ratings: Rating[]
  hitOffPage: number
  numOfPage: number
  fetchProductUrl: string
  sortBy: { sortField: string; order: 'ASC' | 'DESC' }
  searchKeyword: string
  isLoading: boolean
}

const gridStateInitial: GridState = {
  products: [],
  categories: [],
  brands: [],
  ratings: [],
  hitOffPage: 16,
  numOfPage: 1,
  fetchProductUrl: '',
  sortBy: { sortField: 'brand', order: 'ASC' },
  searchKeyword: '',
  isLoading: false
}

export const fetchProduct = createAsyncThunk(
  'grid/fetchProduct',
  async ({ fetchUrl, isScrollTop }: { fetchUrl: string; isScrollTop: boolean }, thunkAPI) => {
    try {
      const response = await requestAPI<Product[], any>(fetchUrl, 'GET')
      const totalProduct: number = Number(response.headers['x-total-count'])

      if (response && isScrollTop) {
        window.scrollTo({
          top: 195
        })
      }

      const fetchProductData = {
        products: response.data,
        totalProduct,
        fetchUrl
      }
      return fetchProductData
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

export const fetchInitApp = createAsyncThunk('grid/fetchInitApp', async (_, thunkAPI) => {
  try {
    const { data: categories } = await requestAPI<CategoryLvl0[], any>(
      '/categories?_sort=name&order=ASC',
      'GET'
    )
    const { data: brands } = await requestAPI<Brand[], any>(
      '/brands?_sort=quantity&_order=DESC',
      'GET'
    )
    const { data: ratings } = await requestAPI<Rating[], any>(
      '/ratings?_sort=rating&_order=DESC',
      'GET'
    )

    const dataInit = {
      categories,
      brands,
      ratings
    }

    return dataInit
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

const gridSlide = createSlice({
  name: 'grid',
  initialState: gridStateInitial,
  reducers: {
    setNumOfPage: (state, action) => {
      state.numOfPage = action.payload
    },
    setHitPetPage: (state, action) => {
      state.hitOffPage = action.payload
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload
    },
    setSearchKeyword: (state, action) => {
      state.searchKeyword = action.payload
    }
  },
  extraReducers(buider) {
    buider
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.products = action.payload.products
        state.numOfPage = Math.ceil(action.payload.totalProduct / state.hitOffPage)
        state.fetchProductUrl = action.payload.fetchUrl
        state.isLoading = false
      })
      .addCase(fetchInitApp.fulfilled, (state, action) => {
        state.categories = action.payload.categories
        state.brands = action.payload.brands
        state.ratings = action.payload.ratings
        state.isLoading = false
      })
      .addMatcher<PendingAction>(
        action => action.type.endsWith('/pending'),
        (state, action) => {
          state.isLoading = true
        }
      )
      .addMatcher<RejectedAction | FulfilledAction>(
        action => action.type.endsWith('/rejected') || action.type.endsWith('/fulfilled'),
        (state, action) => {
          state.isLoading = false
        }
      )
  }
})

export const { setNumOfPage, setHitPetPage, setSortBy, setSearchKeyword } = gridSlide.actions

const gridReducer = gridSlide.reducer

export default gridReducer
