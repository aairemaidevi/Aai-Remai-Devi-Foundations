import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Award, Sparkles } from "lucide-react";
import { notFound } from "next/navigation";
import { AwardGallery } from "@/components/Award/Award";
import { getAwards } from "@/lib/awards";
import styles from "./page.module.css";

export const revalidate = 60;

export async function generateMetadata({ params }) {
  const { awards } = await getAwards();
  const award = awards.find((item) => item.slug === params.slug);

  if (!award) {
    return { title: "Award story | Aai Remai Devi Foundation" };
  }

  return {
    title: `${award.title} | Awards & Recognition`,
    description: award.summary,
  };
}

export default async function AwardDetailPage({ params }) {
  const { awards, error } = await getAwards();
  const award = awards.find((item) => item.slug === params.slug);

  if (!award && !error) {
    notFound();
  }

  if (error) {
    return (
      <main className={styles.page}>
        <div className={styles.shell}>
          <Link href="/awards" className={styles.backLink}>
            <ArrowLeft size={17} aria-hidden="true" />
            Back to awards
          </Link>
          <p className={styles.message} role="alert">{error}</p>
        </div>
      </main>
    );
  }

  const awardNumber = String(awards.findIndex((item) => item.slug === award.slug) + 1).padStart(2, "0");

  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <Link href="/#awards" className={styles.backLink}>
          <ArrowLeft size={17} aria-hidden="true" />
          Back to awards
        </Link>

        <section className={styles.feature} aria-labelledby="award-title">
          <div className={styles.imageFrame}>
            <img src={award.image} alt={`${award.title} — ${award.category}`} className={styles.image} />
            <span className={styles.imageCount}>{awardNumber} <span>/ {String(awards.length).padStart(2, "0")}</span></span>
          </div>

          <article className={styles.story}>
            <span className={styles.eyebrow}><Sparkles size={15} /> A community milestone</span>
            <p className={styles.category}>{award.category}</p>
            <h1 id="award-title">{award.title}</h1>
            <p className={styles.summary}>{award.summary}</p>
            <div className={styles.rule} />
            <div className={styles.body}>
              {award.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
            <p className={styles.thankYou}><Award size={18} /> With gratitude to everyone who makes this work possible.</p>
            <Link href="/#awards" className={styles.allStories}>
              Back to all award stories <ArrowUpRight size={16} />
            </Link>
          </article>
        </section>

        <AwardGallery awards={awards} activeSlug={award.slug} />
      </div>
    </main>
  );
}
