import { useCallback } from 'react'
import { Logo } from '@/assets/img'
import { ROUTER } from '@/constants/router'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const Main = () => {
  const navigate = useNavigate()

  const handleFullScreen = useCallback(async () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
    }
  }, [])

  const handleClick = () => {
    navigate(ROUTER.CAMERA)
  }

  return (
    <Container>
      <StartButton onClick={handleClick}>시작하기</StartButton>
      <LogoStyle src={Logo} onClick={handleFullScreen} />
    </Container>
  )
}

export default Main

const Container = styled.div`
  width: 100%;
  height: 100dvh;
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const StartButton = styled.button`
  font-size: 96px;
  font-weight: 300;
  background-color: #f3f3ea;
  color: black;
  border: none;
  @media screen and (max-width: 1280px) {
    font-size: 68px;
  }
`

const LogoStyle = styled.img`
  width: 200px;
  position: fixed;
  bottom: 0px;
  cursor: pointer; // 커서를 포인터로 변경하여 클릭 가능함을 표시

  @media screen and (max-width: 1280px) {
    width: 141px;
  }
`
