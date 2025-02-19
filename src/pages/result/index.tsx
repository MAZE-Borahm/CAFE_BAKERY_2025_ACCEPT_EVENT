import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { ACCEPT_MENU_LIST, BELLE_MENU_LIST } from '@/constants/menu'
import { useLikes } from './useLikes'
import MenuModal from './components/MenuModal'
import { useLocation, useNavigate } from 'react-router-dom'
import SvgIcon from '@/components/SvgIcon'
import { ROUTER } from '@/constants/router'
import { acceptTextLogo, belleLogo } from '@/assets/img'

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

// 최적화된 LazyImage 컴포넌트
const LazyImage = React.memo(({ src, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const imgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px' } // 뷰포트 200px 전에 로드 시작
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleImageLoad = useCallback(() => {
    setIsLoaded(true)
  }, [])

  return (
    <ImageContainer ref={imgRef}>
      {!isLoaded && <ImagePlaceholder />}
      {isVisible && (
        <StyledImage
          src={src}
          alt={alt}
          {...props}
          style={{
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.3s ease-in-out',
          }}
          onLoad={handleImageLoad}
        />
      )}
    </ImageContainer>
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

  // 이미지 사전 로딩
  useEffect(() => {
    // 메뉴 이미지 사전 로딩
    const preloadImages = () => {
      const allMenus = [...drinkMenus, ...bakeryMenus]
      allMenus.forEach((menu) => {
        if (menu.image) {
          const img = new Image()
          img.src = menu.image
        }
      })
    }

    preloadImages()
  }, [drinkMenus, bakeryMenus])

  // 모달 사전 준비
  const [isModalPreloaded, setIsModalPreloaded] = useState(false)
  useEffect(() => {
    // 컴포넌트 마운트 후 모달 준비
    setIsModalPreloaded(true)
  }, [])

  // useCallback으로 메모이제이션된 핸들러
  const handleMenuClick = useCallback((menu: Menu) => {
    setSelectedMenu(menu)
  }, [])

  const handleGoHomeButton = useCallback(() => {
    navigation(ROUTER.MAIN)
  }, [navigation])

  // 메뉴 렌더링 함수
  const renderMenuItem = useCallback(
    (menu: Menu) => (
      <MenuItem key={menu.id} onClick={() => handleMenuClick(menu)}>
        <LazyImage src={menu.image} alt={menu.name} width={250} height={250} />
        <MenuName>{menu.name}</MenuName>
        <MenuBottom>
          <p>{menu.brand}</p>
          <LikeButton active={isLiked(menu.id)}>
            <SvgIcon name={isLiked(menu.id) ? 'fillHeart' : 'heart'} size={12} style={{ transform: 'translateY(1px)' }} />
            <LikeCount>{getLikeCount(menu.id)}</LikeCount>
          </LikeButton>
        </MenuBottom>
      </MenuItem>
    ),
    [handleMenuClick, getLikeCount, isLiked]
  )

  return (
    <Container>
      <Title>
        <span>{result?.gender === 'male' ? '남성' : '여성'}</span>이시군요! 아래 메뉴를 추천해드립니다~!
      </Title>
      <Subtitle>메뉴를 터치하시면 상세 정보를 보실 수 있습니다.</Subtitle>
      <FourColumnLayout>
        <MenuColumn>
          <ColumnTitle>
            <img src={acceptTextLogo} style={{ width: 200, height: 47 }} />
          </ColumnTitle>
          {firstHalfDrinks.map(renderMenuItem)}
        </MenuColumn>

        <MenuColumn>
          <ColumnTitle style={{ height: 47 }}>&nbsp;</ColumnTitle>
          {secondHalfDrinks.map(renderMenuItem)}
        </MenuColumn>

        <MenuColumn>
          <ColumnTitle style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
            <img src={belleLogo} style={{ height: 47 }} />
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
        <SvgIcon name='home' size={20} />
        <span>홈으로</span>
      </GoHomeButton>

      {isModalPreloaded && selectedMenu && (
        <MenuModal menu={selectedMenu} onClose={() => setSelectedMenu(null)} onLike={() => toggleLike(selectedMenu.id)} likeCount={getLikeCount(selectedMenu.id)} isLiked={isLiked(selectedMenu.id)} />
      )}
    </Container>
  )
})

export default Result

// Styled Components
const Container = styled.div`
  position: relative;
  padding: 40px 5%;
  max-width: 1200px;
  margin: 0 auto;
  will-change: contents;
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

const FourColumnLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  width: 100%;
  grid-auto-flow: column;
  align-items: start;
  will-change: transform;
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
  transition: transform 0.2s;
  overflow: hidden;
  width: 100%;
  transform: translateZ(0);
  will-change: transform;

  &:hover {
    transform: scale(1.02);
  }
`

// 이미지 컨테이너 - 비율 유지하고 중앙 정렬
const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 8px;
  background-color: #f5f5f5;
`

// 이미지 내부 스타일 - contain으로 변경하여 비율 유지
const StyledImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
  transform: translateZ(0);
`

const ImagePlaceholder = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, rgba(240, 240, 240, 0.6) 0%, rgba(245, 245, 245, 0.8) 50%, rgba(240, 240, 240, 0.6) 100%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;

  @keyframes shimmer {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }
`

const MenuName = styled.span`
  font-size: 14px;
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
  transform: translateZ(0);

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
  transform: translateZ(0);

  span {
    font-size: 12px;
  }
`
