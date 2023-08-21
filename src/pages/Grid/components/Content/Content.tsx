import { Theme } from '@emotion/react'
import { Box, Divider, Grid, NativeSelect, Stack, SxProps, Typography } from '@mui/material'
import ProductCard from './components/ProductCard'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'store'
import Pagination from './components/Pagination/Pagination'
import { setHitPetPage, setSortBy } from 'pages/Grid/grid.slide'
import ContentLoading from './components/ContentLoading/ContentLoading'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleExclamation, faRotateRight } from '@fortawesome/free-solid-svg-icons'
import { resetFilter } from '../Sidebar/sidebar.slice'

function Content() {
  const products = useSelector((state: RootState) => state.grid.products)
  const isLoading = useSelector((state: RootState) => state.grid.isLoading)
  const dispatch = useDispatch<AppDispatch>()

  const handleSortByOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    if (value === 'feature') {
      dispatch(setSortBy({ sortField: 'brand', order: 'ASC' }))
    } else if (value === 'price_asc') {
      dispatch(setSortBy({ sortField: 'price', order: 'ASC' }))
    } else {
      dispatch(setSortBy({ sortField: 'price', order: 'DESC' }))
    }
  }
  const handlehitPageOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setHitPetPage(Number(e.target.value)))
  }

  return (
    <Stack width="100%" justifyContent="flex-start" spacing="0">
      <Stack direction="row" alignSelf="flex-end" spacing="16px" pt="27px" pb="27px">
        <NativeSelect
          variant="standard"
          size="small"
          defaultValue="feature"
          sx={styles.select}
          onChange={handleSortByOnChange}
        >
          <option value="feature">Sort by featured</option>
          <option value="price_asc">Price ascending</option>
          <option value="price_desc">Price descending</option>
        </NativeSelect>
        <NativeSelect
          variant="standard"
          size="small"
          defaultValue="16"
          sx={styles.select}
          onChange={handlehitPageOnChange}
        >
          <option value="16">16 hit per page</option>
          <option value="32">32 hit per page</option>
          <option value="64">64 hit per page</option>
        </NativeSelect>
      </Stack>
      <Divider />

      <Grid container spacing="16px">
        {!isLoading &&
          products.length > 0 &&
          products.map(item => (
            <Grid item xs={6} md={4} lg={3} key={item.objectID}>
              <ProductCard product={item} />
            </Grid>
          ))}

        {isLoading &&
          Array(12)
            .fill(1)
            .map((val, index) => (
              <Grid item xs={6} md={4} lg={3} key={index}>
                <ContentLoading />
              </Grid>
            ))}
      </Grid>

      {products.length === 0 && (
        <Stack width="100%" alignItems="center" pt="80px" justifyContent="center" spacing="16px">
          <Box fontSize="60px" color="primary.500">
            <FontAwesomeIcon icon={faCircleExclamation} />
          </Box>
          <Typography fontSize="28px" fontWeight="bold" width="400px" textAlign="center">
            Sorry, we can't find any matches to your query!
          </Typography>
          <Typography color="dark.400" fontSize="16px" width="400px" textAlign="center">
            Try to reset your applied filters.
          </Typography>
          <Stack
            direction="row"
            alignItems="center"
            spacing="10px"
            component="button"
            borderRadius="10px"
            p="5px"
            sx={{ border: 'none', cursor: 'pointer' }}
            onClick={e => {
              dispatch(resetFilter())
            }}
          >
            <Box fontSize="10px" color="dark.700">
              <FontAwesomeIcon icon={faRotateRight} />
            </Box>
            <Typography fontSize="12px" color="dark.800">
              Clear filters
            </Typography>
          </Stack>
        </Stack>
      )}

      {!isLoading && products.length > 0 && (
        <Box display="flex" alignItems="center" justifyContent="center" pt="80px">
          <Pagination />
        </Box>
      )}
    </Stack>
  )
}

interface Styles {
  select: SxProps<Theme>
}

const styles: Styles = {
  select: {
    fontSize: '13px',
    height: '26px',
    '&:before': {
      display: 'none',
      '&:focus, &:hover, &.Mui-active': {
        display: 'none'
      }
    }
  }
}

export default Content
