/**
 * Scrolls the window to the top of the page with a smooth animation
 */
export function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}
