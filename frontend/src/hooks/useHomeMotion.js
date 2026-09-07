import { useEffect, useRef } from 'react';

// Reveal each [data-home-reveal] target once, the first time it scrolls into
// view. What the reveal looks like is left to styles/home-motion.css, which
// swaps in a plain fade when the page is in reduced-motion mode.
export default function useHomeMotion(replay = 0) {
  const rootRef = useRef(null);
  useEffect(() => {
    const root = rootRef.current;
    if (!root || !('IntersectionObserver' in window)) return;
    const targets = root.querySelectorAll('[data-home-reveal]');
    targets.forEach((element) => element.classList.remove('home-entered'));
    // Commit the reset so replay starts a fresh CSS animation.
    void root.offsetWidth;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (!isIntersecting) return;
        target.classList.add('home-entered');
        observer.unobserve(target);
      });
    }, { threshold: 0.08 });
    targets.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [replay]);
  return rootRef;
}
