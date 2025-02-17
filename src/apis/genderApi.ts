// apis/gender.ts
import instance from './instance'

export const analyzeGender = async (images: string[]) => {
  const formData = new FormData()

  images.forEach((image, index) => {
    const imageBlob = dataURItoBlob(image)
    // filename을 명시적으로 지정
    formData.append('images', imageBlob, `image${index}.jpg`)
  })

  const { data } = await instance.post('/gender', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return data
}
function dataURItoBlob(dataURI: string) {
  const byteString = atob(dataURI.split(',')[1])
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

  const ab = new ArrayBuffer(byteString.length)
  const ia = new Uint8Array(ab)

  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i)
  }

  return new Blob([ab], { type: mimeString })
}
