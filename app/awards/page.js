import Link from "next/link";
import { ArrowLeft, Award, Sparkles } from "lucide-react";
import { AwardCard } from "@/components/Award/Award";
import { getAwards } from "@/lib/awards";
import styles from "./page.module.css";

export const revalidate = 60;

export const metadata = {
  title: "Awards & Recognition | Aai Remai Devi Foundation",
  description:
    "A collection of awards and recognition celebrating the work of Aai Remai Devi Education And Social Foundation.",
};

export default async function AwardsPage() {
  const { awards, error } = await getAwards();

  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <Link href="/#awards" className={styles.backLink}>
          <ArrowLeft size={17} aria-hidden="true" />
          Back to awards
        </Link>

        <header className={styles.hero}>
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}>
              <Sparkles size={15} aria-hidden="true" />
              A journey recognised
            </span>
            <h1>Awards &amp; recognition</h1>
            <p>
              A celebration of the shared effort, care and commitment behind
              every step forward in our community.
            </p>
          </div>
          <div className={styles.heroMark} aria-hidden="true">
            <Award size={74} strokeWidth={1.1} />
            <span>With gratitude</span>
          </div>
          <div className={styles.heroCount}>
            <span>{String(awards.length).padStart(2, "0")}</span>
            <span>{awards.length === 1 ? "story" : "stories"}</span>
          </div>
        </header>

        <section className={styles.gallery} aria-labelledby="gallery-title">
          <div className={styles.galleryHeading}>
            <div>
              <span className={styles.sectionLabel}>Moments that matter</span>
              <h2 id="gallery-title">Honouring the journey</h2>
            </div>
            <p>Each recognition belongs to the people who make this work possible.</p>
          </div>

          {error ? (
            <p className={styles.message} role="alert">{error}</p>
          ) : awards.length > 0 ? (
            <div className={styles.grid}>
              {awards.map((award, index) => (
                <AwardCard award={award} index={index} key={award.name} />
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <span className={styles.emptyIcon}><Award size={27} /></span>
              <h3>The next chapter is waiting to be celebrated.</h3>
              <p>
                Add award images to the <strong>AWARD</strong> folder in the
                <strong> site-images</strong> Supabase Storage bucket. Image
                filenames will appear as their story titles here.
              </p>
            </div>
          )}
        </section>

        <footer className={styles.footerNote}>
          <span aria-hidden="true" />
          <p>Every milestone is made possible by a community moving forward together.</p>
          <span aria-hidden="true" />
        </footer>
      </div>
    </main>
  );
}
