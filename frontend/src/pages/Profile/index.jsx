import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../../services/api'
import { useAuth } from '../../hooks/auth'
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'
import { Avatar, Container, Form } from './styles'
import avatarPlaceholder from '../../assets/avatar_placeholder.svg'

import { FiArrowLeft, FiUser, FiMail, FiLock, FiCamera } from 'react-icons/fi'

export function Profile() {
  const { user, updateProfile } = useAuth()
  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  const [oldPassword, setOldPassword] = useState()
  const [newPassword, setNewPassword] = useState()

  const navigate = useNavigate()

  function handleBack() {
    navigate(-1)
  }

  const avatarUrl = user.avatar
    ? `${api.defaults.baseURL}/files/${user.avatar}`
    : avatarPlaceholder
  const [avatar, setAvatar] = useState(avatarUrl)
  const [avatarFile, setAvatarFile] = useState(null)

  async function handleChangeAvatar(e) {
    const file = e.target.files[0]
    setAvatarFile(file)

    const imagePreview = URL.createObjectURL(file)
    setAvatar(imagePreview)
  }

  async function handleUpdate() {
    const updated = {
      name,
      email,
      password: newPassword,
      old_password: oldPassword
    }

    const updatedUser = Object.assign(user, updated)

    await updateProfile({ user: updatedUser, avatarFile })
  }

  return (
    <Container>
      <header>
        <button
          type='button'
          onClick={handleBack}>
          <FiArrowLeft />
        </button>
      </header>
      <Form>
        <Avatar>
          <img
            src={avatar}
            alt='Foto do Usuário'
          />
          <label htmlFor='avatar'>
            <FiCamera />
            <input
              id='avatar'
              type='file'
              onChange={handleChangeAvatar}
            />
          </label>
        </Avatar>
        <Input
          type='text'
          placeholder='Nome'
          icon={FiUser}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type='text'
          placeholder='E-mail'
          icon={FiMail}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type='password'
          placeholder='Senha atual'
          icon={FiLock}
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <Input
          type='password'
          placeholder='Nova senha'
          icon={FiLock}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <Button
          title='Salvar'
          onClick={handleUpdate}
        />
      </Form>
    </Container>
  )
}
