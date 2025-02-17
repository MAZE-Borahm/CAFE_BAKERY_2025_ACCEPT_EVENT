import SvgIcon from '@/components/SvgIcon'
import styled from 'styled-components'

interface Menu {
  name: string
  image: string
  description: string
  flavorProfile?: string
}

interface MenuModalProps {
  menu: Menu
  onClose: () => void
  onLike: () => void
  likeCount: number
}

const MenuModal = ({ menu, onClose, onLike, likeCount }: MenuModalProps) => {
  const handleLike = () => {
    onLike()
    onClose()
  }

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ContentHeader>{menu.name}</ContentHeader>
        <ContentSubHeader>{menu.description}</ContentSubHeader>
        <ModalImage src={menu.image} alt={menu.name} />
        <ModalInfo>
          <InfoText>{menu.flavorProfile && '해당 메뉴는 현재 부스에서 실물을 경험하실 수 있습니다.'}</InfoText>
          <ButtonGroup>
            <LikeButton onClick={handleLike}>
              <SvgIcon name='heart' size={window.innerWidth <= 1920 ? 13 : 19} style={{ transform: 'translateY(1px)' }} />
              <span>{likeCount}</span>
            </LikeButton>
            <CloseModalButton onClick={onClose}>닫기</CloseModalButton>
          </ButtonGroup>
        </ModalInfo>
      </ModalContent>
    </ModalOverlay>
  )
}
export default MenuModal

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
`

const ModalContent = styled.div`
  position: relative;
  background-color: white;
  border-radius: 24px;
  width: 568px;
  max-height: 90vh;
  overflow-y: auto;
  padding: 56px 40px 49px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media screen and (max-width: 1280px) {
    width: 400px;
    padding: 39px 28px 35px 28px;
  }
`

const ContentHeader = styled.h2`
  font-size: 36px;
  font-weight: 700;
  margin: 0;
  text-align: center;

  @media screen and (max-width: 1280px) {
    font-size: 25px;
  }
`

const ContentSubHeader = styled.h3`
  font-size: 24px;
  font-weight: 400;
  color: #666;
  margin: 16px 0 22px;
  text-align: center;

  @media screen and (max-width: 1280px) {
    font-size: 17px;
    margin: 11px 0 15px;
  }
`

const ModalImage = styled.img`
  width: 296px;
  height: 296px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 42px;

  @media screen and (max-width: 1280px) {
    width: 209px;
    height: 209px;
    margin-bottom: 30px;
  }
`

const ModalInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;

  @media screen and (max-width: 1280px) {
    gap: 17px;
  }
`

const InfoText = styled.p`
  font-size: 18px;
  margin-bottom: 33px;
  color: #333;
  text-align: center;
  margin: 0;

  @media screen and (max-width: 1280px) {
    font-size: 13px;
    margin-bottom: 23px;
  }
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
  width: 100%;

  @media screen and (max-width: 1280px) {
    gap: 11px;
  }
`

const LikeButton = styled.div`
  background: #ff0000cc;
  color: white;
  border: none;
  cursor: pointer;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 600;
  min-width: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;

  @media screen and (max-width: 1280px) {
    padding: 8px 17px;
    font-size: 13px;
    min-width: 85px;
    gap: 8px;
  }

  &:hover {
    background-color: #ff3333;
  }
`

const CloseModalButton = styled.button`
  background: #333;
  color: white;
  border: none;
  cursor: pointer;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 600;
  min-width: 120px;

  @media screen and (max-width: 1280px) {
    padding: 8px 17px;
    font-size: 13px;
    min-width: 85px;
  }

  &:hover {
    background-color: #444;
  }
`
