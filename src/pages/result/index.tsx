import { MENU_LIST } from '@/constants/menu'
import styled from 'styled-components'
import { useState } from 'react'
import { useLikes } from './useLikes'
import MenuModal from './components/MenuModal'
import { useLocation } from 'react-router-dom'

interface Menu {
  name: string
  image: string
}

interface LocationState {
  result: {
    gender: 'male' | 'female' // 따옴표 없이 리터럴 타입으로 정의
  }
}

const Result = () => {
  const [selectedMenu, setSelectedMenu] = useState<Menu | null>(null)
  const { toggleLike, getLikeCount } = useLikes()
  const location = useLocation()
  const result = (location.state as LocationState)?.result

  // 성별에 따른 메뉴 필터링
  const filteredMenus = MENU_LIST.filter((menu) => menu.gender.includes(result?.gender || 'female'))

  // 성별에 따른 타이틀 텍스트
  const titleText = (result?.gender ?? 'female') === 'male' ? '남성이시군요! 아래 메뉴를 추천해 드립니다~!' : '여성이시군요! 아래 메뉴를 추천해 드립니다~!'

  const handleMenuClick = (menu: Menu) => {
    setSelectedMenu(menu)
  }

  const handleLikeClick = (e: React.MouseEvent, menu: Menu) => {
    e.stopPropagation()
    toggleLike(menu.name)
  }

  return (
    <Container>
      <Title>{titleText}</Title>
      <MenuContainer>
        {filteredMenus.map((menu, index) => (
          <MenuItem key={index} onClick={() => handleMenuClick(menu)}>
            <MenuImage src={menu.image} alt={menu.name} />
            <LikeButton onClick={(e) => handleLikeClick(e, menu)}>
              하트
              <LikeCount>{getLikeCount(menu.name)}</LikeCount>
            </LikeButton>
            <MenuName>{menu.name}</MenuName>
          </MenuItem>
        ))}
      </MenuContainer>

      {selectedMenu && <MenuModal menu={selectedMenu} onClose={() => setSelectedMenu(null)} onLike={() => toggleLike(selectedMenu.name)} likeCount={getLikeCount(selectedMenu.name)} />}
    </Container>
  )
}
export default Result

const Container = styled.div`
  padding: 20px;
`

const Title = styled.h2`
  margin-bottom: 20px;
  text-align: center;
`

const MenuContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
`

const MenuItem = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.02);
  }
`

const MenuImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 10px;
`

const LikeButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin: 8px 0;
  display: flex;
  align-items: center;
  gap: 4px;
  color: #ff4b4b;
  transition: transform 0.2s;
  padding: 4px 8px;
  border-radius: 4px;

  &:hover {
    background-color: rgba(255, 75, 75, 0.1);
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }
`

const LikeCount = styled.span`
  font-size: 14px;
  font-weight: 500;
  min-width: 20px;
  color: #666;
`

const MenuName = styled.span`
  font-size: 16px;
  font-weight: 500;
  text-align: center;
`
