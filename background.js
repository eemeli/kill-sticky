const func = () => {
  function killSticky(root) {
    const iter = document.createNodeIterator(root, NodeFilter.SHOW_ELEMENT);
    let node;
    while ((node = iter.nextNode())) {
      const { display, position } = window.getComputedStyle(node);
      if (
        (position === "fixed" || position === "sticky") &&
        display !== "none" &&
        node.tagName !== "BODY"
      ) {
        node.parentNode.removeChild(node);
      } else {
        const shadowRoot = node.openOrClosedShadowRoot;
        if (shadowRoot) killSticky(shadowRoot);
      }
    }
  }
  killSticky(document.body);
  const fix = "; overflow: visible !important; position: relative !important";
  document.body.style.cssText += fix;
  document.documentElement.style.cssText += fix;
};

chrome.browserAction.onClicked.addListener(() => {
  chrome.tabs.executeScript({ code: `(${func.toString()})()` });
});
