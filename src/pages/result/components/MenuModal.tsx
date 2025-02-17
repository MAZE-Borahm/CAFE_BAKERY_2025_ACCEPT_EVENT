import styled from 'styled-components'

interface Menu {
  name: string
  image: string
}

interface MenuModalProps {
  menu: Menu
  onClose: () => void
  onLike: () => void
  likeCount: number
}

const MenuModal = ({ menu, onClose, onLike, likeCount }: MenuModalProps) => {
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>X</CloseButton>
        <ModalImage src={menu.image} alt={menu.name} />
        <ModalInfo>
          <ModalTitle>{menu.name}</ModalTitle>
          <LikeButton onClick={onLike}>
            하트
            <LikeCount>{likeCount}</LikeCount>
          </LikeButton>
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
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`

const ModalContent = styled.div`
  position: relative;
  background-color: white;
  padding: 20px;
  border-radius: 12px;
  max-width: 90%;
  width: 500px;
  max-height: 90vh;
  overflow-y: auto;
`

const ModalImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 16px;
`

const ModalInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const ModalTitle = styled.h3`
  font-size: 24px;
  margin: 0;
`

const LikeButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  color: #ff4b4b;
  padding: 8px 12px;
  border-radius: 6px;
  transition: all 0.2s;

  &:hover {
    background-color: rgba(255, 75, 75, 0.1);
  }

  &:active {
    transform: scale(0.95);
  }
`

const LikeCount = styled.span`
  font-size: 16px;
  font-weight: 500;
  min-width: 24px;
  color: #666;
`

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
  padding: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`
