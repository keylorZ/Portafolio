import { useEffect, type RefObject } from 'react';

type MagneticOptions = {
  radius?: number;
  strength?: number;
  ease?: number;
};

export function useMagneticLetters<T extends HTMLElement>(
  ref: RefObject<T>,
  { radius = 110, strength = 26, ease = 0.18 }: MagneticOptions = {}
) {
  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const letters = Array.from(
      container.querySelectorAll<HTMLElement>('[data-magnetic-letter]')
    );
    if (letters.length === 0) return;

    const offsets = letters.map(() => ({ x: 0, y: 0, targetX: 0, targetY: 0 }));
    let frame = 0;

    const animate = () => {
      let moving = false;

      letters.forEach((letter, index) => {
        const offset = offsets[index];
        offset.x += (offset.targetX - offset.x) * ease;
        offset.y += (offset.targetY - offset.y) * ease;

        const settled =
          Math.abs(offset.targetX - offset.x) < 0.05 &&
          Math.abs(offset.targetY - offset.y) < 0.05;

        if (settled) {
          offset.x = offset.targetX;
          offset.y = offset.targetY;
        } else {
          moving = true;
        }

        letter.style.transform = `translate3d(${offset.x.toFixed(2)}px, ${offset.y.toFixed(2)}px, 0)`;
      });

      frame = moving ? requestAnimationFrame(animate) : 0;
    };

    const start = () => {
      if (!frame) frame = requestAnimationFrame(animate);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return;

      const bounds = container.getBoundingClientRect();
      const pointerX = event.clientX - bounds.left;
      const pointerY = event.clientY - bounds.top;

      letters.forEach((letter, index) => {
        const offset = offsets[index];
        const centerX = letter.offsetLeft + letter.offsetWidth / 2;
        const centerY = letter.offsetTop + letter.offsetHeight / 2;
        const deltaX = centerX - pointerX;
        const deltaY = centerY - pointerY;
        const distance = Math.hypot(deltaX, deltaY);
        const force = Math.max(0, 1 - distance / radius);

        if (force > 0) {
          const push = force * force * strength;
          const directionX = distance > 0.5 ? deltaX / distance : 0;
          const directionY = distance > 0.5 ? deltaY / distance : -1;
          offset.targetX = directionX * push;
          offset.targetY = directionY * push * 0.6;
        } else {
          offset.targetX = 0;
          offset.targetY = 0;
        }
      });

      start();
    };

    const reset = () => {
      offsets.forEach((offset) => {
        offset.targetX = 0;
        offset.targetY = 0;
      });
      start();
    };

    container.addEventListener('pointermove', handlePointerMove);
    container.addEventListener('pointerleave', reset);
    container.addEventListener('pointercancel', reset);
    window.addEventListener('blur', reset);

    return () => {
      cancelAnimationFrame(frame);
      container.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('pointerleave', reset);
      container.removeEventListener('pointercancel', reset);
      window.removeEventListener('blur', reset);
      letters.forEach((letter) => {
        letter.style.transform = '';
      });
    };
  }, [ref, radius, strength, ease]);
}
