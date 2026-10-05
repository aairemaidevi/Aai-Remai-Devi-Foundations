import Image from "next/image";
import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer} id="donate">
      <div className={`container ${styles.top}`}>
        <div className={styles.brandCol}>
          <div className={styles.brandRow}>
            <Image
              src="/BATCH.jpg"
              alt="Aai Remai Devi Education And Social Foundation logo"
              width={44}
              height={44}
              className={styles.logo}
            />
            <span className={styles.brandHi}>आई रेमाई देवी</span>
          </div>
          <p className={styles.tagline}>सेवा · संस्कार · समर्पण · विकास</p>
          <p className={styles.cin}>CIN: U88900MH2026NPL474190</p>
        </div>

        <div className={styles.col}>
          <h4>Who We Are</h4>
          <a href="#">Our Story</a>
          <a href="#">Our Team</a>
          <Link href="/awards">Awards &amp; Recognition</Link>
        </div>

        <div className={styles.col}>
          <h4>Our Work</h4>
          <a href="#">Water &amp; Sanitation</a>
          <a href="#">Health</a>
          <a href="#">Education</a>
          <a href="#">Economic Development</a>
        </div>

        <div className={styles.col}>
          <h4>Get Involved</h4>
          <a href="#">CSR</a>
          <a href="#">Volunteer</a>
          <a href="#">Careers</a>
          <a href="#">Donate</a>
        </div>
      </div>

      <div className={`container ${styles.bottom}`}>
        <span>© {new Date().getFullYear()} Aai Remai Devi Education And Social Foundation. All rights reserved.</span>
        <span>Registered under Section 8, Maharashtra</span>
      </div>
    </footer>
  );
}
