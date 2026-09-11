"use client";

import Image from "next/image";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero} id="top">
      <div className={styles.container}>
        <div className={styles.videoWrapper}>
          <Image
            src="/main.png"
            alt="Aai Remai Devi Education And Social Foundation community gathering"
            width={1536}
            height={1024}
            className={styles.heroImage}
            priority
          />
        </div>
      </div>
    </section>
  );
}