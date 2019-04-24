# Kill-Sticky Chrome Extension

A Chrome Extension based on the [Kill sticky headers](https://alisdair.mcdiarmid.org/kill-sticky-headers/) bookmarklet by Alisdair McDiarmid, this adds a keyboard shortcut (**Ctrl+Shift+K** on Windows & Linux, **Cmd+K** on macOS) that runs this bit of JavaScript on the current page:

```js
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
```

To change the keyboard shortcut, visit the page [`chrome://extensions/shortcuts`](chrome://extensions/shortcuts).

Released as open source under the [ISC license](LICENSE).
