import { useState } from 'react'

// 전역 카운트 저장소 (앱 전체에서 공유되는 좋아요 수)
const STORAGE_KEY = 'menu_likes_count'

interface LikeCount {
  [menuId: number]: number
}

interface LikedItems {
  [menuId: number]: boolean
}

export const useLikes = () => {
  // 좋아요 카운트 - localStorage에서 불러와 초기화
  const [likeCounts, setLikeCounts] = useState<LikeCount>(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : {}
  })

  // 좋아요 상태 - 현재 세션에서만 유지 (result 페이지 내에서만 유효)
  const [likedItems, setLikedItems] = useState<LikedItems>({})

  // 좋아요 토글 (추가/제거)
  const toggleLike = (menuId: number) => {
    const isCurrentlyLiked = likedItems[menuId] || false

    // 좋아요 상태 토글 (현재 세션에서만)
    setLikedItems((prev) => ({
      ...prev,
      [menuId]: !isCurrentlyLiked,
    }))

    // 좋아요 카운트 업데이트 (전역)
    setLikeCounts((prev) => {
      const currentCount = prev[menuId] || 0
      const newCounts = {
        ...prev,
        [menuId]: isCurrentlyLiked
          ? Math.max(0, currentCount - 1) // 좋아요 취소
          : currentCount + 1, // 좋아요 추가
      }

      // localStorage에 업데이트
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newCounts))

      return newCounts
    })
  }

  // 현재 세션에서의 좋아요 상태 확인
  const isLiked = (menuId: number) => {
    return likedItems[menuId] || false
  }

  // 모든 사용자의 누적 좋아요 개수 확인
  const getLikeCount = (menuId: number) => {
    return likeCounts[menuId] || 0
  }

  return { toggleLike, getLikeCount, isLiked }
}
