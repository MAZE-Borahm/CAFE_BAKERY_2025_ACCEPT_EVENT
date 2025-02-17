import { useState, useEffect } from 'react'

const STORAGE_KEY = 'menu_likes_count'

interface LikeCount {
  [menuId: number]: number
}

export const useLikes = () => {
  const [likeCounts, setLikeCounts] = useState<LikeCount>(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : {}
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(likeCounts))
  }, [likeCounts])

  const toggleLike = (menuId: number) => {
    setLikeCounts((prev) => ({
      ...prev,
      [menuId]: (prev[menuId] || 0) + 1,
    }))
  }

  const getLikeCount = (menuId: number) => {
    return likeCounts[menuId] || 0
  }

  return { toggleLike, getLikeCount }
}
