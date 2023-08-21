import { Theme } from '@emotion/react'
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, Chip, Stack, SxProps, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'store'
import { CategoryLvl1 } from 'types/grid.type'
import { setCurrCategoryLnl1 } from '../../sidebar.slice'

interface CategoryFilterLvl1Props {
  categoryLvl1: CategoryLvl1
}

function CategoryFilterLvl1({ categoryLvl1 }: CategoryFilterLvl1Props) {
  const currCategoryLvl1 = useSelector((state: RootState) => state.sidebar.currCategoryLvl1)
  const dispatch = useDispatch<AppDispatch>()
  return (
    <Stack
      component="button"
      sx={{ bgcolor: 'transparent', border: 'none', cursor: 'pointer' }}
      direction="row"
      alignItems="center"
      onClick={e => {
        if (categoryLvl1.name === currCategoryLvl1) {
          dispatch(setCurrCategoryLnl1(''))
        } else {
          dispatch(setCurrCategoryLnl1(categoryLvl1.name))
        }
      }}
    >
      {currCategoryLvl1 === categoryLvl1.name ? (
        <Box display="flex" alignItems="center" fontSize="12px" color="dark.500" mr="16px">
          <FontAwesomeIcon icon={faCaretUp} />
        </Box>
      ) : (
        <Box display="flex" alignItems="center" fontSize="12px" color="dark.500" mr="16px">
          <FontAwesomeIcon icon={faCaretDown} />
        </Box>
      )}
      <Typography
        color="dark.1000"
        fontSize="14.4px"
        fontWeight={currCategoryLvl1 === categoryLvl1.name ? 'bold' : 'normal'}
      >
        {categoryLvl1.name}
      </Typography>
      <Chip label={categoryLvl1.quantity} size="small" sx={styles.tag} />
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
    mt: '6px',
    ml: '10px',
    bgcolor: 'dark.50',
    color: 'dark.800',
    borderRadius: '4px',
    '& .MuiChip-label.MuiChip-labelSmall': {
      pl: '0px',
      pr: '0px'
    }
  }
}

export default CategoryFilterLvl1
