import { useEffect, useState } from 'react'
import { FiPlus, FiSearch } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { Brand, Container, Content, Menu, NewNote, Search } from './styles.js'
import { api } from '../../services/api.js'
import { Note } from '../../components/Note'
import { Input } from '../../components/Input'
import { Header } from '../../components/header/index.jsx'
import { Section } from '../../components/section/index.jsx'
import { ButtonText } from '../../components/ButtonText/index.jsx'

export function Home() {
  const [tags, setTags] = useState([])
  const [selectedTags, setSelectedTags] = useState([])
  const [search, setSearch] = useState('')
  const [notes, setNotes] = useState([])

  const navigate = useNavigate()

  function handleSelectedTags(tagName) {
    const alreadySelected = selectedTags.includes(tagName)

    if (tagName === 'all') {
      return setSelectedTags([])
    }

    if (alreadySelected) {
      const filteredTags = selectedTags.filter((tag) => tag !== tagName)
      setSelectedTags(filteredTags)
    } else {
      setSelectedTags((prevState) => [...prevState, tagName])
    }
  }

  function handleDetails(id) {
    navigate(`/details/${id}`)
  }

  useEffect(() => {
    async function getTags() {
      const res = await api.get('/tags')
      setTags(res.data)
    }

    getTags()
  }, [])

  useEffect(() => {
    async function getNotes() {
      const res = await api.get(`/notes?title=${search}&tags=${selectedTags}`)
      setNotes(res.data)
    }

    getNotes()
  }, [selectedTags, search])

  return (
    <Container>
      <Brand>
        <h1>RocketNotes</h1>
      </Brand>

      <Header />

      <Menu>
        <li>
          <ButtonText
            title='Todos'
            onClick={() => handleSelectedTags('all')}
            $isactive={selectedTags.length === 0}
          />
        </li>
        {tags &&
          tags.map((tag) => (
            <li key={String(tag.id)}>
              <ButtonText
                title={tag.name}
                onClick={() => handleSelectedTags(tag.name)}
                $isactive={selectedTags.includes(tag.name)}
              />
            </li>
          ))}
      </Menu>

      <Search>
        <Input
          placeholder={'Pesquisar pelo título'}
          icon={FiSearch}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Search>

      <Content>
        <Section title={'Minhas notas'}>
          {notes.map((note) => (
            <Note
              key={String(note.id)}
              data={note}
              onClick={() => handleDetails(note.id)}
            />
          ))}
        </Section>
      </Content>

      <NewNote to='/new'>
        <FiPlus />
        Criar nota
      </NewNote>
    </Container>
  )
}
