import Link from "next/link";
import { ArrowRight, ArrowUpRight, Award as AwardIcon, Images } from "lucide-react";
import { getAwards } from "@/lib/awards";
import styles from "./Award.module.css";

export default async function Award() {
  const { awards, error } = await getAwards();

  return (
    <section className={styles.section} id="awards" aria-labelledby="awards-title">
      <div className={styles.container}>
        <div className={styles.sectionHeading}>
          <div className={styles.headingCopy}>
            <span className={styles.sectionEyebrow}>
              <AwardIcon size={15} aria-hidden="true" />
              A journey recognised
            </span>
            <h2 id="awards-title">
              Awards <span className={styles.titleHighlight}>&amp; Recognition</span>
            </h2>
          </div>
          <p>
            Every milestone reflects the people, ideas and shared effort behind
            the journey of our villages.
          </p>
        </div>

        {error ? (
          <p className={styles.sectionMessage} role="alert">{error}</p>
        ) : awards.length > 0 ? (
          <>
            <div className={styles.carouselViewport}>
              <div
                className={styles.carouselTrack}
                style={{ "--carousel-duration": `${Math.max(24, awards.length * 8)}s` }}
              >
                <div className={styles.carouselGroup}>
                  {awards.map((award, index) => (
                    <AwardCard award={award} index={index} key={award.name} />
                  ))}
                </div>
                <div className={styles.carouselGroup} aria-hidden="true">
                  {awards.map((award, index) => (
                    <AwardCard award={award} index={index} key={`duplicate-${award.name}`} decorative />
                  ))}
                </div>
              </div>
            </div>
            <div className={styles.sectionFooter}>
              <span>{String(awards.length).padStart(2, "0")} community stories</span>
              <Link href="/awards" className={styles.allAwardsLink}>
                Explore all recognitions <ArrowRight size={16} />
              </Link>
            </div>
          </>
        ) : (
          <div className={styles.sectionEmpty}>
            <AwardIcon size={27} aria-hidden="true" />
            <h3>Every community milestone deserves to be celebrated.</h3>
            <p>
              Award photos added to the <strong>AWARD</strong> folder in the
              Supabase <strong>site-images</strong> bucket will appear here.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export function AwardCard({ award, index, decorative = false }) {
  return (
    <Link
      href={`/awards/${award.slug}`}
      className={styles.card}
      tabIndex={decorative ? -1 : undefined}
    >
      <div className={styles.cardImageFrame}>
        <img
          src={award.image}
          alt={`${award.title} — ${award.category}`}
          className={styles.cardImage}
          loading="lazy"
          decoding="async"
        />
        <span className={styles.cardIndex}>{String(index + 1).padStart(2, "0")}</span>
        <span className={styles.cardOpen}><ArrowUpRight size={19} /></span>
      </div>
      <div className={styles.cardCopy}>
        <span className={styles.cardCategory}>{award.category}</span>
        <h3>{award.title}</h3>
        <p>{award.summary}</p>
        <span className={styles.readMore}>View story <ArrowUpRight size={15} /></span>
      </div>
    </Link>
  );
}

export function AwardGallery({ awards, activeSlug }) {
  return (
    <section className={styles.gallery} aria-labelledby="award-gallery-title">
      <div className={styles.galleryHeading}>
        <div>
          <span className={styles.galleryEyebrow}><Images size={15} /> From our journey</span>
          <h2 id="award-gallery-title">More moments to celebrate</h2>
        </div>
        <p>Swipe or scroll to explore more community milestones.</p>
      </div>
      <div className={styles.galleryTrack} tabIndex={0} aria-label="Award and community photo gallery">
        {awards.map((award) => (
          <Link
            key={award.slug}
            href={`/awards/${award.slug}`}
            className={`${styles.galleryItem} ${award.slug === activeSlug ? styles.galleryItemActive : ""}`}
            aria-current={award.slug === activeSlug ? "page" : undefined}
          >
            <img src={award.image} alt={award.title} loading="lazy" decoding="async" />
            <span>{award.title}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
