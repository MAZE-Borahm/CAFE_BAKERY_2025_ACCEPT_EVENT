document.addEventListener("DOMContentLoaded", function () {
  const breakpoints = {
    mobile: 480,
    tablet: 768,
    pc: 1024,
    widepc: 1440,
  }

  const styles = {
    mobile: `
            .header-container li a {
                font-size: 0.5rem;
            }
        `,
    tablet: `
            /* 태블릿 스타일 */
        `,
    pc: `
            /* PC 스타일 */
        `,
    widepc: `
            /* 와이드 PC 스타일 */
        `,
  }

  const styleElement = document.createElement("style")
  document.head.appendChild(styleElement)

  function applyStyles() {
    let cssText = ""
    for (const [device, width] of Object.entries(breakpoints)) {
      cssText += `@media (max-width: ${width}px) { ${styles[device]} }\n`
    }
    styleElement.textContent = cssText
  }

  applyStyles()
  window.addEventListener("resize", applyStyles)
})
