'use client'
import React, { useState, useEffect } from 'react'

interface Props {
  title: string
}

export default function ContadorPersonalizado({ title }: Props) {

  const chave = `likes_${title}`

  const [likes, setLikes] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(chave)
      return stored ? parseInt(stored) : 0
    }
    return 0
  })

  useEffect(() => {
    localStorage.setItem(chave, String(likes))
  }, [likes, chave])

  return (
    <button onClick={() => setLikes(likes + 1)}>
      {title}: {likes}
    </button>
  )
}
