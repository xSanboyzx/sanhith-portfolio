export function getStickyHeight(element: HTMLElement | null) {
  if (!element) return 0;

  const { position } = window.getComputedStyle(element);
  return position === "sticky" || position === "fixed"
    ? element.getBoundingClientRect().height
    : 0;
}

export function getNavigationClearance() {
  const header = document.querySelector<HTMLElement>(".site-header");
  const tracker = document.querySelector<HTMLElement>("[data-homepage-tracker]");
  return getStickyHeight(header) + getStickyHeight(tracker) + 20;
}
