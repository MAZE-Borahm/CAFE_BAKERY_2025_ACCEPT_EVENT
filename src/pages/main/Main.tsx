import { Logo } from '@/assets/img'
import { ROUTER } from '@/constants/router'

import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const Main = () => {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate(ROUTER.CAMERA)
  }
  return (
    <Container>
      <StartButton onClick={handleClick}>시작하기</StartButton>
      <LogoStyle src={Logo} />
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
  border: none;
  @media screen and (max-width: 1280px) {
    font-size: 68px;
  }
`

const LogoStyle = styled.img`
  width: 200px;
  position: fixed;
  bottom: 0px;

  @media screen and (max-width: 1280px) {
    width: 141px;
  }
`
