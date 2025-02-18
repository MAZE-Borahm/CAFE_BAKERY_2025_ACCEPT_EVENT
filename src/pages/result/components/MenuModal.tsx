import React, { useCallback, useEffect } from 'react'
import SvgIcon from '@/components/SvgIcon'
import styled from 'styled-components'

// 상수 정의
const ICON_SIZE = window.innerWidth <= 1920 ? 16 : 22

interface Menu {
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
}

const MenuModal = React.memo(({ menu, onClose, onLike, likeCount, isLiked }: MenuModalProps) => {
  const handleLike = useCallback(() => {
    onLike()
  }, [onLike])

  const handleOverlayClick = useCallback(() => {
    onClose()
  }, [onClose])

  const handleContentClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
  }, [])

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContent onClick={handleContentClick}>
        <ContentHeader>{menu.name}</ContentHeader>
        <ContentSubHeader>{menu.description}</ContentSubHeader>
        <ModalImage src={menu.image} alt={menu.name} loading='lazy' />
        <ModalInfo>
          {(menu.flavorProfile || menu.brewingRecommendation) && (
            <AdditionalInfoSection>
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
            </AdditionalInfoSection>
          )}

          {/* 실물 경험 텍스트 - 별도로 배치 */}
          {menu.brand === '억셉트커피' && <ExperienceText>해당 메뉴는 현재 부스에서 실물을 경험하실 수 있습니다.</ExperienceText>}
          {menu.brand === '벨르블랑제리' && <ExperienceText></ExperienceText>}

          <ButtonGroup>
            <LikeButton onClick={handleLike} active={isLiked}>
              <SvgIcon name={isLiked ? 'fillHeart' : 'heart'} size={ICON_SIZE} style={{ transform: 'translateY(1px)' }} />
              <span>{likeCount}</span>
            </LikeButton>
            <CloseModalButton onClick={onClose}>닫기</CloseModalButton>
          </ButtonGroup>
        </ModalInfo>
      </ModalContent>
    </ModalOverlay>
  )
})

export default MenuModal

// 스타일드 컴포넌트
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
  height: 80%;
  max-width: 1200px;
  max-height: 900px;
  overflow-y: auto;
  padding: 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);

  @media screen and (max-width: 1280px) {
    width: 90%;
    height: auto;
    max-height: 90vh;
    padding: 40px;
  }
`

const ContentHeader = styled.h2`
  font-size: 48px;
  font-weight: 700;
  margin: 0;
  text-align: center;
  width: 100%;
  margin-bottom: 20px;
  word-break: keep-all;
  overflow-wrap: break-word;

  @media screen and (max-width: 1280px) {
    font-size: 32px;
    margin-bottom: 15px;
  }
`

const ContentSubHeader = styled.h3`
  font-size: 32px;
  font-weight: 400;
  color: #666;
  margin: 0 0 40px 0;
  text-align: center;
  width: 100%;
  word-break: keep-all;
  overflow-wrap: break-word;
  line-height: 1.4;

  @media screen and (max-width: 1280px) {
    font-size: 24px;
    margin-bottom: 30px;
  }
`

const ModalImage = styled.img`
  width: auto;
  height: auto;
  max-width: 60%;
  max-height: 50%;
  object-fit: contain;
  border-radius: 12px;
  margin-bottom: 50px;

  @media screen and (max-width: 1280px) {
    max-width: 80%;
    margin-bottom: 35px;
  }
`

const ModalInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  width: 100%;

  @media screen and (max-width: 1280px) {
    gap: 25px;
  }
`

const AdditionalInfoSection = styled.div`
  width: 100%;
  max-width: 80%;
  display: flex;
  flex-direction: column;
  gap: 25px;
  background-color: #f9f9f9;
  padding: 30px;
  border-radius: 16px;

  @media screen and (max-width: 1280px) {
    padding: 20px;
    gap: 20px;
  }
`

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const InfoTitle = styled.h4`
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin: 0;
  word-break: keep-all;

  @media screen and (max-width: 1280px) {
    font-size: 20px;
  }
`

const InfoText = styled.p`
  font-size: 22px;
  color: #333;
  margin: 0;
  line-height: 1.6;
  white-space: pre-line;
  word-break: keep-all;
  overflow-wrap: break-word;

  @media screen and (max-width: 1280px) {
    font-size: 18px;
  }
`

const ExperienceText = styled.p`
  font-size: 22px;
  color: #666;
  text-align: center;
  margin: 0;
  font-style: italic;
  width: 100%;
  max-width: 80%;
  white-space: pre-line;
  word-break: keep-all;
  overflow-wrap: break-word;
  line-height: 1.6;

  @media screen and (max-width: 1280px) {
    font-size: 18px;
  }
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 24px;
  justify-content: center;
  width: 100%;
  margin-top: 10px;

  @media screen and (max-width: 1280px) {
    gap: 16px;
  }
`

interface LikeButtonProps {
  active: boolean
}

const LikeButton = styled.div<LikeButtonProps>`
  background: ${(props) => (props.active ? '#ff3333' : '#ff0000cc')};
  color: white;
  border: none;
  cursor: pointer;
  padding: 15px 30px;
  border-radius: 12px;
  font-size: 22px;
  font-weight: 600;
  min-width: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  transition: all 0.2s ease;

  @media screen and (max-width: 1280px) {
    padding: 12px 20px;
    font-size: 18px;
    min-width: 110px;
    gap: 12px;
  }

  &:hover {
    background-color: #ff3333;
    transform: scale(1.02);
  }
`

const CloseModalButton = styled.button`
  background: #333;
  color: white;
  border: none;
  cursor: pointer;
  padding: 15px 30px;
  border-radius: 12px;
  font-size: 22px;
  font-weight: 600;
  min-width: 140px;
  transition: background-color 0.2s ease, transform 0.2s ease;

  @media screen and (max-width: 1280px) {
    padding: 12px 20px;
    font-size: 18px;
    min-width: 110px;
  }

  &:hover {
    background-color: #444;
    transform: scale(1.02);
  }
`
