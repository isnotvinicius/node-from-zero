/**
 * Classe apenas de teste para validar as rotas.
 * App usa PostgreSQL como banco de dados.
 */

import { randomUUID } from "node:crypto"

export class DatabaseMemory {
  // Propriedade com # torna-se privada, apenas a classe enxerga ela.
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