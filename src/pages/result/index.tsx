import React, { useState, useMemo, useCallback } from 'react'
import styled from 'styled-components'
import { ACCEPT_MENU_LIST, BELLE_MENU_LIST } from '@/constants/menu'
import { useLikes } from './useLikes'
import MenuModal from './components/MenuModal'
import { useLocation, useNavigate } from 'react-router-dom'
import { ROUTER } from '@/constants/router'
import { acceptTextLogo, belleLogo } from '@/assets/img'

interface Menu {
  id: number
  brand: string
  name: string
  image: string
  description: string
  flavorProfile?: string
  brewingRecommendation?: string
  gender: string[]
}

interface LocationState {
  result: {
    gender: 'male' | 'female' | 'unknown'
  }
}

const Result = React.memo(() => {
  const [selectedMenu, setSelectedMenu] = useState<Menu | null>(null)
  const { toggleLike, getLikeCount, isLiked } = useLikes()
  const location = useLocation()
  const navigate = useNavigate()
  const result = (location.state as LocationState)?.result

  // 메뉴 필터링
  const drinkMenus = useMemo(() => {
    const defaultGender = 'female'
    const gender = result?.gender === 'male' ? 'male' : defaultGender
    return ACCEPT_MENU_LIST.filter((menu) => menu.gender.includes(gender))
  }, [result?.gender])

  const bakeryMenus = useMemo(() => {
    const defaultGender = 'female'
    const gender = result?.gender === 'male' ? 'male' : defaultGender
    return BELLE_MENU_LIST.filter((menu) => menu.gender.includes(gender))
  }, [result?.gender])

  // 드링크 메뉴 분할
  const firstHalfDrinks = useMemo(() => {
    return drinkMenus.slice(0, Math.ceil(drinkMenus.length / 2))
  }, [drinkMenus])

  const secondHalfDrinks = useMemo(() => {
    return drinkMenus.slice(Math.ceil(drinkMenus.length / 2))
  }, [drinkMenus])

  // 베이커리 메뉴 분할
  const firstHalfBakery = useMemo(() => {
    return bakeryMenus.slice(0, Math.ceil(bakeryMenus.length / 2))
  }, [bakeryMenus])

  const secondHalfBakery = useMemo(() => {
    return bakeryMenus.slice(Math.ceil(bakeryMenus.length / 2))
  }, [bakeryMenus])

  const handleMenuClick = useCallback((menu: Menu) => {
    setSelectedMenu(menu)
  }, [])

  const handleGoHomeButton = useCallback(() => {
    navigate(ROUTER.MAIN)
  }, [navigate])

  const handleLikeClick = useCallback(
    (e: React.MouseEvent, menuId: number) => {
      e.stopPropagation()
      toggleLike(menuId)
    },
    [toggleLike]
  )

  const renderMenuItem = useCallback(
    (menu: Menu) => (
      <MenuItem key={menu.id} onClick={() => handleMenuClick(menu)}>
        <ImageContainer>{/* <StyledImage src={menu.image} alt={menu.name} /> */}</ImageContainer>
        <MenuName>{menu.name}</MenuName>
        <MenuBottom>
          <BrandText>{menu.brand}</BrandText>
          <LikeButton onClick={(e) => handleLikeClick(e, menu.id)} active={isLiked(menu.id)}>
            {isLiked(menu.id) ? '♥' : '♡'}
            <LikeCount>{getLikeCount(menu.id)}</LikeCount>
          </LikeButton>
        </MenuBottom>
      </MenuItem>
    ),
    [handleLikeClick, handleMenuClick, getLikeCount, isLiked]
  )

  return (
    <Container>
      <Title>
        <TitleSpan>{result?.gender === 'male' ? '남성' : '여성'}</TitleSpan>이시군요! 아래 메뉴를 추천해드립니다~!
      </Title>
      <Subtitle>메뉴를 터치하시면 상세 정보를 보실 수 있습니다.</Subtitle>
      <FourColumnLayout>
        <MenuColumn>
          <ColumnTitle>
            <img src={acceptTextLogo} alt='억셉트커피' style={{ width: 200, height: 47 }} />
          </ColumnTitle>
          {firstHalfDrinks.map(renderMenuItem)}
        </MenuColumn>

        <MenuColumn>
          <ColumnTitle style={{ height: 47 }}>&nbsp;</ColumnTitle>
          {secondHalfDrinks.map(renderMenuItem)}
        </MenuColumn>

        <MenuColumn>
          <ColumnTitle style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
            <img src={belleLogo} alt='벨르블랑제리' style={{ height: 47 }} />
            <span style={{ color: '#377699' }}>Belleboulangerie</span>
          </ColumnTitle>
          {firstHalfBakery.map(renderMenuItem)}
        </MenuColumn>

        <MenuColumn>
          <ColumnTitle style={{ height: 47 }}>&nbsp;</ColumnTitle>
          {secondHalfBakery.map(renderMenuItem)}
        </MenuColumn>
      </FourColumnLayout>

      <GoHomeButton onClick={handleGoHomeButton}>
        <HomeIcon>⌂</HomeIcon>
        <HomeText>홈으로</HomeText>
      </GoHomeButton>

      {selectedMenu && (
        <MenuModal menu={selectedMenu} onClose={() => setSelectedMenu(null)} onLike={() => toggleLike(selectedMenu.id)} likeCount={getLikeCount(selectedMenu.id)} isLiked={isLiked(selectedMenu.id)} />
      )}
    </Container>
  )
})

export default Result

// 스타일 컴포넌트 - 애니메이션 제거 버전
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

const TitleSpan = styled.span`
  font-weight: 600;
`

const Subtitle = styled.p`
  margin-bottom: 24px;
  font-weight: 300;
  font-size: 23px;
  color: black;
`

const FourColumnLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  width: 100%;
  grid-auto-flow: column;
  align-items: start;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    grid-auto-flow: row;
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`

const MenuColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-width: 0;
`

const ColumnTitle = styled.h3`
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 8px;
  color: #333;
  min-height: 30px;
`

const MenuItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  width: 100%;
  padding: 8px;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`

// 고정 크기 이미지 컨테이너
const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 230px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 8px;
  background-color: #f5f5f5;
`

// 고정 크기 이미지
const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  border-radius: 8px;
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
`

const BrandText = styled.p`
  font-size: 14px;
  font-weight: 700;
  margin: 0;
`

interface LikeButtonProps {
  active: boolean
}

const LikeButton = styled.button<LikeButtonProps>`
  background: ${(props) => (props.active ? '#ff3333' : '#ff0000cc')};
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
  z-index: 100;
`

const HomeIcon = styled.span`
  font-size: 24px;
`

const HomeText = styled.span`
  font-size: 12px;
`
