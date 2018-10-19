const hide = `(() => {
  const elements = document.querySelectorAll('body *')
  for (let i = 0; i < elements.length; i++) {
    const el = elements[i]
    const pos = window.getComputedStyle(el).position
    if (pos === 'fixed' || pos === 'sticky') {
      el.dataset["killStickyOriginalOpacity"] = el.style.opacity
      el.style["opacity"] = "0"
    }
  }
  document.body.style.overflow = 'visible'
  document.documentElement.style.overflow = 'visible'
})()`

const show = `(() => {
  const elements = document.querySelectorAll('[data-kill-sticky-original-opacity]')
  for (const el of elements) {
    const originalOpacity = el.dataset["killStickyOriginalOpacity"];
    if (originalOpacity === "") {
      el.style["opacity"] = null;
    } else {
      el.style.opacity = originalOpacity
    }
    delete el.dataset.killStickyOriginalOpacity
  }
})()`

let hidden = false;
chrome.browserAction.onClicked.addListener(() => {
  if (hidden) {
    chrome.tabs.executeScript({ code: show })
    hidden = false;
  } else {
    chrome.tabs.executeScript({ code: hide })
    hidden = true;
  }
})
