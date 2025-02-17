import { MENU_LIST } from '@/constants/menu'
import styled from 'styled-components'
import { useEffect, useState } from 'react'
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

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  useEffect(() => {
    // 화면 크기 변경 감지 함수
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    // 이벤트 리스너 등록
    window.addEventListener('resize', handleResize)

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // 콘솔에 현재 크기 출력 (필요한 경우)
  console.log('Current window size:', windowSize)

  // ... 기존 코드 ...

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
      <div>
        Width: {windowSize.width}px, Height: {windowSize.height}px
      </div>
      <Subtitle>메뉴를 터치하시면 상세 정보를 보실 수 있습니다.</Subtitle>
      <MenuContainer>
        {filteredMenus.map((menu, index) => (
          <MenuItem key={index} onClick={() => handleMenuClick(menu)}>
            <MenuImage src={menu.image} alt={menu.name} />
            <MenuName>{menu.name}</MenuName>
            <MenuBottom>
              <p>억셉트커피</p>
              <LikeButton>
                <SvgIcon name='heart' size={window.innerWidth <= 1920 ? 8 : 12} style={{ transform: 'translateY(1px)' }} />
                <LikeCount>{getLikeCount(menu.name)}</LikeCount>
              </LikeButton>
            </MenuBottom>
          </MenuItem>
        ))}
      </MenuContainer>
      <GoHomeButton onClick={handleGoHomeButton}>
        <SvgIcon name='home' size={window.innerWidth <= 1920 ? 20 : 32} />
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

  @media screen and (max-width: 1920px) {
    padding: 40px 5% 35px 5%;
  }
`

const Title = styled.h2`
  margin-bottom: 24px;
  text-align: left;
  font-size: 64px;
  font-weight: 300;

  @media screen and (max-width: 1920px) {
    margin-bottom: 15px;
    font-size: 40px;
  }
`

const Subtitle = styled.p`
  margin-bottom: 38px;
  font-weight: 300;
  font-size: 36px;
  color: #666;

  @media screen and (max-width: 1920px) {
    margin-bottom: 24px;
    font-size: 23px;
  }
`

const MenuContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 32px;
  max-width: 1760px;
  margin: 0 auto;

  @media screen and (max-width: 1920px) {
    gap: 20px;
    width: 90%;
  }
`

const MenuItem = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0;
  cursor: pointer;
  transition: transform 0.2s;
  overflow: hidden;
  width: 300px;
  height: 378px;

  @media screen and (max-width: 1920px) {
    width: 100%;
    height: auto;
  }

  &:hover {
    transform: scale(1.02);
  }
`

const MenuImage = styled.img`
  width: 300px;
  height: 300px;
  object-fit: cover;
  margin-bottom: 0;

  @media screen and (max-width: 1920px) {
    width: 100%;
    aspect-ratio: 1;
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

  @media screen and (max-width: 1920px) {
    font-size: 11px;
    margin-top: 7px;
  }
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

  @media screen and (max-width: 1920px) {
    margin-top: 7px;
    p {
      font-size: 9px;
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

  @media screen and (max-width: 1920px) {
    gap: 8px;
    padding: 3px 6px;
    border-radius: 5px;
    font-size: 10px;
  }

  &:hover {
    background-color: #ff3333;
    transform: scale(1.05);
  }
`

const LikeCount = styled.span`
  color: white;
  font-weight: 600;

  @media screen and (max-width: 1920px) {
    font-size: 10px;
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
  cursor: pointer;

  @media screen and (max-width: 1920px) {
    width: 38px;
    height: 38px;
    bottom: 35px;
    right: 43px;
    border-radius: 15px;
  }

  span {
    font-size: 12px;
    @media screen and (max-width: 1920px) {
      font-size: 8px;
    }
  }
`
