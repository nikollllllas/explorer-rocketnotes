import { Container, Content, Links } from './styles'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { api } from '../../services/api'
import { Tag } from '../../components/Tag'
import { Button } from '../../components/Button'
import { Header } from '../../components/header'
import { Section } from '../../components/section'
import { ButtonText } from '../../components/ButtonText'

export function Details() {
  const [data, setData] = useState(null)
  const params = useParams()
  const navigate = useNavigate()

  function handleBack() {
    navigate(-1)
  }

  async function handleDelete() {
    const confirm = window.confirm('Deseja excluir a nota?')

    if (confirm) {
      await api.delete(`/notes/${params.id}`)
      navigate(-1)
    }
  }

  useEffect(() => {
    async function getNote() {
      const res = await api.get(`/notes/${params.id}`)
      setData(res.data)
    }

    getNote()
  }, [])

  return (
    <Container>
      <Header />
      {data && (
        <main>
          <Content>
            <ButtonText
              title='Excluir nota'
              onClick={handleDelete}
            />
            <h1>{data.title}</h1>
            <p>{data.description}</p>
            {data.links && (
              <Section title={'Links úteis'}>
                <Links>
                  {data.links.map((link) => (
                    <li key={String(link.id)}>
                      <a
                        href={link.url}
                        target='_blank'
                        rel='noreferrer'>
                        {link.url}
                      </a>
                    </li>
                  ))}
                </Links>
              </Section>
            )}
            {data.tags && (
              <Section title={'Tags'}>
                {data.tags.map((tag) => (
                  <Tag
                    key={String(tag.id)}
                    title={tag.name}
                  />
                ))}
              </Section>
            )}
            <Button
              title='Voltar'
              onClick={handleBack}
            />
          </Content>
        </main>
      )}
    </Container>
  )
}
