// hooks/useLikes.ts
import { useState, useEffect } from 'react'

const STORAGE_KEY = 'menu_likes_count'

interface LikeCount {
  [menuName: string]: number
}

export const useLikes = () => {
  const [likeCounts, setLikeCounts] = useState<LikeCount>(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : {}
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(likeCounts))
  }, [likeCounts])

  const toggleLike = (menuName: string) => {
    setLikeCounts((prev) => ({
      ...prev,
      [menuName]: (prev[menuName] || 0) + 1,
    }))
  }

  const getLikeCount = (menuName: string) => {
    return likeCounts[menuName] || 0
  }

  return { toggleLike, getLikeCount }
}
