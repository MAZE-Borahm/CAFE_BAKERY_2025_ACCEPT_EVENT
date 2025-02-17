import { MENU_LIST } from '@/constants/menu'
import styled from 'styled-components'
import { useState } from 'react'
import { useLikes } from './useLikes'
import MenuModal from './components/MenuModal'
import { useLocation, useNavigate } from 'react-router-dom'
import SvgIcon from '@/components/SvgIcon'
import { ROUTER } from '@/constants/router'

interface Menu {
  name: string
  image: string
  description: string
}

interface LocationState {
  result: {
    gender: 'male' | 'female'
  }
}

const Result = () => {
  const [selectedMenu, setSelectedMenu] = useState<Menu | null>(null)
  const { toggleLike, getLikeCount } = useLikes()
  const location = useLocation()
  const navigation = useNavigate()
  const result = (location.state as LocationState)?.result

  // 성별에 따른 메뉴 필터링
  const filteredMenus = MENU_LIST.filter((menu) => menu.gender.includes(result?.gender || 'female'))

  // 성별에 따른 타이틀 텍스트
  const titleText = (result?.gender ?? 'female') === 'male' ? '남성이시군요! 아래 메뉴를 추천해 드립니다~!' : '여성이시군요! 아래 메뉴를 추천해 드립니다~!'

  const handleMenuClick = (menu: Menu) => {
    setSelectedMenu(menu)
  }

  const handleGoHomeButton = () => {
    navigation(ROUTER.MAIN)
  }

  return (
    <Container>
      <Title>{titleText}</Title>
      <Subtitle>메뉴를 터치하시면 상세 정보를 보실 수 있습니다.</Subtitle>
      <MenuContainer>
        {filteredMenus.map((menu, index) => (
          <MenuItem key={index} onClick={() => handleMenuClick(menu)}>
            <MenuImage src={menu.image} alt={menu.name} />
            <MenuName>{menu.name}</MenuName>
            <MenuBottom>
              <p>억셉트커피</p>
              <LikeButton>
                <SvgIcon name='heart' size={12} style={{ transform: 'translateY(1px)' }} />
                <LikeCount>{getLikeCount(menu.name)}</LikeCount>
              </LikeButton>
            </MenuBottom>
          </MenuItem>
        ))}
      </MenuContainer>
      <GoHomeButton onClick={handleGoHomeButton}>
        <SvgIcon name='home' size={32} />
        <span>홈으로</span>
      </GoHomeButton>

      {selectedMenu && <MenuModal menu={selectedMenu} onClose={() => setSelectedMenu(null)} onLike={() => toggleLike(selectedMenu.name)} likeCount={getLikeCount(selectedMenu.name)} />}
    </Container>
  )
}

export default Result

const Container = styled.div`
  position: relative;
  padding: 63px 129px 55px 113px;
  @media screen and (max-width: 1280px) {
    /* padding: 44px 91px 39px 80px; */
    padding: 44px 91px 39px 60px;
  }
`
const Title = styled.h2`
  margin-bottom: 24px;
  text-align: left;
  font-size: 64px;
  font-weight: 300;

  @media screen and (max-width: 1280px) {
    margin-bottom: 17px; // 24px * 0.705
    font-size: 45px; // 64px * 0.705
  }
`

const Subtitle = styled.p`
  margin-bottom: 38px;
  font-weight: 300;
  font-size: 36px;
  color: #666;

  @media screen and (max-width: 1280px) {
    margin-bottom: 27px; // 38px * 0.705
    font-size: 25px; // 36px * 0.705
  }
`

const MenuContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 32px;
  max-width: 1760px;
  margin: 0 auto;
`

const MenuItem = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start; // center에서 flex-start로 변경
  padding: 0; // 패딩 제거
  cursor: pointer;
  transition: transform 0.2s;
  overflow: hidden; // 이미지가 테두리를 벗어나지 않도록

  width: 300px;
  height: 378px;

  @media screen and (max-width: 1280px) {
    width: 211px;
    height: 266px;
  }

  &:hover {
    transform: scale(1.02);
  }
`

const MenuImage = styled.img`
  width: 300px;
  height: 300px;
  object-fit: cover;
  margin-bottom: 0; // 마진 제거
  @media screen and (max-width: 1280px) {
    width: 211px;
    height: 211px;
  }
`
const MenuName = styled.span`
  font-size: 18px;
  font-weight: 400;
  margin-top: 11px;
  text-align: left;
  width: 100%;
  color: #333;

  @media screen and (max-width: 1280px) {
    font-size: 13px; // 18 * 0.705
    margin-top: 8px; // 11 * 0.705
  }
`

const MenuBottom = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-top: 11px;
  p {
    font-size: 14px;
    font-weight: 700;
  }

  @media screen and (max-width: 1280px) {
    margin-top: 8px; // 11 * 0.705
    p {
      font-size: 10px; // 14 * 0.705
    }
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

  @media screen and (max-width: 1280px) {
    gap: 8px; // 12 * 0.705
    padding: 4px 7px; // 5/10 * 0.705
    border-radius: 6px; // 8 * 0.705
    font-size: 11px; // 16 * 0.705
  }

  &:hover {
    background-color: #ff3333;
    transform: scale(1.05);
  }
`

const LikeCount = styled.span`
  color: white;
  font-weight: 600;

  @media screen and (max-width: 1280px) {
    font-size: 11px; // 기본 폰트 사이즈 조정
  }
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

  span {
    font-size: 12px;
  }
`
