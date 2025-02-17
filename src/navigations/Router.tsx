import { Routes, Route } from 'react-router-dom'
import { ROUTER } from '@/constants/router'
import { CameraCapture, Main, Result } from '@/pages'

const PageRouter = () => {
  return (
    <Routes>
      <Route path={ROUTER.MAIN} element={<Main />} />
      <Route path={ROUTER.CAMERA} element={<CameraCapture />} />
      <Route path={ROUTER.RESULT} element={<Result />} />
    </Routes>
  )
}

export default PageRouter
