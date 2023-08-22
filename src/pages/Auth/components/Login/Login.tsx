import { Button, Stack, Typography } from '@mui/material'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'store'

function Login() {
  const dispatch = useDispatch<AppDispatch>()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset
  } = useForm()

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({ something: '' })
    }
  }, [isSubmitSuccessful, reset])

  const onSubmitHandle = (data: any) => {
    if (data.email === 'thinh@gmail.com' && data.password === '1121212') {
      dispatch(Login())
    }
    reset()
  }
  return (
    <Stack alignItems="center" justifyContent="center" mt="80px">
      <Stack
        component="form"
        spacing="20px"
        bgcolor={'dark.50'}
        width="500px"
        padding="20px"
        borderRadius="5px"
        onSubmit={handleSubmit(onSubmitHandle)}
      >
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            // name="email"
            id="email"
            style={{
              padding: '5px 10px',
              display: 'block',
              borderColor: '#e2a400',
              outline: 'none',
              borderRadius: '5px',
              width: '100%'
            }}
            {...register('email', {
              required: true,
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'invalid email address'
              }
            })}
          />
          {errors.email?.type === 'pattern' && (
            <Typography color="#eb4d4b">{errors.email.message?.toString()}</Typography>
          )}
          {errors.email?.type === 'required' && (
            <Typography color="#eb4d4b">This field is required</Typography>
          )}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            // name="password"
            id="password"
            style={{
              padding: '5px 10px',
              display: 'block',
              outline: 'none',
              borderColor: '#e2a400',
              borderRadius: '5px',
              width: '100%'
            }}
            {...register('password', { required: true, minLength: 6 })}
          />
          {errors.password?.type === 'required' && (
            <Typography color="#eb4d4b">This field is required</Typography>
          )}
          {errors.password?.type === 'minLength' && (
            <Typography color="#eb4d4b">Passwords must be at least 6 characters</Typography>
          )}
        </div>
        <Button type="submit" variant="contained" sx={{ color: 'white' }}>
          Login
        </Button>
      </Stack>
    </Stack>
  )
}

export default Login
