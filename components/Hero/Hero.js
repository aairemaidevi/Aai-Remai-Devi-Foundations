"use client";

import Image from "next/image";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero} id="top">
      <div className={styles.container}>
        {/* Foundation banner */}
        <div className={styles.videoWrapper}>
          <Image
            src="/Main img.jpeg"
            alt="Aai Remai Devi Foundation community gathering"
            width={1153}
            height={768}
            className={styles.heroImage}
            priority
          />
        </div>

        {/* Main Tagline */}
        <h2 className={styles.headline}>
          Committed to building a better village, a stronger community and a brighter future through education, service and social development.
        </h2>

        {/* Impact Numbers Grid */}
        <div className={styles.statsGrid}>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>11+</span>
            <span className={styles.statLabel}>Years</span>
          </div>

          <div className={styles.statItem}>
            <span className={styles.statNumber}>5 <small>Districts</small></span>
            <span className={styles.statLabel}>17 Blocks</span>
          </div>

          <div className={styles.statItem}>
            <span className={styles.statNumber}>13,200+</span>
            <span className={styles.statLabel}>Community Volunteers</span>
          </div>

          <div className={styles.statItem}>
            <span className={styles.statNumber}>1.19 Mn</span>
            <span className={styles.statLabel}>Reached</span>
          </div>

          <div className={styles.statItem}>
            <span className={styles.statNumber}>668K</span>
            <span className={styles.statLabel}>Lives Impacted</span>
          </div>

          <div className={styles.statItem}>
            <span className={styles.statNumber}>1.3 Mn</span>
            <span className={styles.statLabel}>Unique Interventions Delivered</span>
          </div>
        </div>

        {/* Bottom Centered Logo */}
        <div className={styles.logoWrap}>
          <Image
            src="/BATCH.jpg"
            alt="Aai Remai Devi Foundation Logo"
            width={160}
            height={160}
            className={styles.centerLogo}
            priority
          />
        </div>
      </div>
    </section>
  );
}