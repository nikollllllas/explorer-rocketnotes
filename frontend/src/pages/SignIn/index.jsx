import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/auth'
import { Input } from '../../components/Input'
import { FiLock, FiMail } from 'react-icons/fi'
import { Button } from '../../components/Button'
import { BackgroundImage, Container, Form } from './styles'

export function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { signIn } = useAuth()

  function handleSignIn() {
    signIn({
      email,
      password
    })
  }

  return (
    <Container>
      <Form>
        <h1>RocketNotes</h1>
        <p>Aplicação para gerenciar e salvar seus links úteis.</p>

        <h2>Realize o Login</h2>

        <Input
          placeholder={'E-mail'}
          type={'text'}
          icon={FiMail}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          placeholder={'Senha'}
          type='password'
          icon={FiLock}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          title={'Entrar'}
          onClick={handleSignIn}
        />

        <Link to='/register'>Criar conta</Link>
      </Form>
      <BackgroundImage />
    </Container>
  )
}
