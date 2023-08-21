import { Theme } from '@emotion/react'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Chip, SxProps } from '@mui/material'
import { Box, Stack } from '@mui/system'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'store'
import { Rating } from 'types/grid.type'
import { setRating } from '../../sidebar.slice'

interface RatingFilterItemProps {
  rating: Rating
}

function RatingFilterItem({ rating }: RatingFilterItemProps) {
  const currRating = useSelector((state: RootState) => state.sidebar.rating)
  const dispatch = useDispatch<AppDispatch>()

  const handleOnClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (currRating === rating.rating) {
      dispatch(setRating(0))
    } else {
      dispatch(setRating(rating.rating))
    }
  }

  return (
    <Stack
      direction="row"
      spacing="16px"
      alignItems="center"
      component="button"
      sx={{ bgcolor: 'transparent', border: 'none', cursor: 'pointer' }}
      onClick={handleOnClick}
    >
      <Stack direction="row" spacing="8px">
        {[1, 2, 3, 4, 5, 6].map(item => {
          return item > rating.rating ? (
            <Box fontSize="18px" key={`${item}50`} color="dark.50">
              <FontAwesomeIcon icon={faStar} />
            </Box>
          ) : (
            <Box
              fontSize="18px"
              key={`${item}400`}
              color={currRating === rating.rating ? 'primary.500' : 'primary.400'}
            >
              <FontAwesomeIcon icon={faStar} />
            </Box>
          )
        })}
      </Stack>
      <Chip label={rating.quantity} size="small" sx={styles.tag} />
    </Stack>
  )
}

interface Styles {
  tag: SxProps<Theme>
}

const styles: Styles = {
  tag: {
    fontSize: '10px',
    fontWeight: '700',
    lineHeight: '1',
    minHeight: '16px',
    minWidth: 'auto',
    height: '16px',
    pl: '4px',
    pr: '4px',
    bgcolor: 'dark.50',
    color: 'dark.800',
    borderRadius: '2px',
    '& .MuiChip-label.MuiChip-labelSmall': {
      pl: '0px',
      pr: '0px'
    }
  }
}

export default RatingFilterItem
