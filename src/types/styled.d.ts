import "styled-components"

type FontSizeVariants = {
  lg: string
  md: string
  sm: string
}

type FontSize = {
  pc: FontSizeVariants
  mobile: FontSizeVariants
}

type FontWeight = {
  bold: string
  regular: string
}

type LineHeightVariants = {
  lg: string
  md: string
  sm: string
}

type CaptionSize = {
  pc: string
  mobile: string
}

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      white: string
      black: string
      dustyRose: string
      line: string
      background: {
        gray: string
      }
      brand: {
        lighter: string
        light: string
        default: string
        dark: string
        darker: string
      }
    }
    font: {
      size: {
        title: FontSize
        text: FontSize
        caption: CaptionSize
      }
      weight: FontWeight
      lineHeight: {
        title: LineHeightVariants
        text: LineHeightVariants
        caption: string
      }
    }
    getFont: (type: "title" | "text" | "caption", size?: "lg" | "md" | "sm") => string
  }
}
