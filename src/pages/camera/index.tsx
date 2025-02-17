import { useCallback, useEffect, useRef, useState } from 'react'
import Webcam from 'react-webcam'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { analyzeGender } from '@/apis/genderApi'
import { Logo } from '@/assets/img'
// import { ROUTER } from '@/constants/router'

const CameraCapture = () => {
  const navigate = useNavigate()
  const webcamRef = useRef<Webcam>(null)
  const [, setPhotos] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)

  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot()
      if (imageSrc) {
        return imageSrc
      }
    }
    return null
  }, [webcamRef])

  useEffect(() => {
    const capturePhotos = async () => {
      if (!webcamRef.current) return
      setPhotos([])
      setError(null)

      try {
        for (let i = 0; i < 5; i++) {
          await new Promise((resolve) => setTimeout(resolve, 1000))

          const photo = capture()
          if (photo) {
            setPhotos((prev) => {
              const newPhotos = prev.length < 5 ? [...prev, photo] : prev

              if (newPhotos.length === 5) {
                console.log(newPhotos)

                // 5장 촬영 완료 시 서버로 전송
                analyzeGender(newPhotos)
                  .then((result) => {
                    console.log(result)

                    // setTimeout(() => {
                    //   navigate(ROUTER.RESULT, {
                    //     state: {
                    //       result: result,
                    //     },
                    //   })
                    // }, 0)
                  })
                  .catch((error) => {
                    console.error('분석 중 에러:', error)

                    setError('분석 중 오류가 발생했습니다.')
                  })
              }

              return newPhotos
            })
          }
        }
      } catch (error) {
        console.error('사진 촬영 중 에러:', error)

        setError('사진 촬영 중 오류가 발생했습니다.')
      }
    }

    const timeoutId = setTimeout(() => {
      capturePhotos()
    }, 1000)

    return () => clearTimeout(timeoutId)
  }, [capture, navigate])

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: 'environment',
  }

  return (
    <Container>
      <WebcamContainer>
        <Webcam
          ref={webcamRef}
          audio={false}
          screenshotFormat='image/jpeg'
          videoConstraints={videoConstraints}
          onUserMediaError={(error) => {
            console.error('카메라 접근 에러:', error)
            setError('카메라 접근 권한이 필요합니다.')
          }}
        />
        {/* New Overlay */}
        <WebcamOverlay>
          <div>
            <h1>귀하의 특성을 분석중입니다. </h1>
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
  /* align-items: center; */
  padding-top: 106px;
  justify-content: center;
`

const WebcamContainer = styled.div`
  position: relative;
  width: 926px;
  height: 791px;

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
  align-items: center;
  pointer-events: none;
  div {
    display: flex;
    flex-direction: column;
    gap: 29px;
    margin-bottom: 45px;
    margin-top: auto;
    text-align: center;
    h1 {
      font-size: 64px;
      font-weight: 300;
      color: white;
    }
    p {
      font-size: 40px;
      color: white;
      font-weight: 800;
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
  width: 200px;
  position: fixed;
  bottom: 0px;
`
