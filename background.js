const code = `(() => {
  const elements = document.querySelectorAll('body *')
  for (let i = 0; i < elements.length; i++) {
    const el = elements[i]
    const computedStyle = window.getComputedStyle(el);
    if ((computedStyle.position === 'fixed' || computedStyle.position === 'sticky') && computedStyle.display !== 'none') {
      el.parentNode.removeChild(el)
    }
  }
  document.body.style.overflow = 'visible'
  document.documentElement.style.overflow = 'visible'
})()`

chrome.browserAction.onClicked.addListener(() => {
  chrome.tabs.executeScript({ code })
})
