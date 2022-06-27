export function setViewportSize($el) {
  const v = getViewport()
  $el.style.blocksize = `${v}px`
}

export function getViewport() {
  return window.innerHeight
}

export function onViewportResize (callback) {
  window.addEventListener('resize', callback)
}

export function offViewportResize (callback) {
  window.removeEventListener('resize', callback)
}

export function ViewportSize($el) {
  setViewportSize($el)

  onViewportResize(() => setViewportSize($el))
}
