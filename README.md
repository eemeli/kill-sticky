# Kill-Sticky-Shortcut

A browser Extension based on the [Kill sticky headers](https://alisdair.mcdiarmid.org/kill-sticky-headers/) bookmarklet by Alisdair McDiarmid, this adds a keyboard shortcut (**Alt+Period** on Windows & Linux, **Cmd+Period** on macOS) that runs this bit of JavaScript on the current page:

```js
const elements = document.querySelectorAll('body *')
for (let i = 0; i < elements.length; i++) {
  const el = elements[i]
  const { display, position } = window.getComputedStyle(el)
  if ((position === 'fixed' || position === 'sticky') && display !== 'none') {
    el.parentNode.removeChild(el)
  }
}
const fix = '; overflow: visible !important; position: relative !important'
document.body.style.cssText += fix
document.documentElement.style.cssText += fix
```

To change the keyboard shortcut, visit the page [`chrome://extensions/shortcuts`](chrome://extensions/shortcuts) in Chrome or select "Manage Extension Shortcuts" option at `about:addons` in Firefox.

Released as open source under the [MIT license](LICENSE).
