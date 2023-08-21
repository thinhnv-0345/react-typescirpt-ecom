import { FormControlLabel, Stack, Switch, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'store'
import { setIsFreeShip } from '../../sidebar.slice'

function FreeShipFilter() {
  const dispatch = useDispatch<AppDispatch>()
  const isFreeShip = useSelector((state: RootState) => state.sidebar.isFreeShip)

  const handleSwitchOnChange = (e: React.ChangeEvent<HTMLInputElement>, value: boolean) => {
    if (value) {
      dispatch(setIsFreeShip(true))
    } else {
      dispatch(setIsFreeShip(false))
    }
  }

  return (
    <Stack width="100%" alignItems="flex-start" pt="32px" pb="32px">
      <Typography fontSize="11px" fontWeight="500" letterSpacing="1px">
        FREE SHIPPING
      </Typography>
      <Stack
        direction="row"
        width="100%"
        sx={{ cursor: 'pointer', '& .MuiFormControlLabel-root': { mr: '0px' } }}
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography fontSize="14.4px" fontWeight="400" maxWidth="200px" mt="16px">
          Display only items with free shipping
        </Typography>
        <FormControlLabel
          control={<Switch checked={isFreeShip ? true : false} onChange={handleSwitchOnChange} />}
          label=""
        />
      </Stack>
    </Stack>
  )
}

export default FreeShipFilter
