const isCaption = (type: "title" | "text" | "caption"): type is "caption" => type === "caption"

const getFontSize = (
  type: "title" | "text" | "caption",
  size: "lg" | "md" | "sm" | undefined,
  device: "pc" | "mobile"
) => {
  if (isCaption(type)) return theme.font.size[type][device]
  return theme.font.size[type][device][size || "md"]
}

const getLineHeight = (
  type: "title" | "text" | "caption",
  size: "lg" | "md" | "sm" | undefined
) => {
  if (isCaption(type)) return theme.font.lineHeight[type]
  return theme.font.lineHeight[type][size || "md"]
}

export const theme = {
  colors: {
    white: "#ffffff",
    black: "#171212",
    dustyRose: "#876370",
    line: "#e5e8eb",
    background: {
      gray: "#f5f0f2",
    },
    brand: {
      lighter: "#ffecf1",
      light: "#ffd2de",
      default: "#e51a5c",
      dark: "#d6145a",
      darker: "#830a36",
    },
  },

  font: {
    size: {
      title: {
        pc: { lg: "48px", md: "36px", sm: "24px" },
        mobile: { lg: "30px", md: "26px", sm: "20px" },
      },
      text: {
        pc: { lg: "18px", md: "16px", sm: "14px" },
        mobile: { lg: "18px", md: "18px", sm: "16px" },
      },
      caption: {
        pc: "12px",
        mobile: "14px",
      },
    },
    weight: {
      bold: "600",
      regular: "400",
    },
    lineHeight: {
      title: { lg: "120%", md: "120%", sm: "130%" },
      text: { lg: "140%", md: "140%", sm: "140%" },
      caption: "140%",
    },
  },
  getFont: (type: "title" | "text" | "caption", size?: "lg" | "md" | "sm") => `
  font-size: ${getFontSize(type, size, "pc")};
  font-weight: ${
    type === "title" || (type === "text" && size === "lg")
      ? theme.font.weight.bold
      : theme.font.weight.regular
  };
  line-height: ${getLineHeight(type, size)};
  @media (max-width: 768px) {
    font-size: ${getFontSize(type, size, "mobile")};
  }
`,
} as const
