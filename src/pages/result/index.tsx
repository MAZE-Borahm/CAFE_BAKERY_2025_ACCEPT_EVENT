import React, { useState, useMemo, useCallback } from 'react'
import styled from 'styled-components'
import { ACCEPT_MENU_LIST, BELLE_MENU_LIST } from '@/constants/menu'
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
    gender: 'male' | 'female' | 'unknown'
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
  const { toggleLike, getLikeCount, isLiked } = useLikes()
  const location = useLocation()
  const navigation = useNavigate()
  const result = (location.state as LocationState)?.result

  // 메모이제이션된 필터링된 메뉴
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

  // useCallback으로 메모이제이션된 핸들러
  const handleMenuClick = useCallback((menu: Menu) => {
    setSelectedMenu(menu)
  }, [])

  const handleGoHomeButton = useCallback(() => {
    navigation(ROUTER.MAIN)
  }, [navigation])

  // 좋아요 버튼 클릭 핸들러
  const handleLikeClick = useCallback(
    (e: React.MouseEvent, menuId: number) => {
      e.stopPropagation() // 메뉴 클릭 이벤트가 발생하지 않도록 함
      toggleLike(menuId)
    },
    [toggleLike]
  )

  // 메뉴 렌더링 함수
  const renderMenuItem = useCallback(
    (menu: Menu) => (
      <MenuItem key={menu.id} onClick={() => handleMenuClick(menu)}>
        <LazyImage src={menu.image} alt={menu.name} width={250} height={250} loading='lazy' />
        <MenuName>{menu.name}</MenuName>
        <MenuBottom>
          <p>{menu.brand}</p>
          <LikeButton onClick={(e) => handleLikeClick(e, menu.id)} active={isLiked(menu.id)}>
            <SvgIcon name={isLiked(menu.id) ? 'fillHeart' : 'heart'} size={12} style={{ transform: 'translateY(1px)' }} />
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
        <span>{result?.gender === 'male' ? '남성' : '여성'}</span>이시군요! 아래 메뉴를 추천해드립니다~!
      </Title>
      <Subtitle>메뉴를 터치하시면 상세 정보를 보실 수 있습니다.</Subtitle>
      <FourColumnLayout>
        <MenuColumn>
          <ColumnTitle>Accept Coffee</ColumnTitle>
          {firstHalfDrinks.map(renderMenuItem)}
        </MenuColumn>

        <MenuColumn>
          <ColumnTitle>&nbsp;</ColumnTitle>
          {secondHalfDrinks.map(renderMenuItem)}
        </MenuColumn>

        <MenuColumn>
          <ColumnTitle>Belleboulangerie</ColumnTitle>
          {firstHalfBakery.map(renderMenuItem)}
        </MenuColumn>

        <MenuColumn>
          <ColumnTitle>&nbsp;</ColumnTitle>
          {secondHalfBakery.map(renderMenuItem)}
        </MenuColumn>
      </FourColumnLayout>

      <GoHomeButton onClick={handleGoHomeButton}>
        <SvgIcon name='home' size={20} />
        <span>홈으로</span>
      </GoHomeButton>
      {selectedMenu && (
        <MenuModal menu={selectedMenu} onClose={() => setSelectedMenu(null)} onLike={() => toggleLike(selectedMenu.id)} likeCount={getLikeCount(selectedMenu.id)} isLiked={isLiked(selectedMenu.id)} />
      )}
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
  span {
    font-weight: 600;
  }
`

const Subtitle = styled.p`
  margin-bottom: 24px;
  font-weight: 300;
  font-size: 23px;
  color: black;
`

// 4열 레이아웃 - 여기서 변경
const FourColumnLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  width: 100%;
  grid-auto-flow: column; /* 중요: 항목이 열 방향으로 채워지도록 설정 */
  align-items: start; /* 아이템이 위로 정렬되도록 설정 */
`

const MenuColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-width: 0; /* 자식 요소가 부모 영역을 넘어가지 않도록 설정 */
`

const ColumnTitle = styled.h3`
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 8px;
  color: #333;
  min-height: 30px; // 빈 공간에 대한 공백 유지
`

const MenuItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: transform 0.2s;
  overflow: hidden;
  width: 100%;

  &:hover {
    transform: scale(1.02);
  }

  img {
    width: 100%;
    height: auto;
    aspect-ratio: 1;
    object-fit: cover;
    border-radius: 8px;
  }
`

const MenuName = styled.span`
  font-size: 16px;
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
  transition: all 0.2s ease;

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
