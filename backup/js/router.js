document.addEventListener("DOMContentLoaded", () => {
  const content = document.getElementById("content")
  const navLinks = document.querySelectorAll("a[data-page]")

  async function loadPage(page) {
    try {
      const response = await fetch(`pages/${page}.html`)
      if (!response.ok) throw new Error("Page not found")
      const html = await response.text()
      content.innerHTML = html
      updateActiveLink(page)
      history.pushState(null, "", `/${page}`)
    } catch (error) {
      console.error("Error loading page:", error)
      content.innerHTML = "<p>Error loading page</p>"
    }
  }

  function updateActiveLink(activePage) {
    navLinks.forEach((link) => {
      if (link.getAttribute("data-page") === activePage) {
        link.classList.add("active")
      } else {
        link.classList.remove("active")
      }
    })
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()
      const page = e.target.getAttribute("data-page")
      loadPage(page)
    })
  })

  // 초기 페이지 로드
  const path = window.location.pathname.substring(1)
  const initialPage = path || "home"
  loadPage(initialPage)

  // 브라우저 뒤로 가기, 앞으로 가기 처리
  window.addEventListener("popstate", () => {
    const path = window.location.pathname.substring(1)
    loadPage(path || "home")
  })
})
