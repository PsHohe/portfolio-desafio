/**
 * Scrolls the window to the top of the page with a smooth animation
 * and prevents any automatic focus events from scrolling the page back down
 */
export function scrollToTop() {
  // Store active element to restore focus if needed
  const activeElement = document.activeElement;

  // Scroll to top
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });

  // If an element was focused, blur it to prevent auto-scrolling
  if (activeElement && activeElement !== document.body) {
    activeElement.blur();
  }
}
