import { useCallback, useEffect, useRef, useState } from 'react'
import Webcam from 'react-webcam'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { analyzeGender } from '@/apis/genderApi'
import { Logo } from '@/assets/img'
import { ROUTER } from '@/constants/router'

const CameraCapture = () => {
  const navigate = useNavigate()
  const webcamRef = useRef<Webcam>(null)
  const [, setPhotos] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)
  const [hasPermission, setHasPermission] = useState(false)

  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot()
      if (imageSrc) {
        return imageSrc
      }
    }
    return null
  }, [webcamRef])

  const capturePhotos = useCallback(async () => {
    if (!webcamRef.current || !hasPermission) return
    setPhotos([])
    setError(null)

    try {
      const newPhotos: string[] = []
      for (let i = 0; i < 5; i++) {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        const photo = capture()
        if (photo) {
          newPhotos.push(photo)
          setPhotos((prev) => [...prev, photo])
        }
      }

      if (newPhotos.length === 5) {
        try {
          const result = await analyzeGender(newPhotos)
          navigate(ROUTER.RESULT, {
            state: {
              result: result,
            },
          })
        } catch (error) {
          console.error('분석 중 에러:', error)
          setError('분석 중 오류가 발생했습니다.')
        }
      }
    } catch (error) {
      console.error('사진 촬영 중 에러:', error)
      setError('사진 촬영 중 오류가 발생했습니다.')
    }
  }, [capture, navigate, hasPermission])

  useEffect(() => {
    if (hasPermission) {
      const timeoutId = setTimeout(() => {
        capturePhotos()
      }, 1000)

      return () => clearTimeout(timeoutId)
    }
  }, [capturePhotos, hasPermission])

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: 'user',
  }

  return (
    <Container>
      <WebcamContainer>
        <Webcam
          ref={webcamRef}
          audio={false}
          screenshotFormat='image/jpeg'
          videoConstraints={videoConstraints}
          onUserMedia={() => {
            setHasPermission(true)
            setError(null)
          }}
          onUserMediaError={(error) => {
            console.error('카메라 접근 에러:', error)
            setError('카메라 접근 권한이 필요합니다.')
            setHasPermission(false)
          }}
        />
        <WebcamOverlay>
          <div>
            <h1>귀하의 특성을 분석중입니다.</h1>
            <p>화면을 바라봐주세요</p>
          </div>
        </WebcamOverlay>
      </WebcamContainer>

      {error && <ErrorMessage>{error}</ErrorMessage>}
      <LogoStyle src={Logo} />
    </Container>
  )
}

export default CameraCapture

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  padding-top: 8dvh;
  justify-content: center;
`

const WebcamContainer = styled.div`
  position: relative;
  width: 70dvw;
  height: 70dvh;

  video {
    width: 100%;
    height: 100%;
    border-radius: 48px;
    object-fit: cover;
  }
`

const WebcamOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 48px;
  display: flex;
  justify-content: center;
  align-items: center; // 다시 center로 변경
  pointer-events: none;

  div {
    display: flex;
    flex-direction: column;
    align-items: center; // 추가
    gap: 29px;
    text-align: center;
    width: 100%; // 추가
    height: 100%; // 추가
    justify-content: center; // 추가

    // Lottie 애니메이션을 위한 스타일
    > div:first-child {
      position: absolute;
      width: 400px;
      height: 400px;

      top: 40%;
      left: 50%;
      transform: translate(-50%, -50%);

      margin-bottom: 0;
      @media screen and (max-width: 1280px) {
        width: 250px !important; // !important로 인라인 스타일 덮어쓰기
        height: 250px !important;
        top: 45%;
        left: 50%;
        transform: translate(-45%, -50%);
      }
    }

    // 텍스트 컨테이너
    > h1,
    > p {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      width: 100%;
    }

    > h1 {
      bottom: 140px;
      font-size: 64px;
      font-weight: 300;
      color: white;

      @media screen and (max-width: 1280px) {
        font-size: 45px;
        bottom: 100px;
      }
    }

    > p {
      bottom: 60px;
      font-size: 40px;
      color: white;
      font-weight: 800;

      @media screen and (max-width: 1280px) {
        font-size: 28px;
        bottom: 40px;
      }
    }
  }
`

const ErrorMessage = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  z-index: 20;
`

const LogoStyle = styled.img`
  width: 140px;
  position: fixed;
  bottom: 0px;
`
