import React, { useContext } from 'react'
import { Alert, Button, Col, Form, Row, Stack } from 'react-bootstrap'
import { AuthContext } from '../context/AuthContextProvider'

const Login = () => {
  const {
        loginInfo,
        loginLoading,
        loginError,
        updateLoginInfo,
        loginUser,
  } = useContext(AuthContext)
  return (
    <>
    <Form onSubmit={loginUser}>
      <Row style={{
        height:'100vh',
        justifyContent:'center',
        paddingTop:"10%"
      }}>
        <Col xs={6}>
          <Stack gap={3}>
            <h2>Login</h2>
            <Form.Control type='email' placeholder='Email' onChange={(e)=> updateLoginInfo({...loginInfo, email: e.target.value})}/>
            <Form.Control type='password' placeholder='password' onChange={(e)=> updateLoginInfo({...loginInfo, password: e.target.value})}/>
            <Button variant='primary' type='submit'>
            {loginLoading? "Logging in...":"Login"}
            </Button>
            {
              loginError?.error && (
                <Alert variant='danger'>
              <p>{loginError?.message}</p>
            </Alert>
              )
            }
          </Stack>
        </Col>
      </Row>
    </Form>
    </>
  )
}

export default Login