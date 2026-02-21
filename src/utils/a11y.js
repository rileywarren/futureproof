export const ANNOUNCE_EVENT = 'futureproof-announce';

export function announce(message) {
  if (typeof window === 'undefined' || !message) return;
  window.dispatchEvent(
    new CustomEvent(ANNOUNCE_EVENT, {
      detail: { message },
    })
  );
}
