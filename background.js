const func = () => {
  function killSticky(root) {
    const iter = document.createNodeIterator(root, NodeFilter.SHOW_ELEMENT);
    let node;
    while ((node = iter.nextNode())) {
      const { display, position } = window.getComputedStyle(node);
      if (
        (position === "fixed" || position === "sticky") &&
        display !== "none"
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

browser.action.onClicked.addListener(async (tab) => {
  try {
    await browser.scripting.executeScript({ target: { tabId: tab.id }, func });
  } catch (err) {
    console.error("kill-sticky failed:", err);
  }
});
