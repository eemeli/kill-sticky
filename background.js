const code = `(() => {
  const elements = document.querySelectorAll('body *')
  for (let i = 0; i < elements.length; i++) {
    const el = elements[i]
    const pos = window.getComputedStyle(el).position
	const style = window.getComputedStyle(el);
    if ((pos === 'fixed' || pos === 'sticky') && style.display !== 'none') {
      el.parentNode.removeChild(el)
    }
  }
  document.body.style.overflow = 'visible'
  document.documentElement.style.overflow = 'visible'
})()`

chrome.browserAction.onClicked.addListener(() => {
  chrome.tabs.executeScript({ code })
})
