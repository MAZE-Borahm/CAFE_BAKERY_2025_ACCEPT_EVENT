import React, { useCallback, useEffect, useRef, useState } from 'react'
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

// 최적화된 모달 이미지 로더
const OptimizedModalImage = React.memo(({ src, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    // 이미지가 이미 캐시되어 있는지 확인
    if (imgRef.current && imgRef.current.complete) {
      setIsLoaded(true)
    }
  }, [])

  return (
    <ImageWrapper>
      {!isLoaded && <ImageLoading />}
      <ModalImageStyled
        ref={imgRef}
        src={src}
        alt={alt}
        {...props}
        style={{
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.3s ease-in-out',
        }}
        onLoad={() => setIsLoaded(true)}
      />
    </ImageWrapper>
  )
})

const MenuModal = React.memo(({ menu, onClose, onLike, likeCount, isLiked }: MenuModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null)
  const [isRendered, setIsRendered] = useState(false)

  // 렌더링 최적화를 위한 애니메이션 상태
  useEffect(() => {
    // 첫 렌더링 후 애니메이션 적용
    requestAnimationFrame(() => {
      setIsRendered(true)
    })

    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  const handleLike = useCallback(() => {
    onLike()
  }, [onLike])

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      // 모달 외부 클릭 시에만 닫기
      if (e.target === e.currentTarget) {
        onClose()
      }
    },
    [onClose]
  )

  // 키보드 이벤트 처리
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  return (
    <ModalOverlay onClick={handleOverlayClick} style={{ opacity: isRendered ? 1 : 0 }}>
      <ModalContent
        ref={modalRef}
        style={{
          transform: isRendered ? 'translateY(0)' : 'translateY(20px)',
          opacity: isRendered ? 1 : 0,
        }}
      >
        <ContentHeader>{menu.name}</ContentHeader>
        <div style={{ width: '100%', padding: '0 30px' }}>
          <ContentSubHeader>{menu.description}</ContentSubHeader>
        </div>
        <ModalInfo>
          <ModalScrollWrapper>
            <OptimizedModalImage src={menu.image} alt={menu.name} />
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
          </ModalScrollWrapper>

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
  transition: opacity 0.2s ease-out;
  backdrop-filter: blur(2px);
  will-change: opacity;
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
  padding: 5%;
  overflow: hidden;
  transition: transform 0.25s ease-out, opacity 0.25s ease-out;
  will-change: transform, opacity;
  transform: translateZ(0);

  @media screen and (max-width: 1280px) {
    width: 90%;
    padding: 40px;
  }
`

const ImageWrapper = styled.div`
  position: relative;
  display: inline-block;
  width: auto;
  max-width: 55%;
  height: auto;
  max-height: 45%;
  margin-bottom: 40px;

  @media screen and (max-width: 1280px) {
    max-width: 75%;
    margin-bottom: 30px;
  }
`

const ImageLoading = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, rgba(240, 240, 240, 0.6) 0%, rgba(245, 245, 245, 0.8) 50%, rgba(240, 240, 240, 0.6) 100%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 12px;

  @keyframes shimmer {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }
`

const ModalImageStyled = styled.img`
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 12px;
  transform: translateZ(0);
`

const ContentHeader = styled.h2`
  font-size: 42px;
  font-weight: 700;
  margin: 0;
  text-align: center;
  width: 100%;
  margin-bottom: 20px;
  word-break: keep-all;
  overflow-wrap: break-word;
  color: #333;

  @media screen and (max-width: 1280px) {
    font-size: 28px;
    margin-bottom: 15px;
  }
`

const ContentSubHeader = styled.h3`
  font-size: 28px;
  font-weight: 400;
  color: #666;
  margin: 0 0 30px 0;
  width: 100%;
  word-break: keep-all;
  overflow-wrap: break-word;
  line-height: 1.4;
  padding: 0 15%;

  @media screen and (max-width: 1280px) {
    font-size: 22px;
    margin-bottom: 25px;
    padding: 0 10%;
  }
`

const ModalInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;

  @media screen and (max-width: 1280px) {
    gap: 20px;
  }
`

const ModalScrollWrapper = styled.div`
  width: 100%;
  max-height: 30vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;
  padding-right: 10px;
  margin-bottom: 20px;
  will-change: scroll-position;
  -webkit-overflow-scrolling: touch; /* iOS 부드러운 스크롤 */

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

  @media screen and (max-width: 1280px) {
    max-height: 40vh;
    gap: 20px;
  }
`

const AdditionalInfoSection = styled.div`
  width: 100%;
  max-width: 75%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: #f9f9f9;
  padding: 25px;
  border-radius: 16px;

  @media screen and (max-width: 1280px) {
    padding: 15px;
    gap: 15px;
  }
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
  word-break: keep-all;

  @media screen and (max-width: 1280px) {
    font-size: 18px;
  }
`

const InfoText = styled.p`
  font-size: 20px;
  color: #333;
  margin: 0;
  line-height: 1.5;
  white-space: pre-line;
  word-break: keep-all;
  overflow-wrap: break-word;

  @media screen and (max-width: 1280px) {
    font-size: 16px;
  }
`

const ExperienceText = styled.p`
  font-size: 20px;
  color: #666;
  text-align: center;
  margin: 0;
  font-style: italic;
  width: 100%;
  max-width: 75%;
  white-space: pre-line;
  word-break: keep-all;
  overflow-wrap: break-word;
  line-height: 1.5;

  @media screen and (max-width: 1280px) {
    font-size: 16px;
  }
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  width: 100%;
  margin-top: 8px;

  @media screen and (max-width: 1280px) {
    gap: 14px;
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
  padding: 12px 25px;
  border-radius: 12px;
  font-size: 20px;
  font-weight: 600;
  min-width: 130px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  transition: all 0.15s ease;
  transform: translateZ(0); /* 하드웨어 가속 */
  will-change: transform, background-color;

  @media screen and (max-width: 1280px) {
    padding: 10px 18px;
    font-size: 16px;
    min-width: 100px;
    gap: 10px;
  }

  &:hover {
    background-color: #ff3333;
    transform: scale(1.02);
  }

  &:active {
    transform: scale(0.98);
  }
`

const CloseModalButton = styled.button`
  background: #333;
  color: white;
  border: none;
  cursor: pointer;
  padding: 12px 25px;
  border-radius: 12px;
  font-size: 20px;
  font-weight: 600;
  min-width: 130px;
  transition: background-color 0.15s ease, transform 0.15s ease;
  transform: translateZ(0); /* 하드웨어 가속 */
  will-change: transform, background-color;

  @media screen and (max-width: 1280px) {
    padding: 10px 18px;
    font-size: 16px;
    min-width: 100px;
  }

  &:hover {
    background-color: #444;
    transform: scale(1.02);
  }

  &:active {
    transform: scale(0.98);
  }
`
