import { useState } from 'react'
import { api } from '../../services/api'
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'
import { Link, useNavigate } from 'react-router-dom'
import { FiLock, FiMail, FiUser } from 'react-icons/fi'
import { BackgroundImage, Container, Form } from './styles'

export function SignUp() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  function handleSignUp() {
    if (!name || !email || !password) {
      return alert('Preencha todos os campos!')
    }

    api
      .post('/users', { name, email, password })
      .then(() => {
        alert('User created successfully!')
        navigate('/')
      })
      .catch((e) => {
        if (e.res) {
          alert(e.res.data.message)
        } else {
          alert('Error: User not created!')
        }
      })
  }

  return (
    <Container>
      <BackgroundImage />
      <Form>
        <h1>RocketNotes</h1>
        <p>Aplicação para gerenciar e salvar seus links úteis.</p>

        <h2>Crie sua conta</h2>

        <Input
          placeholder={'Nome'}
          type={'text'}
          icon={FiUser}
          onChange={(e) => setName(e.target.value)}
        />

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
          title={'Cadastrar'}
          onClick={handleSignUp}
        />

        <Link to='/'>Voltar para o Login</Link>
      </Form>
    </Container>
  )
}
