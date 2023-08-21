import { Theme } from '@emotion/react'
import { Checkbox, Chip, FormControlLabel, Stack, SxProps } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'store'
import { Brand } from 'types/grid.type'
import { addCurrBrands, removeCurrBrands } from '../../sidebar.slice'

interface BrandFilterItemProps {
  brand: Brand
}

function BrandFilterItem({ brand }: BrandFilterItemProps) {
  const currBrands = useSelector((state: RootState) => state.sidebar.currBrands)
  const isChecked = currBrands.includes(brand.name)
  const dispatch = useDispatch<AppDispatch>()
  const handleCheckBoxOnChange = (e: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    if (checked) {
      dispatch(addCurrBrands(brand.name))
    } else {
      dispatch(removeCurrBrands(brand.name))
    }
  }
  return (
    <Stack direction="row" alignItems="center" spacing="10px">
      <FormControlLabel
        sx={{
          m: '0',
          '& .MuiTypography-root': { fontSize: '14px' },
          '& .MuiButtonBase-root-MuiCheckbox-root': { p: '0' }
        }}
        control={
          <Checkbox
            checked={isChecked}
            value="apple"
            size="small"
            style={{ padding: 4, paddingRight: 8 }}
            onChange={handleCheckBoxOnChange}
          />
        }
        label={brand?.name}
      />
      <Chip label={brand?.quantity} size="small" sx={styles.tag} />
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
    borderRadius: '4px',
    '& .MuiChip-label.MuiChip-labelSmall': {
      pl: '0px',
      pr: '0px'
    }
  }
}

export default BrandFilterItem
