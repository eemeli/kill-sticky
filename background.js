const func = () => {
  function killSticky(root, ksCount) {
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
      } else if (ksCount > 0) {
        const shadowRoot = node.openOrClosedShadowRoot;
        if (shadowRoot) killSticky(shadowRoot, ksCount - 1);
      }
    }
  }
  const ksCount = Number(document.body.dataset["ks"] ?? 0);
  killSticky(document.body, ksCount);
  const fix = "; overflow: visible !important; position: relative !important";
  document.body.style.cssText += fix;
  document.documentElement.style.cssText += fix;
  document.body.dataset["ks"] = ksCount + 1;
};

chrome.browserAction.onClicked.addListener(() => {
  chrome.tabs.executeScript({ code: `(${func.toString()})()` });
});
