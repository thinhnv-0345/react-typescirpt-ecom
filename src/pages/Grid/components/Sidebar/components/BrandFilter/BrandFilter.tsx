import { Theme } from '@emotion/react'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, Button, FormControl, Input, Stack, SxProps, Typography } from '@mui/material'
import BrandFilterItem from './BrandFilterItem'
import { useSelector } from 'react-redux'
import { RootState } from 'store'
import { useState } from 'react'

function BrandFilter() {
  const [searchKey, setSearchKey] = useState<string>('')
  const brands = useSelector((state: RootState) => state.grid.brands)

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSearchKey('')
  }
  return (
    <Stack width="100%" alignItems="flex-start" pt="32px" pb="32px">
      <Typography fontSize="11px" fontWeight="500" letterSpacing="1px">
        BRANDS
      </Typography>
      <Box
        component="form"
        borderRadius="10px"
        width="100%"
        pt="16px"
        pb="16px"
        onSubmit={handleOnSubmit}
      >
        <FormControl sx={styles.formControl}>
          <Button
            sx={{ bgcolor: 'transparent', '&:hover': { bgcolor: 'transparent' }, minWidth: '36px' }}
          >
            <Box color="dark.500" fontSize="12px">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </Box>
          </Button>
          <Input
            disableUnderline
            size="small"
            sx={styles.input}
            placeholder="Search for brands..."
            value={searchKey || ''}
            onChange={e => {
              setSearchKey(e.target.value)
            }}
          />
        </FormControl>
      </Box>
      <Stack component="ul" pl="0" alignItems="flex-start" m="0">
        {brands
          .filter(item => {
            return searchKey.toLowerCase() === ''
              ? item
              : item.name.toLowerCase().includes(searchKey.toLowerCase())
          })
          .map((item, index) => {
            if (index > 9) return null
            return <BrandFilterItem key={item.name} brand={item} />
          })}
      </Stack>
    </Stack>
  )
}

interface Styles {
  input: SxProps<Theme>
  formControl: SxProps<Theme>
}

const styles: Styles = {
  input: {
    flexGrow: 1,
    fontSize: '12px',
    color: 'dark.800',
    bgcolor: 'transparent',
    '& .MuiInputBase-input-MuiInput-input': {
      p: '0'
    }
  },
  formControl: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    bgcolor: 'darkGray.60',
    height: '40px',
    borderRadius: '2px'
  }
}

export default BrandFilter
