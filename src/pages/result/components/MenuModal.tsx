import React, { useCallback, useEffect } from 'react'
import SvgIcon from '@/components/SvgIcon'
import styled from 'styled-components'

// 상수 정의
const ICON_SIZE = window.innerWidth <= 1280 ? 16 : 22

interface Menu {
  id: number
  name: string
  image: string
  description: string
  flavorProfile?: string
  brewingRecommendation?: string
  brand: string
}

interface MenuModalProps {
  menu: Menu
  onClose: () => void
  onLike: () => void
  likeCount: number
  isLiked: boolean
  isLowPerformanceMode?: boolean
}

const MenuModal: React.FC<MenuModalProps> = ({ menu, onClose, onLike, likeCount, isLiked, isLowPerformanceMode = false }) => {
  // 오버레이 클릭 핸들러
  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        onClose()
      }
    },
    [onClose]
  )

  // Esc 키 리스너
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  // 바디 스크롤 방지
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  // 저사양 모드일 경우 간소화된 모달 표시
  if (isLowPerformanceMode) {
    return (
      <LightModalOverlay onClick={handleOverlayClick}>
        <LightModalContent>
          <LightHeader>{menu.name}</LightHeader>
          <LightDescription>{menu.description}</LightDescription>

          <LightImage src={menu.image} alt={menu.name} />

          {/* 추가 정보 표시 */}
          {(menu.flavorProfile || menu.brewingRecommendation) && (
            <LightInfoBox>
              {menu.flavorProfile && (
                <LightInfoItem>
                  <LightInfoTitle>맛 프로파일</LightInfoTitle>
                  <LightInfoText>{menu.flavorProfile}</LightInfoText>
                </LightInfoItem>
              )}
              {menu.brewingRecommendation && (
                <LightInfoItem>
                  <LightInfoTitle>특징</LightInfoTitle>
                  <LightInfoText>{menu.brewingRecommendation}</LightInfoText>
                </LightInfoItem>
              )}
            </LightInfoBox>
          )}

          {/* 브랜드별 안내 문구 */}
          {menu.brand === '억셉트커피' && <LightNoteText>해당 메뉴는 현재 부스에서 실물을 경험하실 수 있습니다.</LightNoteText>}

          {/* 버튼 그룹 */}
          <LightButtonGroup>
            <LightButton onClick={onLike} $active={isLiked}>
              {isLiked ? '♥' : '♡'} {likeCount}
            </LightButton>
            <LightButton onClick={onClose}>닫기</LightButton>
          </LightButtonGroup>
        </LightModalContent>
      </LightModalOverlay>
    )
  }

  // 일반 모드 모달
  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContent>
        <Header>{menu.name}</Header>
        <Description>{menu.description}</Description>

        <ScrollArea>
          <MenuImage src={menu.image} alt={menu.name} loading='lazy' />

          {/* 추가 정보 표시 */}
          {(menu.flavorProfile || menu.brewingRecommendation) && (
            <InfoSection>
              {menu.flavorProfile && (
                <InfoItem>
                  <InfoTitle>맛 프로파일</InfoTitle>
                  <InfoText>{menu.flavorProfile}</InfoText>
                </InfoItem>
              )}
              {menu.brewingRecommendation && (
                <InfoItem>
                  <InfoTitle>특징</InfoTitle>
                  <InfoText>{menu.brewingRecommendation}</InfoText>
                </InfoItem>
              )}
            </InfoSection>
          )}

          {/* 브랜드별 안내 문구 */}
          {menu.brand === '억셉트커피' && <NoteText>해당 메뉴는 현재 부스에서 실물을 경험하실 수 있습니다.</NoteText>}
        </ScrollArea>

        {/* 버튼 그룹 */}
        <ButtonGroup>
          <LikeButton onClick={onLike} $active={isLiked}>
            <SvgIcon name={isLiked ? 'fillHeart' : 'heart'} size={ICON_SIZE} style={{ transform: 'translateY(1px)' }} />
            <span>{likeCount}</span>
          </LikeButton>
          <CloseButton onClick={onClose}>닫기</CloseButton>
        </ButtonGroup>
      </ModalContent>
    </ModalOverlay>
  )
}

export default MenuModal

// ----- 일반 모드 스타일 컴포넌트 ----- //
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 2%;
`

const ModalContent = styled.div`
  position: relative;
  background-color: white;
  border-radius: 24px;
  width: 80%;
  max-width: 1200px;
  max-height: 85vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  padding: 40px;
  overflow: hidden;

  @media screen and (max-width: 768px) {
    width: 90%;
    padding: 30px 20px;
  }
`

const Header = styled.h2`
  font-size: 42px;
  font-weight: 700;
  margin: 0 0 20px;
  text-align: center;
  width: 100%;
  word-break: keep-all;
  color: #333;

  @media screen and (max-width: 768px) {
    font-size: 28px;
    margin-bottom: 15px;
  }
`

const Description = styled.h3`
  font-size: 28px;
  font-weight: 400;
  color: #666;
  margin: 0 0 30px;
  text-align: center;
  width: 100%;
  max-width: 80%;
  line-height: 1.4;

  @media screen and (max-width: 768px) {
    font-size: 18px;
    margin-bottom: 20px;
  }
`

const ScrollArea = styled.div`
  width: 100%;
  max-height: 50vh;
  overflow-y: auto;
  padding: 0 20px 20px;
  margin-bottom: 20px;
  -webkit-overflow-scrolling: touch;
  display: flex;
  flex-direction: column;
  align-items: center;

  /* 스크롤바 스타일 */
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`

const MenuImage = styled.img`
  max-width: 50%;
  max-height: 300px;
  object-fit: contain;
  border-radius: 12px;
  margin: 0 0 30px;

  @media screen and (max-width: 768px) {
    max-width: 90%;
    max-height: 250px;
  }
`

const InfoSection = styled.div`
  width: 100%;
  max-width: 700px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: #f9f9f9;
  padding: 25px;
  border-radius: 16px;
  margin-bottom: 20px;
`

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const InfoTitle = styled.h4`
  font-size: 22px;
  font-weight: 600;
  color: #333;
  margin: 0;

  @media screen and (max-width: 768px) {
    font-size: 18px;
  }
`

const InfoText = styled.p`
  font-size: 18px;
  color: #333;
  margin: 0;
  line-height: 1.5;
  white-space: pre-line;
  word-break: keep-all;

  @media screen and (max-width: 768px) {
    font-size: 16px;
  }
`

const NoteText = styled.p`
  font-size: 18px;
  color: #666;
  text-align: center;
  margin: 0;
  font-style: italic;
  width: 100%;
  max-width: 700px;
  line-height: 1.5;

  @media screen and (max-width: 768px) {
    font-size: 14px;
  }
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  width: 100%;

  @media screen and (max-width: 768px) {
    gap: 10px;
  }
`

interface ButtonProps {
  $active?: boolean
}

const LikeButton = styled.button<ButtonProps>`
  background: ${(props) => (props.$active ? '#ff3333' : '#ff0000cc')};
  color: white;
  border: none;
  cursor: pointer;
  padding: 12px 25px;
  border-radius: 12px;
  font-size: 20px;
  font-weight: 600;
  min-width: 130px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  transition: all 0.2s ease;

  @media screen and (max-width: 768px) {
    padding: 10px 18px;
    font-size: 16px;
    min-width: 100px;
    gap: 10px;
  }

  &:hover {
    background-color: #ff3333;
    transform: scale(1.02);
  }
`

const CloseButton = styled.button`
  background: #333;
  color: white;
  border: none;
  cursor: pointer;
  padding: 12px 25px;
  border-radius: 12px;
  font-size: 20px;
  font-weight: 600;
  min-width: 130px;
  transition: all 0.2s ease;

  @media screen and (max-width: 768px) {
    padding: 10px 18px;
    font-size: 16px;
    min-width: 100px;
  }

  &:hover {
    background-color: #444;
    transform: scale(1.02);
  }
`

// ----- 저사양 모드 스타일 컴포넌트 ----- //
const LightModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 16px;
`

const LightModalContent = styled.div`
  position: relative;
  background-color: white;
  border-radius: 16px;
  width: 90%;
  max-width: 480px;
  max-height: 90vh;
  overflow-y: auto;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`

const LightHeader = styled.h2`
  font-size: 24px;
  font-weight: 600;
  margin: 0 0 12px;
  text-align: center;
  color: #333;
`

const LightDescription = styled.p`
  font-size: 16px;
  margin: 0 0 20px;
  text-align: center;
  color: #666;
`

const LightImage = styled.img`
  display: block;
  width: 100%;
  max-height: 200px;
  object-fit: contain;
  margin: 0 auto 20px;
  border-radius: 8px;
`

const LightInfoBox = styled.div`
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
`

const LightInfoItem = styled.div`
  margin-bottom: 15px;

  &:last-child {
    margin-bottom: 0;
  }
`

const LightInfoTitle = styled.h4`
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 5px;
  color: #333;
`

const LightInfoText = styled.p`
  font-size: 14px;
  margin: 0;
  line-height: 1.4;
  color: #333;
`

const LightNoteText = styled.p`
  font-size: 14px;
  color: #666;
  text-align: center;
  margin: 0 0 20px;
  font-style: italic;
`

const LightButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
`

const LightButton = styled.button<ButtonProps>`
  background-color: ${(props) => (props.$active ? '#ff3333' : '#666')};
  color: white;
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 16px;
  font-weight: 500;
  min-width: 80px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    opacity: 0.9;
  }
`
