import { Stack, Typography } from '@mui/material'
import RatingFilterItem from './RatingFilterItem'
import { useSelector } from 'react-redux'
import { RootState } from 'store'

function RatingFilter() {
  const ratings = useSelector((state: RootState) => state.grid.ratings)
  return (
    <Stack width="100%" alignItems="flex-start" pt="32px" pb="32px">
      <Typography fontSize="11px" fontWeight="500" letterSpacing="1px">
        RATINGS
      </Typography>
      <Stack mt="8px" spacing="8px">
        {ratings.map(item => (
          <RatingFilterItem key={item.rating} rating={item} />
        ))}
      </Stack>
    </Stack>
  )
}

export default RatingFilter
