import { Skeleton, Stack } from '@mui/material'

function ContentLoading() {
  return (
    <Stack spacing="8px" alignItems="flex-start">
      <Skeleton sx={{ borderRadius: '5px' }} variant="rectangular" width="100%" height="160px" />
      <Skeleton sx={{ borderRadius: '5px' }} variant="rectangular" width="20%" height="20px" />
      <Skeleton sx={{ borderRadius: '5px' }} variant="rectangular" width="70%" height="20px" />
      <Skeleton sx={{ borderRadius: '5px' }} variant="rectangular" width="95%" height="20px" />
      <Skeleton sx={{ borderRadius: '5px' }} variant="rectangular" width="60%" height="20px" />
    </Stack>
  )
}

export default ContentLoading
