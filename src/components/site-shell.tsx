"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
} from "react";
import { Arrow } from "./design";

const mobileNavigationQuery = "(max-width: 700px)";
const links = [
  ["/", "Home"],
  ["/about", "About"],
  ["/projects", "Projects"],
  ["/contact", "Contact"],
];

function subscribeToMobileNavigation(onChange: () => void) {
  const query = window.matchMedia(mobileNavigationQuery);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function getMobileNavigationSnapshot() {
  return window.matchMedia(mobileNavigationQuery).matches;
}

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const navigation = useRef<HTMLElement>(null);
  const isMobile = useSyncExternalStore(
    subscribeToMobileNavigation,
    getMobileNavigationSnapshot,
    () => false,
  );

  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 },
    );
    nodes.forEach((node) => {
      node.classList.add("reveal-ready");
      observer.observe(node);
    });
    return () => {
      observer.disconnect();
      nodes.forEach((node) => node.classList.remove("reveal-ready"));
    };
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;

    const query = window.matchMedia(mobileNavigationQuery);

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    }

    function handleOutsidePointer(event: PointerEvent) {
      if (!(event.target instanceof Node)) return;
      if (
        navigation.current?.contains(event.target) ||
        menuButton.current?.contains(event.target)
      ) {
        return;
      }
      setMenuOpen(false);
    }

    function handleBreakpointChange(event: MediaQueryListEvent) {
      if (!event.matches) setMenuOpen(false);
    }

    window.addEventListener("keydown", handleEscape);
    document.addEventListener("pointerdown", handleOutsidePointer);
    query.addEventListener("change", handleBreakpointChange);

    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.removeEventListener("pointerdown", handleOutsidePointer);
      query.removeEventListener("change", handleBreakpointChange);
    };
  }, [menuOpen]);

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  }

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <div className="shell header-inner">
          <Link
            className="wordmark"
            href="/#main"
            onClick={() => setMenuOpen(false)}
            onNavigate={(event) => {
              if (pathname === "/") {
                event.preventDefault();
                scrollToTop();
              }
            }}
            aria-label="Sanhith home"
          >
            <span className="brand-mark">s.</span>
            <span>
              sanhith<span className="purple">.</span>
            </span>
          </Link>
          <button
            ref={menuButton}
            type="button"
            className="menu-toggle"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="main-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="menu-icon" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </button>
          <nav
            ref={navigation}
            id="main-navigation"
            aria-label="Main navigation"
            aria-hidden={isMobile && !menuOpen ? true : undefined}
            inert={isMobile && !menuOpen}
            className={menuOpen ? "navigation open" : "navigation"}
          >
            {links.map(([href, label], index) => (
              <Link
                key={href}
                style={{ "--nav-index": index } as CSSProperties}
                href={`${href}#main`}
                onNavigate={(event) => {
                  if (pathname === href) {
                    event.preventDefault();
                    scrollToTop();
                  }
                }}
                aria-current={pathname === href ? "page" : undefined}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
          </nav>
          <Link className="header-contact" href="/contact">
            Let’s talk <Arrow />
          </Link>
        </div>
      </header>
      <main id="main" key={pathname} className="page-content">
        {children}
      </main>
      <footer className="shell site-footer">
        <div>
          <Link
            className="footer-brand"
            href="/#main"
            onNavigate={(event) => {
              if (pathname === "/") {
                event.preventDefault();
                scrollToTop();
              }
            }}
          >
            sanhith<span className="purple">.</span>
          </Link>
          <p>A little curiosity goes a long way.</p>
        </div>
        <div className="footer-right">
          <a href="#main" className="text-link">
            Back to top <span aria-hidden="true">↑</span>
          </a>
          <span>© {new Date().getFullYear()} Sanhith</span>
        </div>
      </footer>
    </>
  );
}
