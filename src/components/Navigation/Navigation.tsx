import { Button, Stack } from '@mui/material'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { RootState } from 'store'

function Navigation() {
  const isLogin = useSelector((state: RootState) => state.auth.isLoggined)
  return (
    <Stack>
      <Stack
        direction="row"
        alignContent="center"
        justifyContent="space-between"
        bgcolor="primary.500"
        p="10px 20px"
        height="50px"
      >
        <Stack direction="row"></Stack>
        {isLogin && (
          <Button
            sx={{
              color: 'white',
              bgcolor: 'transparent',
              '&:hover': { bgcolor: 'transparent' }
            }}
          >
            Logout
          </Button>
        )}
      </Stack>
      <Outlet />
    </Stack>
  )
}

export default Navigation
