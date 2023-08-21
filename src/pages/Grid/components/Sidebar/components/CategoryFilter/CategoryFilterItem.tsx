import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Chip,
  Stack,
  SxProps,
  Typography
} from '@mui/material'
import CategoryFilterLvl1 from './CategoryFilterLvl1'
import { Theme } from '@emotion/react'
import { CategoryLvl0 } from 'types/grid.type'
import { useSelector } from 'react-redux'
import { RootState } from 'store'

interface CategoryFilterItemProps {
  categoryLvl0: CategoryLvl0
  expanded: string | false
  handleChange: (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => void
}

function CategoryFilterItem({ categoryLvl0, expanded, handleChange }: CategoryFilterItemProps) {
  const currCategoryLvl0 = useSelector((state: RootState) => state.sidebar.currCategoryLvl0)

  return (
    <Accordion
      disableGutters
      expanded={expanded === categoryLvl0.name}
      onChange={handleChange(categoryLvl0.name)}
      sx={{
        width: '100%',
        boxShadow: 'none',
        '&:before': {
          backgroundColor: 'transparent'
        }
      }}
    >
      <AccordionSummary
        sx={{
          p: '0',
          minHeight: 'auto',
          alignItems: 'center',
          '& .MuiAccordionSummary-content': { m: '4px 0' },
          '& .MuiAccordionSummary-content.Mui-expanded': { m: '4px 0' }
        }}
      >
        {expanded === categoryLvl0?.name ? (
          <Box
            display="flex"
            alignItems="center"
            fontSize="12px"
            color="dark.500"
            mr="16px"
            fontWeight={currCategoryLvl0 === categoryLvl0.name ? 'bold' : 'normal'}
          >
            <FontAwesomeIcon icon={faCaretDown} />
          </Box>
        ) : (
          <Box
            display="flex"
            alignItems="center"
            fontSize="12px"
            color="dark.500"
            mr="16px"
            fontWeight={currCategoryLvl0 === categoryLvl0.name ? 'bold' : 'normal'}
          >
            <FontAwesomeIcon icon={faCaretUp} />
          </Box>
        )}
        <Typography
          color="dark.1000"
          fontSize="14.4px"
          fontWeight={currCategoryLvl0 === categoryLvl0.name ? 'bold' : 'normal'}
        >
          {categoryLvl0?.name}
        </Typography>
        <Chip label={categoryLvl0?.quantity} size="small" sx={styles.tag} />
      </AccordionSummary>
      <AccordionDetails sx={{ p: '4px 0 4px 16px' }}>
        <Stack component="ul" pl="0" m="0" spacing="8px">
          {categoryLvl0?.lv1.map(item => (
            <CategoryFilterLvl1 key={item.name} categoryLvl1={item} />
          ))}
        </Stack>
      </AccordionDetails>
    </Accordion>
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

export default CategoryFilterItem
