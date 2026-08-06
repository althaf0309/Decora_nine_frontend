import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Global scroll-reveal engine. Any element with the `reveal` class fades/slides
 * in when it scrolls into view. A MutationObserver picks up elements that mount
 * later (e.g. cards rendered after an API call), and a route change re-scans.
 */
export const ScrollReveal = () => {
  const location = useLocation();

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      document.querySelectorAll('.reveal').forEach(el => el.classList.add('in'));
      return;
    }

    const io = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );

    const observeAll = (root: ParentNode) => {
      root.querySelectorAll?.('.reveal:not(.in)').forEach(el => io.observe(el));
    };

    // small delay so the first paint's elements are laid out
    const t = window.setTimeout(() => observeAll(document), 60);

    const mo = new MutationObserver(mutations => {
      for (const m of mutations) {
        m.addedNodes.forEach(node => {
          if (node.nodeType !== 1) return;
          const el = node as HTMLElement;
          if (el.classList?.contains('reveal') && !el.classList.contains('in')) io.observe(el);
          observeAll(el);
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.clearTimeout(t);
      io.disconnect();
      mo.disconnect();
    };
  }, [location.pathname]);

  return null;
};
