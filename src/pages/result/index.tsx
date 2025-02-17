import React, { useState, useMemo, useCallback } from 'react'
import styled from 'styled-components'
import { MENU_LIST } from '@/constants/menu'
import { useLikes } from './useLikes'
import MenuModal from './components/MenuModal'
import { useLocation, useNavigate } from 'react-router-dom'
import SvgIcon from '@/components/SvgIcon'
import { ROUTER } from '@/constants/router'

interface Menu {
  id: number
  brand: string
  name: string
  image: string
  description: string
  flavorProfile?: string
  gender: string[]
}

interface LocationState {
  result: {
    gender: 'male' | 'female'
  }
}

const LazyImage = React.memo(({ src, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => {
  const [isLoaded, setIsLoaded] = useState(false)

  const handleImageLoad = React.useCallback(() => {
    setIsLoaded(true)
  }, [])

  return (
    <img
      src={src}
      alt={alt}
      {...props}
      style={{
        opacity: isLoaded ? 1 : 0.5,
        transition: 'opacity 0.3s ease-in-out',
      }}
      onLoad={handleImageLoad}
    />
  )
})

const Result = React.memo(() => {
  const [selectedMenu, setSelectedMenu] = useState<Menu | null>(null)
  const { toggleLike, getLikeCount } = useLikes()
  const location = useLocation()
  const navigation = useNavigate()
  const result = (location.state as LocationState)?.result

  // 메모이제이션된 필터링된 메뉴
  const filteredMenus = useMemo(() => MENU_LIST.filter((menu) => menu.gender.includes(result?.gender || 'female')), [result?.gender])

  // 메모이제이션된 타이틀 텍스트
  const titleText = useMemo(() => ((result?.gender ?? 'female') === 'male' ? '남성이시군요! 아래 메뉴를 추천해 드립니다~!' : '여성이시군요! 아래 메뉴를 추천해 드립니다~!'), [result?.gender])

  // useCallback으로 메모이제이션된 핸들러
  const handleMenuClick = useCallback((menu: Menu) => {
    setSelectedMenu(menu)
  }, [])

  const handleGoHomeButton = useCallback(() => {
    navigation(ROUTER.MAIN)
  }, [navigation])

  return (
    <Container>
      <Title>{titleText}</Title>
      <Subtitle>메뉴를 터치하시면 상세 정보를 보실 수 있습니다.</Subtitle>
      <MenuContainer>
        {filteredMenus.map((menu) => (
          <MenuItem key={menu.id} onClick={() => handleMenuClick(menu)}>
            <LazyImage src={menu.image} alt={menu.name} width={250} height={250} loading='lazy' />
            <MenuName>{menu.name}</MenuName>
            <MenuBottom>
              <p>억셉트커피</p>
              <LikeButton>
                <SvgIcon name='heart' size={12} style={{ transform: 'translateY(1px)' }} />
                <LikeCount>{getLikeCount(menu.id)}</LikeCount>
              </LikeButton>
            </MenuBottom>
          </MenuItem>
        ))}
      </MenuContainer>
      <GoHomeButton onClick={handleGoHomeButton}>
        <SvgIcon name='home' size={20} />
        <span>홈으로</span>
      </GoHomeButton>
      {selectedMenu && <MenuModal menu={selectedMenu} onClose={() => setSelectedMenu(null)} onLike={() => toggleLike(selectedMenu.id)} likeCount={getLikeCount(selectedMenu.id)} />}
    </Container>
  )
})

export default Result

const Container = styled.div`
  position: relative;
  padding: 40px 5%;
  max-width: 1200px;
  margin: 0 auto;
`

const Title = styled.h2`
  margin-bottom: 15px;
  text-align: left;
  font-size: 40px;
  font-weight: 300;
`

const Subtitle = styled.p`
  margin-bottom: 24px;
  font-weight: 300;
  font-size: 23px;
  color: #666;
`

const MenuContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 15px;
  width: 100%;
`

const MenuItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  cursor: pointer;
  transition: transform 0.2s;
  overflow: hidden;

  &:hover {
    transform: scale(1.02);
  }
`

const MenuName = styled.span`
  font-size: 18px;
  font-weight: 400;
  margin-top: 11px;
  text-align: left;
  width: 100%;
  color: #333;
  padding-left: 4px;
`

const MenuBottom = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-top: 11px;
  padding: 0 4px;

  p {
    font-size: 14px;
    font-weight: 700;
  }
`

const LikeButton = styled.button`
  background: #ff0000cc;
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 5px 10px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 700;

  &:hover {
    background-color: #ff3333;
    transform: scale(1.05);
  }
`

const LikeCount = styled.span`
  color: white;
  font-weight: 600;
`

const GoHomeButton = styled.div`
  position: fixed;
  width: 60px;
  height: 60px;
  bottom: 55px;
  right: 69px;
  border-radius: 24px;
  background-color: #000000b2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;

  span {
    font-size: 12px;
  }
`
