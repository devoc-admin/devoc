export function copyToClipboard(text: string): Promise<boolean> {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard
      .writeText(text)
      .then(() => true)
      .catch(() => false);
  }
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  textArea.style.left = "-999999px";
  textArea.style.top = "-999999px";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  return new Promise((resolve) => {
    const successful = document.execCommand("copy");
    textArea.remove();
    resolve(successful);
  });
}

export function scrollToTop(behavior: ScrollBehavior = "instant") {
  if (typeof window === "undefined") return;
  window.scrollTo({ behavior, left: 0, top: 0 });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}
