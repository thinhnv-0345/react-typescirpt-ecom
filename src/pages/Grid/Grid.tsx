import { Box, Stack } from '@mui/material'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Content from './components/Content'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'store'
import { useEffect } from 'react'
import { fetchInitApp, fetchProduct } from './grid.slide'
import generateFetchUrl from 'helpers/grid/generateFetchUrl'

function Grid() {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    const fetchProductUrl = generateFetchUrl()
    dispatch(fetchProduct({ fetchUrl: fetchProductUrl, isScrollTop: false }))
    dispatch(fetchInitApp())
  }, [dispatch])

  return (
    <Box>
      <Header />
      <Stack
        direction="row"
        sx={{ p: '32px 16px', gap: '60px', ml: { xl: '100px' }, mr: { xl: '100px' } }}
      >
        <Box sx={{ minWidth: '270px' }}>
          <Sidebar />
        </Box>
        <Box sx={{ flex: 1, alignSelf: 'stretch' }}>
          <Content />
        </Box>
      </Stack>
    </Box>
  )
}

export default Grid
