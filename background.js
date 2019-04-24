const code = `(() => {
  const elements = document.querySelectorAll('body *')
  for (let i = 0; i < elements.length; i++) {
    const el = elements[i]
    const { display, position } = window.getComputedStyle(el)
    if ((position === 'fixed' || position === 'sticky') && display !== 'none') {
      el.parentNode.removeChild(el)
    }
  }
  const fix = '; overflow: visible !important'
  document.body.style.cssText += fix
  document.documentElement.style.cssText += fix
})()`

chrome.browserAction.onClicked.addListener(() => {
  chrome.tabs.executeScript({ code })
})
