"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./Header.module.css";

const NAV = [
  { label: "Our Aim", href: "#aim", items: null },
  { label: "Our Work", href: "#work", items: null },
  { label: "Dream Village", href: "#dream", items: null },
  { label: "The people behind the promise", href: "#people-behind-the-promise", items: null },
  { label: "Get Involved", href: "#get-involved", items: null },
];

export default function Header() {
  const [open, setOpen] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const shouldShow = currentY < lastScrollY.current || currentY < 80;

      setIsVisible(shouldShow);
      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${isVisible ? styles.visible : styles.hidden}`}>
      <div className={styles.bar}>
        <a href="#top" className={styles.brand}>
          <Image
            src="/Village.jpeg"
            alt="Aai Remai Devi Education And Social Foundation logo"
            width={84}
            height={84}
            className={styles.logo}
            priority
          />
          <span className={styles.brandText}>
            <span className={styles.brandHi}>Aai Remai Devi</span>
            <span className={styles.brandSub}>Education And Social Foundation</span>
          </span>
        </a>

        <nav className={styles.nav} aria-label="Primary">
          {NAV.map((n) => (
            <div
              key={n.label}
              className={styles.navItem}
              onMouseEnter={() => n.items && setOpen(n.label)}
              onMouseLeave={() => n.items && setOpen(null)}
            >
              {n.items ? (
                <>
                  <button
                    type="button"
                    className={styles.navLink}
                    aria-expanded={open === n.label}
                    onClick={() => {
                      if (typeof window !== "undefined") {
                        window.location.hash = n.href;
                      }
                      setOpen(open === n.label ? null : n.label);
                    }}
                  >
                    {n.label}
                    <span className={styles.caret}>▾</span>
                  </button>
                  <div
                    className={`${styles.dropdown} ${
                      open === n.label ? styles.dropdownOpen : ""
                    }`}
                  >
                    {n.items.map((item) => (
                      <a key={item.label} href={item.href} className={styles.dropdownLink}>
                        {item.label}
                      </a>
                    ))}
                  </div>
                </>
              ) : (
                <a href={n.href} className={styles.navLinkAnchor}>
                  {n.label}
                </a>
              )}
            </div>
          ))}
        </nav>

        <a href="#donate" className={styles.donateBtn}>
          Donate <span className={styles.heart}>♥</span>
        </a>

        <button
          className={styles.burger}
          aria-label="Toggle menu"
          onClick={() => setMobileOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {mobileOpen ? (
        <div className={styles.mobileMenu}>
          {NAV.map((n) => (
            <div key={n.label} className={styles.mobileGroup}>
              {n.items ? (
                <>
                  <a href={n.href} className={styles.mobileTitle}>{n.label}</a>
                  <div className={styles.mobileItems}>
                    {n.items.map((item) => (
                      <a href={item.href} key={item.label}>
                        {item.label}
                      </a>
                    ))}
                  </div>
                </>
              ) : (
                <a href={n.href} className={styles.mobileTitle}>{n.label}</a>
              )}
            </div>
          ))}
          <a href="#donate" className={styles.mobileDonateBtn}>
            Donate ♥
          </a>
        </div>
      ) : null}
    </header>
  );
}