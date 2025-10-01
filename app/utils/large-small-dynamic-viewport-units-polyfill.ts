/* Source: https://github.com/joppuyo/large-small-dynamic-viewport-units-polyfill */

function setVh(): void {
  const svh = document.documentElement.clientHeight * 0.01
  document.documentElement.style.setProperty('--1svh', `${svh}px`)

  const dvh = window.innerHeight * 0.01
  document.documentElement.style.setProperty('--1dvh', `${dvh}px`)

  if (document.body) {
    const fixed = document.createElement('div')
    fixed.style.width = '1px'
    fixed.style.height = '100vh'
    fixed.style.position = 'fixed'
    fixed.style.left = '0'
    fixed.style.top = '0'
    fixed.style.bottom = '0'
    fixed.style.visibility = 'hidden'

    document.body.appendChild(fixed)

    const fixedHeight: number = fixed.clientHeight
    fixed.remove()

    const lvh = fixedHeight * 0.01
    document.documentElement.style.setProperty('--1lvh', `${lvh}px`)
  }
}

function isMobile(): boolean {
  const ua = navigator.userAgent
  if (
    /Android|iPhone|iPad|iPod/i.test(ua) ||
    (ua.match(/Mac/) &&
      navigator.maxTouchPoints &&
      navigator.maxTouchPoints > 2)
  ) {
    return true
  }
  return false
}

export function initialize(): void {
  // SSR guard
  if (typeof window === 'undefined') return

  // Skip if browser supports native svh/dvh/lvh
  if (
    'CSS' in window &&
    'supports' in (window.CSS as typeof CSS) &&
    CSS.supports('height: 100svh') &&
    CSS.supports('height: 100dvh') &&
    CSS.supports('height: 100lvh')
  ) {
    return
  }

  // Skip if not mobile
  if (!isMobile()) return

  // Run early
  setVh()

  // Re-run on DOM ready
  document.addEventListener('DOMContentLoaded', () => setVh())

  // Re-run on resize
  window.addEventListener('resize', () => setVh())
}
