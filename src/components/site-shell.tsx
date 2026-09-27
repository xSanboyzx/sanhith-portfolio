"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Arrow } from "./design";

const links = [
  ["/", "Home"],
  ["/about", "About"],
  ["/projects", "Projects"],
  ["/contact", "Contact"],
];
export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
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
    function escape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    }
    if (menuOpen) window.addEventListener("keydown", escape);
    return () => window.removeEventListener("keydown", escape);
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
            className="menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="main-navigation"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "Close −" : "Menu +"}
          </button>
          <nav
            id="main-navigation"
            aria-label="Main navigation"
            className={menuOpen ? "navigation open" : "navigation"}
          >
            {links.map(([href, label]) => (
              <Link
                key={href}
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
