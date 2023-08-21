import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, Stack, Typography } from '@mui/material'
import Highlighter from 'react-highlight-words'
import { useSelector } from 'react-redux'
import { RootState } from 'store'
import { Product } from 'types/grid.type'

interface ProductCardProps {
  product: Product
}

function ProductCard({ product }: ProductCardProps) {
  const searchKeyword = useSelector((state: RootState) => state.grid.searchKeyword)
  return (
    <Stack alignItems="flex-start" p="10px" borderRadius="5px">
      <Box width="100%" height="200px" display="flex" justifyContent="center" alignItems="center">
        <img src={product?.image} alt="product" style={{ maxWidth: '100%' }} />
      </Box>
      <Typography
        textTransform="uppercase"
        fontSize="12px"
        letterSpacing="1px"
        fontWeight="bold"
        color="dark.500"
        mt="10px"
      >
        {product?.brand}
      </Typography>
      <Typography fontSize="14.4px" fontWeight="bold" color="dark.800">
        <Highlighter
          highlightClassName="YourHighlightClass"
          searchWords={[searchKeyword]}
          autoEscape={true}
          textToHighlight={product?.name}
        />
      </Typography>
      <Typography fontSize="14.4px" color="dark.800" height="40px" overflow="hidden">
        {product?.description}
      </Typography>
      <Stack direction="row" alignItems="center" spacing="2px" mt="10px">
        <Typography fontSize="11px" color="primary.500" fontWeight="bold">
          $
        </Typography>
        <Typography fontSize="14px" color="dark.800" fontWeight="bold" pr="6px">
          {product?.price}
        </Typography>
        <Stack
          direction="row"
          alignItems="center"
          border="0.5px solid"
          borderColor="primary.500"
          borderRadius="3px"
          fontSize="6px"
          pl="4px"
          pr="4px"
          spacing="2px"
          color="primary.500"
        >
          <FontAwesomeIcon icon={faStar} />
          <Typography fontSize="10px" fontWeight="bold">
            {product?.rating}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default ProductCard
