import { Theme } from '@emotion/react'
import { Slider, Stack, SxProps, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'store'
import { setCurrRangeValue } from '../../sidebar.slice'
import { MIN_RANGE_VALUE, ONE_PER_CENT_VALUE } from '../../Sidebar'

function valuetext(value: number) {
  return `$ ${value}`
}

function valueFomat(value: number) {
  return `${Math.round(MIN_RANGE_VALUE + value * ONE_PER_CENT_VALUE)}`
}

function PriceFilter() {
  const [value, setValue] = useState<number[]>([0, 100])
  const dispatch = useDispatch<AppDispatch>()
  const currRangeValue = useSelector((state: RootState) => state.sidebar.currRangeValue)

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[])
  }

  useEffect(() => {
    if (currRangeValue[0] === 0 && currRangeValue[1] === 100) {
      setValue([0, 100])
    }
  }, [currRangeValue])

  return (
    <Stack width="100%" alignItems="flex-start" pt="32px" pb="32px">
      <Typography fontSize="11px" fontWeight="500" letterSpacing="1px">
        PRICES
      </Typography>
      <Slider
        getAriaLabel={() => 'Temperature range'}
        value={value}
        onChange={handleChange}
        onChangeCommitted={(e, val) => {
          setTimeout(() => {
            dispatch(setCurrRangeValue(val as number[]))
          }, 100)
        }}
        valueLabelDisplay="on"
        getAriaValueText={valuetext}
        valueLabelFormat={valueFomat}
        sx={styles.rangeSlider}
      />
    </Stack>
  )
}

interface Styles {
  rangeSlider: SxProps<Theme>
}

const styles: Styles = {
  rangeSlider: {
    mt: '32px',
    width: '95%',
    alignSelf: 'center',
    '& .MuiSlider-thumb': {
      height: 16,
      width: 16,
      backgroundColor: '#fff',
      boxShadow: 'none',
      '&:focus, &:hover, &.Mui-active': {
        boxShadow: '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.01)',
        '@media (hover: none)': {
          boxShadow: 'none'
        }
      }
    },
    '& .MuiSlider-valueLabel': {
      fontSize: 12,
      fontWeight: 'bold',
      top: -6,
      backgroundColor: 'unset',
      color: 'dark.800',
      '&:after': {
        content: '"$"',
        color: 'primary.500',
        pl: '2px'
      },
      '& *': {
        background: 'transparent'
      }
    }
  }
}

export default PriceFilter
