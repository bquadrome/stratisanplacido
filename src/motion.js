import { useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Smooth scroll + anchor links
export function useSmoothScroll() {
  useEffect(() => {
    if (reduced()) return;
    const lenis = new Lenis({ duration: 1.25, easing: (t) => 1 - Math.pow(1 - t, 4) });
    window.__lenis = lenis;
    let id;
    const raf = (t) => {
      lenis.raf(t);
      id = requestAnimationFrame(raf);
    };
    id = requestAnimationFrame(raf);

    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const hash = a.getAttribute('href');
      if (hash.length < 2) return;
      const el = document.querySelector(hash);
      if (!el) return;
      e.preventDefault();
      // fixed header: land below its compact height (88px desktop, 76px mobile)
      const head = window.innerWidth <= 800 ? 76 : 88;
      lenis.scrollTo(el, { offset: hash === '#home' ? 0 : -(head + 24) });
    };
    document.addEventListener('click', onClick);
    return () => {
      cancelAnimationFrame(id);
      document.removeEventListener('click', onClick);
      lenis.destroy();
      if (window.__lenis === lenis) delete window.__lenis;
    };
  }, []);
}

// Elements with [data-reveal] get .in when they enter view
export function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]');
    if (reduced()) {
      els.forEach((el) => el.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add('in');
            io.unobserve(en.target);
          }
        });
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.08 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

// Timeline spine draws with scroll; each dot lights when the tip reaches it
export function useTimelineSpine(rootRef) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const spine = root.querySelector('.tl-spine');
    const bands = [...root.querySelectorAll('.tl-band')];
    if (reduced()) {
      spine.style.setProperty('--p', 1);
      bands.forEach((b) => b.classList.add('on'));
      return;
    }
    let ticking = false;
    const update = () => {
      ticking = false;
      const vh = window.innerHeight;
      const r = spine.getBoundingClientRect();
      const tipY = vh * 0.6; // tip follows 60% of viewport
      const p = Math.min(1, Math.max(0, (tipY - r.top) / r.height));
      spine.style.setProperty('--p', p.toFixed(4));
      bands.forEach((b) => {
        const dot = b.querySelector('.tl-dot');
        const dy = dot.getBoundingClientRect().top + 4.5;
        b.classList.toggle('on', dy <= tipY);
      });
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [rootRef]);
}

// Mobile: bands stick so next one slides over. Tall bands stick by
// their bottom edge (top = vh - height) so all text is read first.
export function useTimelineStack(rootRef) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const bands = [...root.querySelectorAll('.tl-band')];
    const set = () => {
      const vh = window.innerHeight;
      bands.forEach((b) => b.style.setProperty('--stick', `${Math.min(0, vh - b.offsetHeight)}px`));
    };
    const ro = new ResizeObserver(set); // also catches "Leggi di più"
    bands.forEach((b) => ro.observe(b));
    window.addEventListener('resize', set);
    set();
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', set);
    };
  }, [rootRef]);
}
