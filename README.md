# Node From Zero

## Introdução

Este projeto é um projeto de estudos baseado em um vídeo da RocketSeat. Criei ele para poder relembrar alguns conceitos de Node.js e também aprender a utilizar o Fastify para criar cruds.

## Passo a passo do que foi feito no projeto

O primeiro passo que fiz foi instalar o Fastify no meu repositório, seguindo as instruções da [documentação](https://fastify.dev/).

Após instalar o Fastify, criei as rotas que serão utilizadas no projeto dentro do arquivo `server.js` contido na raiz do projeto.

```js
import { fastify } from 'fastify'

const server = fastify()

server.post('/videos', () => {
  // Content
})

server.get('/videos', () => {
  // Content
})

server.put('/videos/:id', () => {
  // Content
})

server.delete('/videos/:id', () => {
  // Content
})

server.listen({
  port: 3333,
})
```

A principio, apenas como forma de teste, criei uma class `DatabaseMemory` para armazenar os dados em um map e fazer as operações de CRUD para entender como Fatify funciona. A classe contém um Map para salvar os dados e um método para cada verbo do CRUD.

```js
import { randomUUID } from "node:crypto"

export class DatabaseMemory {
  #videos = new Map()

  list() {
    return Array.from(this.#videos.entries()).map((videoArray) => {
      const id = videoArray[0]
      const data = videoArray[1]

      return {
        id,
        ...data,
      }
    })
  }

  create(video) {
    const videoId =  randomUUID()

    this.#videos.set(videoId, video)
  }

  update(id, video) {
    this.#videos.set(id, video)
  }

  delete(id) {
    this.#videos.delete(id)
  }
}
```

Depois disto, atualizei minhas rotas para realizar as ações do CRUD utilizando este banco em memória.

```js
import { fastify } from 'fastify'
import { DatabaseMemory } from './database-memory.js'

const server = fastify()

const database = new DatabaseMemory()

server.post('/videos', (request, reply) => {
  const { title, description, duration } = request.body

  database.create({
    title,
    description,
    duration,
  })

  return reply.status(201).send()
})

server.get('/videos', () => {
  const videos = database.list()
  
  return videos
})

server.put('/videos/:id', (request, reply) => {
  const videoId = request.params.id
  const { title, description, duration } = request.body

  const video = database.update(videoId, {
    title,
    description,
    duration,
  })

  return reply.status(204).send()
})

server.delete('/videos/:id', (request, reply) => {
  const videoId = request.params.id

  database.delete(videoId)

  return reply.status(204).send()
})

server.listen({
  port: 3333,
})
```

Com isso, pude testar todas as rotas criada utilizando a extensão `REST Client` do VSCode. Isto poderia ser feito também com Postman, Insomnia, etc... Fiz apenas como forma de testar as rotas inicialmente.