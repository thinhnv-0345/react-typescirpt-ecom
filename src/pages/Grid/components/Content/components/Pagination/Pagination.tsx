import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Stack } from '@mui/material'
import { fetchProduct, setNumOfPage } from 'pages/Grid/grid.slide'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'store'

function Pagination() {
  const numOfPage = useSelector((state: RootState) => state.grid.numOfPage)
  const filterFetchUrl = useSelector((state: RootState) => state.sidebar.filterFetchtUrl)
  const dispatch = useDispatch<AppDispatch>()

  const [currPage, setCurrPage] = useState<number>(1)

  let arr: number[] = Array.from(Array(numOfPage), (x, index) => index + 1)

  arr = arr.filter(val => {
    if (currPage > 3 && currPage < numOfPage - 2) {
      return val >= currPage - 2 && val <= currPage + 2
    } else if (currPage >= numOfPage - 2) {
      return val >= numOfPage - 4
    } else {
      return val <= 5
    }
  })

  const handlePageChange = (page: number) => {
    dispatch(
      fetchProduct({
        fetchUrl: filterFetchUrl.replace(/_page=\d+/g, `_page=${page}`),
        isScrollTop: true
      })
    )
    dispatch(setNumOfPage(page))
  }

  useEffect(() => {
    if (numOfPage === 1) {
      setCurrPage(1)
    }
  }, [numOfPage])

  return (
    <Stack direction="row">
      <Button
        sx={{
          pointerEvents: currPage === 1 ? 'none' : 'fill',
          color: currPage === 1 ? 'dark.200' : 'dark.800',
          bgcolor: 'transparent',
          '&:hover': { bgcolor: 'transparent' }
        }}
        onClick={() => {
          if (currPage > 1) {
            setCurrPage((currPage: number) => currPage - 1)
            handlePageChange(currPage - 1)
          }
        }}
      >
        <FontAwesomeIcon icon={faAngleLeft} />
      </Button>
      <Stack direction="row" spacing="8px">
        {arr.map(item => {
          return (
            <Button
              key={item}
              sx={{
                minWidth: 'auto',
                width: '40px',
                bgcolor: item === currPage ? 'primary.500' : 'dark.50',
                color: item === currPage ? 'white' : 'dark.800',
                '&:hover': {
                  bgcolor: 'primary.500',
                  color: 'white'
                }
              }}
              onClick={() => {
                setCurrPage(item)
                handlePageChange(item)
              }}
            >
              {item}
            </Button>
          )
        })}
      </Stack>
      <Button
        sx={{
          pointerEvents: currPage === numOfPage ? 'none' : 'fill',
          color: currPage === numOfPage ? 'dark.200' : 'dark.800',
          bgcolor: 'transparent',
          '&:hover': { bgcolor: 'transparent' }
        }}
        onClick={() => {
          if (currPage <= numOfPage - 1) {
            setCurrPage(currPage => currPage + 1)
            handlePageChange(currPage + 1)
          }
        }}
      >
        <FontAwesomeIcon icon={faAngleRight} />
      </Button>
    </Stack>
  )
}

export default Pagination
