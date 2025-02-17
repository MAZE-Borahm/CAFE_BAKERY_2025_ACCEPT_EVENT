import React from 'react'
import * as Icons from '@/assets/svg'
import { KeyOfIcon } from '@/types/svg'

interface SvgIconProps extends Omit<React.SVGProps<SVGSVGElement>, 'name'> {
  name: KeyOfIcon
  size?: number
  onClick?: () => void
}

const SvgIcon = ({ name, width: _width, height: _height, size, onClick, ...props }: SvgIconProps): JSX.Element => {
  const IconComponent = Icons[name]
  const width = _width ?? size
  const height = _height ?? size
  const sizeProps = {
    ...(width !== undefined ? { width } : {}),
    ...(height !== undefined ? { height } : {}),
  }

  return (
    <span
      onClick={onClick}
      style={{
        display: 'inline-block',
        cursor: onClick ? 'pointer' : 'default',
      }}
    >
      <IconComponent {...props} {...sizeProps} />
    </span>
  )
}

export default SvgIcon
