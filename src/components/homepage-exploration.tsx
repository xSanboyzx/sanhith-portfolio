"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type AnchorHTMLAttributes,
  type MouseEvent,
  type ReactNode,
} from "react";

type DossierGroup = "experience" | "projects";
type DossierController = {
  group: DossierGroup;
  setOpen: (open: boolean) => void;
};

type ExplorationContext = {
  selectedSkill: string;
  selectSkill: (id: string) => void;
  navigateTo: (id: string) => void;
  registerDossier: (id: string, controller: DossierController) => () => void;
  reportOpen: (id: string, open: boolean) => void;
  setGroupExpanded: (group: DossierGroup, open: boolean) => void;
  isGroupExpanded: (group: DossierGroup) => boolean;
};

const HomepageContext = createContext<ExplorationContext | null>(null);
const subscribeToHydration = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

function useHydrated() {
  return useSyncExternalStore(
    subscribeToHydration,
    getClientSnapshot,
    getServerSnapshot,
  );
}

export function useHomepageExploration() {
  const context = useContext(HomepageContext);
  if (!context) {
    throw new Error("Homepage interactions must be inside HomepageExploration.");
  }
  return context;
}

function readFragment() {
  try {
    return decodeURIComponent(window.location.hash.slice(1));
  } catch {
    return "";
  }
}

function navigationClearance() {
  const header = document.querySelector<HTMLElement>(".site-header");
  const tracker = document.querySelector<HTMLElement>("[data-homepage-tracker]");
  return (
    (header?.getBoundingClientRect().height ?? 0) +
    (tracker?.getBoundingClientRect().height ?? 0) +
    20
  );
}

export function HomepageExploration({ children }: { children: ReactNode }) {
  const [selectedSkill, selectSkill] = useState("data");
  const [openDossiers, setOpenDossiers] = useState<ReadonlySet<string>>(
    () => new Set(),
  );
  const controllers = useRef(new Map<string, DossierController>());
  const navigationFrame = useRef(0);

  const registerDossier = useCallback(
    (id: string, controller: DossierController) => {
      controllers.current.set(id, controller);
      return () => {
        controllers.current.delete(id);
      };
    },
    [],
  );

  const reportOpen = useCallback((id: string, open: boolean) => {
    setOpenDossiers((previous) => {
      if (previous.has(id) === open) return previous;
      const next = new Set(previous);
      if (open) next.add(id);
      else next.delete(id);
      return next;
    });
  }, []);

  const moveTo = useCallback((id: string, updateHistory: boolean) => {
    const destination = document.getElementById(id);
    if (!destination) return;

    controllers.current.get(id)?.setOpen(true);
    if (updateHistory && readFragment() !== id) {
      window.history.pushState(null, "", `#${encodeURIComponent(id)}`);
    }

    cancelAnimationFrame(navigationFrame.current);
    navigationFrame.current = requestAnimationFrame(() => {
      if (readFragment() !== id) return;

      const heading = document.getElementById(`${id}-heading`);
      const focusTarget = heading ?? destination;
      focusTarget.closest(".reveal")?.classList.add("is-visible");
      destination.closest(".reveal")?.classList.add("is-visible");
      if (!focusTarget.hasAttribute("tabindex")) focusTarget.tabIndex = -1;
      focusTarget.focus({ preventScroll: true });

      // Section headings sit inside generous section padding; keep their label
      // visible while individual files land at the top of their whole card.
      const scrollTarget =
        id === "main"
          ? destination
          : destination.querySelector<HTMLElement>(".section-heading") ??
            destination;
      const top =
        scrollTarget.getBoundingClientRect().top +
        window.scrollY -
        navigationClearance();
      window.scrollTo({
        top: Math.max(0, top),
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
    });
  }, []);

  const navigateTo = useCallback((id: string) => moveTo(id, true), [moveTo]);

  const setGroupExpanded = useCallback((group: DossierGroup, open: boolean) => {
    controllers.current.forEach((controller) => {
      if (controller.group === group) controller.setOpen(open);
    });
  }, []);

  const isGroupExpanded = useCallback(
    (group: DossierGroup) => {
      const ids = [...controllers.current].filter(
        ([, controller]) => controller.group === group,
      );
      return ids.length > 0 && ids.every(([id]) => openDossiers.has(id));
    },
    [openDossiers],
  );

  useEffect(() => {
    const root = document.documentElement;
    const header = document.querySelector<HTMLElement>(".site-header");
    const previousHeight = root.style.getPropertyValue("--homepage-header-height");
    const previousRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    const measureHeader = () => {
      if (header) {
        root.style.setProperty(
          "--homepage-header-height",
          `${header.getBoundingClientRect().height}px`,
        );
      }
    };
    measureHeader();
    const observer = new ResizeObserver(measureHeader);
    if (header) observer.observe(header);

    const followFragment = () => {
      const id = readFragment();
      if (id) moveTo(id, false);
      else {
        cancelAnimationFrame(navigationFrame.current);
        window.scrollTo({ top: 0, behavior: "instant" });
      }
    };
    if (readFragment()) followFragment();
    window.addEventListener("popstate", followFragment);
    window.addEventListener("hashchange", followFragment);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(navigationFrame.current);
      window.removeEventListener("popstate", followFragment);
      window.removeEventListener("hashchange", followFragment);
      window.history.scrollRestoration = previousRestoration;
      if (previousHeight) {
        root.style.setProperty("--homepage-header-height", previousHeight);
      } else root.style.removeProperty("--homepage-header-height");
    };
  }, [moveTo]);

  const context = useMemo(
    () => ({
      selectedSkill,
      selectSkill,
      navigateTo,
      registerDossier,
      reportOpen,
      setGroupExpanded,
      isGroupExpanded,
    }),
    [
      selectedSkill,
      navigateTo,
      registerDossier,
      reportOpen,
      setGroupExpanded,
      isGroupExpanded,
    ],
  );

  return (
    <HomepageContext.Provider value={context}>
      {children}
    </HomepageContext.Provider>
  );
}

export function ExplorationLink({
  href,
  children,
  onClick,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  const { navigateTo } = useHomepageExploration();

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      !href.startsWith("#")
    ) {
      return;
    }
    const id = href.slice(1);
    if (!document.getElementById(id)) return;
    event.preventDefault();
    navigateTo(id);
  }

  return (
    <a {...props} href={href} onClick={handleClick}>
      {children}
    </a>
  );
}

export function Dossier({
  id,
  group,
  openLabel,
  closeLabel,
  children,
}: {
  id: string;
  group: DossierGroup;
  openLabel: string;
  closeLabel: string;
  children: ReactNode;
}) {
  const { registerDossier, reportOpen } = useHomepageExploration();
  const [expanded, setExpanded] = useState(false);
  const details = useRef<HTMLDetailsElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const desiredOpen = useRef(false);
  const animation = useRef<Animation | null>(null);
  const hydrated = useHydrated();

  const setOpen = useCallback(
    (open: boolean, animate = true) => {
      const element = details.current;
      const body = panel.current;
      const inner = content.current;
      if (!element || !body || !inner) return;
      if (
        desiredOpen.current === open &&
        element.open === open &&
        !animation.current
      ) {
        return;
      }

      const startHeight = element.open ? body.getBoundingClientRect().height : 0;
      animation.current?.cancel();
      animation.current = null;
      desiredOpen.current = open;
      setExpanded(open);
      reportOpen(id, open);
      body.inert = !open;
      element.classList.remove("dossier-flourish");

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (!animate || reducedMotion) {
        element.open = open;
        body.style.height = "";
        body.style.overflow = "";
        return;
      }

      element.open = true;
      body.style.height = `${startHeight}px`;
      body.style.overflow = "hidden";
      const targetHeight = open ? inner.getBoundingClientRect().height : 0;
      if (open) {
        // Restart only the decorative border and markers; text stays readable.
        void element.offsetWidth;
        element.classList.add("dossier-flourish");
      }
      body.style.height = `${targetHeight}px`;
      const transition = body.animate(
        [{ height: `${startHeight}px` }, { height: `${targetHeight}px` }],
        {
          duration: open ? 280 : 180,
          easing: "cubic-bezier(0.2, 0.65, 0.3, 1)",
        },
      );
      animation.current = transition;
      transition.onfinish = () => {
        if (animation.current !== transition) return;
        animation.current = null;
        element.open = desiredOpen.current;
        body.style.height = "";
        body.style.overflow = "";
      };
    },
    [id, reportOpen],
  );

  useEffect(() => {
    const unregister = registerDossier(id, { group, setOpen });
    if (details.current?.open) setOpen(true, false);
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const stopMotion = () => {
      if (query.matches) setOpen(desiredOpen.current, false);
    };
    query.addEventListener("change", stopMotion);
    return () => {
      unregister();
      query.removeEventListener("change", stopMotion);
      animation.current?.cancel();
    };
  }, [group, id, registerDossier, setOpen]);

  return (
    <details
      ref={details}
      id={`${id}-dossier`}
      className="dossier"
      data-expanded={expanded}
      data-enhanced={hydrated ? true : undefined}
      onToggle={() => {
        // Keep browser-native openings (for example Find in page) in sync.
        if (
          !animation.current &&
          details.current?.open !== desiredOpen.current
        ) {
          setOpen(Boolean(details.current?.open), false);
        }
      }}
    >
      <summary
        aria-controls={`${id}-content`}
        aria-expanded={hydrated ? expanded : undefined}
        onClick={(event) => {
          event.preventDefault();
          setOpen(!desiredOpen.current);
        }}
      >
        <span className="dossier-open-label">{openLabel}</span>
        <span className="dossier-close-label">{closeLabel}</span>
        <span className="dossier-toggle-icon" aria-hidden="true" />
      </summary>
      <div
        ref={panel}
        id={`${id}-content`}
        className="dossier-body"
        inert={hydrated && !expanded}
      >
        <div ref={content} className="dossier-content">
          {children}
        </div>
      </div>
    </details>
  );
}

export function ExpandAllControl({ group }: { group: DossierGroup }) {
  const { isGroupExpanded, setGroupExpanded } = useHomepageExploration();
  const hydrated = useHydrated();
  const expanded = isGroupExpanded(group);

  return (
    <button
      type="button"
      className="dossier-expand-all"
      hidden={!hydrated}
      onClick={() => setGroupExpanded(group, !expanded)}
      aria-label={`${expanded ? "Collapse" : "Expand"} all ${group === "experience" ? "experience achievements" : "project details"}`}
    >
      {expanded ? "Collapse all" : "Expand all"}
      <span aria-hidden="true">{expanded ? "−" : "+"}</span>
    </button>
  );
}
