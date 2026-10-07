"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import styles from "./reticle-cursor.module.css";

const nativeCursorSelector =
  'input, textarea, select, option, iframe, object, embed, :disabled, [aria-disabled="true"], [role="textbox"], [role="combobox"]';
const interactiveSelector =
  'a[href], button, summary, label[for], [role="button"], [role="link"], [role="menuitem"], [role="tab"], [role="checkbox"], [role="switch"]';

function needsNativeCursor(target: Element) {
  const editable = target.closest<HTMLElement>("[contenteditable]");
  return Boolean(
    target.closest(nativeCursorSelector) || editable?.isContentEditable,
  );
}

export function ReticleCursor() {
  const pathname = usePathname();
  const cursorRef = useRef<HTMLDivElement>(null);
  const reticleRef = useRef<HTMLSpanElement>(null);
  const spinRef = useRef<HTMLSpanElement>(null);
  const pulseRef = useRef<HTMLSpanElement>(null);
  const refreshRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (
      !cursorRef.current ||
      !reticleRef.current ||
      !spinRef.current ||
      !pulseRef.current
    ) {
      return;
    }
    const cursor = cursorRef.current;
    const reticle = reticleRef.current;
    const spin = spinRef.current;
    const pulse = pulseRef.current;

    const root = document.documentElement;
    const pointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const forcedColors = window.matchMedia("(forced-colors: active)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let point = { x: 0, y: 0 };
    let hasMouse = false;
    let frame = 0;
    let pulseAnimation: Animation | undefined;
    let hoverAnimation: Animation | undefined;
    let clickAnimation: Animation | undefined;
    let hovered: Element | null = null;

    function hide() {
      cursor.dataset.visible = "false";
      cursor.dataset.hover = "false";
      root.classList.remove(styles.active);
      hovered = null;
      pulseAnimation?.cancel();
      hoverAnimation?.cancel();
      clickAnimation?.cancel();
    }

    function reset() {
      hasMouse = false;
      cancelAnimationFrame(frame);
      frame = 0;
      hide();
    }

    function canActivate() {
      return pointer.matches && !forcedColors.matches && !document.hidden;
    }

    function render() {
      frame = 0;
      if (!hasMouse || !canActivate() || !document.hasFocus()) {
        hide();
        return;
      }

      const target = document.elementFromPoint(point.x, point.y);
      if (!target || needsNativeCursor(target)) {
        hide();
        return;
      }

      cursor.style.transform = `translate3d(${point.x}px, ${point.y}px, 0)`;
      const interactive = target.closest(interactiveSelector);
      cursor.dataset.hover = String(Boolean(interactive));
      if (interactive !== hovered) {
        hovered = interactive;
        if (interactive && !reducedMotion.matches) {
          hoverAnimation?.cancel();
          hoverAnimation = spin.animate(
            [{ transform: "rotate(0deg)" }, { transform: "rotate(360deg)" }],
            { duration: 240, easing: "cubic-bezier(0.16, 1, 0.3, 1)" },
          );
        }
      }
      cursor.dataset.visible = "true";
      // Hide the native pointer only once the reticle is positioned and visible.
      root.classList.add(styles.active);
    }

    function refresh() {
      if (!frame) frame = requestAnimationFrame(render);
    }

    function move(event: PointerEvent) {
      if (event.pointerType !== "mouse") {
        reset();
        return;
      }
      hasMouse = true;
      point = { x: event.clientX, y: event.clientY };
      refresh();
    }

    function press(event: PointerEvent) {
      move(event);
      const target = event.target;
      if (
        event.pointerType !== "mouse" ||
        event.button !== 0 ||
        !canActivate() ||
        reducedMotion.matches ||
        !(target instanceof Element) ||
        needsNativeCursor(target)
      ) {
        return;
      }

      pulseAnimation?.cancel();
      clickAnimation?.cancel();
      pulse.style.left = `${event.clientX}px`;
      pulse.style.top = `${event.clientY}px`;
      pulseAnimation = pulse.animate(
        [
          { opacity: 0.7, transform: "translate(-50%, -50%) scale(0.2)" },
          { opacity: 0, transform: "translate(-50%, -50%) scale(1)" },
        ],
        { duration: 340, easing: "ease-out" },
      );
      clickAnimation = reticle.animate(
        [
          { transform: "translate(-50%, -50%) scale(1)", offset: 0 },
          { transform: "translate(-50%, -50%) scale(0.65)", offset: 0.2 },
          { transform: "translate(-50%, -50%) scale(1.12)", offset: 0.6 },
          { transform: "translate(-50%, -50%) scale(1)", offset: 1 },
        ],
        { duration: 260, easing: "ease-out" },
      );
    }

    function leave(event: PointerEvent) {
      if (!event.relatedTarget) reset();
    }

    function updatePreferences() {
      if (!canActivate()) reset();
      else refresh();
      if (reducedMotion.matches) {
        pulseAnimation?.cancel();
        hoverAnimation?.cancel();
        clickAnimation?.cancel();
      }
    }

    refreshRef.current = refresh;
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", move, { passive: true });
    window.addEventListener("pointerdown", press, { passive: true });
    window.addEventListener("pointerout", leave, { passive: true });
    window.addEventListener("blur", reset);
    window.addEventListener("resize", refresh, { passive: true });
    document.addEventListener("scroll", refresh, {
      passive: true,
      capture: true,
    });
    document.addEventListener("visibilitychange", reset);
    pointer.addEventListener("change", updatePreferences);
    forcedColors.addEventListener("change", updatePreferences);
    reducedMotion.addEventListener("change", updatePreferences);

    return () => {
      reset();
      refreshRef.current = null;
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", move);
      window.removeEventListener("pointerdown", press);
      window.removeEventListener("pointerout", leave);
      window.removeEventListener("blur", reset);
      window.removeEventListener("resize", refresh);
      document.removeEventListener("scroll", refresh, true);
      document.removeEventListener("visibilitychange", reset);
      pointer.removeEventListener("change", updatePreferences);
      forcedColors.removeEventListener("change", updatePreferences);
      reducedMotion.removeEventListener("change", updatePreferences);
    };
  }, []);

  useEffect(() => {
    refreshRef.current?.();
  }, [pathname]);

  return (
    <>
      <div
        ref={cursorRef}
        className={styles.cursor}
        aria-hidden="true"
        data-visible="false"
        data-hover="false"
      >
        <span ref={reticleRef} className={styles.reticle}>
          <span className={styles.orbit}>
            <span ref={spinRef} className={styles.spin}>
              <span className={styles.topLeft} />
              <span className={styles.topRight} />
              <span className={styles.bottomLeft} />
              <span className={styles.bottomRight} />
            </span>
          </span>
        </span>
        <span className={styles.dot} />
      </div>
      <span ref={pulseRef} className={styles.pulse} aria-hidden="true" />
    </>
  );
}
