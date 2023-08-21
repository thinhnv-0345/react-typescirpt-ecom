import { faRotateRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, Divider, Stack, Typography } from '@mui/material'
import CategoryFilter from './components/CategoryFilter'
import BrandFilter from './components/BrandFilter'
import PriceFilter from './components/PriceFilter'
import FreeShipFilter from './components/FreeShipFilter'
import RatingFilter from './components/RatingFilter'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'store'
import { resetFilter, setFilterFetchUrl } from './sidebar.slice'
import { useEffect } from 'react'
import generateFetchUrl from 'helpers/grid/generateFetchUrl'
import { fetchProduct, setNumOfPage } from 'pages/Grid/grid.slide'

export const MIN_RANGE_VALUE = 2
export const MAX_RANGE_VALUE = 5000
export const ONE_PER_CENT_VALUE = (MAX_RANGE_VALUE - MIN_RANGE_VALUE) / 100

function Sidebar() {
  const dispatch = useDispatch<AppDispatch>()
  const { currCategoryLvl0, currCategoryLvl1, currBrands, currRangeValue, isFreeShip, rating } =
    useSelector((state: RootState) => state.sidebar)
  const { hitOffPage, sortBy, searchKeyword } = useSelector((state: RootState) => state.grid)

  useEffect(() => {
    const option = {
      category_lvl0: currCategoryLvl0,
      category_lvl1: currCategoryLvl1,
      free_shipping: isFreeShip,
      rating_gte: rating,
      price_gte: Math.round(MIN_RANGE_VALUE + currRangeValue[0] * ONE_PER_CENT_VALUE),
      price_lte: Math.round(MIN_RANGE_VALUE + currRangeValue[1] * ONE_PER_CENT_VALUE)
    }
    const fetchUrl = generateFetchUrl(
      { page: 1, limit: hitOffPage, sortField: sortBy.sortField, order: sortBy.order },
      currBrands,
      option,
      searchKeyword
    )
    console.log(fetchUrl)

    if (searchKeyword) {
      dispatch(fetchProduct({ fetchUrl, isScrollTop: false }))
    } else {
      dispatch(fetchProduct({ fetchUrl, isScrollTop: true }))
    }
    dispatch(setFilterFetchUrl(fetchUrl))
    dispatch(setNumOfPage(1))
  }, [
    currCategoryLvl0,
    currCategoryLvl1,
    currBrands,
    currRangeValue,
    isFreeShip,
    rating,
    dispatch,
    hitOffPage,
    sortBy.sortField,
    sortBy.order,
    searchKeyword
  ])

  return (
    <Stack direction="column" spacing="0px">
      <Stack
        direction="row"
        width="100%"
        height="80px"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography fontSize="24px" fontWeight="500">
          Filters
        </Typography>
        <Stack
          direction="row"
          alignItems="center"
          spacing="10px"
          component="button"
          sx={{ bgcolor: 'transparent', border: 'none', cursor: 'pointer' }}
          onClick={e => {
            dispatch(resetFilter())
          }}
        >
          <Box fontSize="10px" color="dark.700">
            <FontAwesomeIcon icon={faRotateRight} />
          </Box>
          <Typography fontSize="12px" color="dark.400">
            Clear filters
          </Typography>
        </Stack>
      </Stack>
      <Divider />
      <CategoryFilter />
      <Divider />
      <BrandFilter />
      <Divider />
      <PriceFilter />
      <Divider />
      <FreeShipFilter />
      <Divider />
      <RatingFilter />
    </Stack>
  )
}

export default Sidebar
