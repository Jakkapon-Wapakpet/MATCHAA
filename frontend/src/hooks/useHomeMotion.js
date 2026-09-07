import { useEffect, useRef } from 'react';

// Animate only on first entry; content remains visible without observer support.
export default function useHomeMotion(enabled, replay) {
  const rootRef = useRef(null);
  useEffect(() => {
    const root = rootRef.current;
    if (!root || !('IntersectionObserver' in window)) return;
    const targets = root.querySelectorAll('[data-home-reveal]');
    targets.forEach((element) => element.classList.remove('home-entered'));
    if (!enabled) return;
    // Commit the reset so replay starts a fresh CSS animation.
    void root.offsetWidth;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (!isIntersecting) return;
        target.classList.add('home-entered');
        observer.unobserve(target);
      });
    }, { threshold: 0.08 });
    root.querySelectorAll('[data-home-reveal]').forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [enabled, replay]);
  return rootRef;
}
