import { Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import CategoryFilterItem from './CategoryFilterItem'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'store'
import { setCurrCategoryLnl0, setCurrCategoryLnl1 } from '../../sidebar.slice'

function CategoryFilter() {
  const categories = useSelector((state: RootState) => state.grid.categories)
  const currCategoryLvl0 = useSelector((state: RootState) => state.sidebar.currCategoryLvl0)
  const dispatch = useDispatch<AppDispatch>()
  const [expanded, setExpanded] = useState<string | false>(false)

  useEffect(() => {
    if (currCategoryLvl0 === '') {
      setExpanded('')
    }
  }, [currCategoryLvl0])

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false)
    if (currCategoryLvl0 === panel) {
      dispatch(setCurrCategoryLnl0(''))
      dispatch(setCurrCategoryLnl1(''))
    } else {
      dispatch(setCurrCategoryLnl0(panel))
      dispatch(setCurrCategoryLnl1(''))
    }
  }

  return (
    <Stack width="100%" alignItems="flex-start" pt="32px" pb="32px">
      <Typography fontSize="11px" fontWeight="500" letterSpacing="1px">
        CATEGORIES
      </Typography>
      <Stack component="ul" width="100%" alignItems="flex-start" pl="0" m="0" mt="8px">
        {categories.map(item => {
          return (
            <CategoryFilterItem
              key={item.name}
              categoryLvl0={item}
              expanded={expanded}
              handleChange={handleChange}
            />
          )
        })}
      </Stack>
    </Stack>
  )
}

export default CategoryFilter
