import {
  BookOpen,
  HeartPulse,
  Landmark,
  Leaf,
  Sprout,
  Waves,
} from "lucide-react";
import Image from "next/image";
import styles from "./Dream.module.css";
import { getSiteImageUrl } from "@/lib/siteImages";

const dreamPoints = [
  { title: "Swacch (Clean)", description: "Each house has a toilet, drainage system, follows waste segregation and disposal practices and has access to clean drinking water through a tap at home. Village is ODF", icon: Waves, side: "left", position: "top" },
  { title: "Sundar (Beautiful)", description: "The village has good internal roads, painted homes and adequate solar street-lights, making communities feel safe", icon: Landmark, side: "left", position: "middle" },
  { title: "Swasth (Healthy)", description: "The village has access to primary healthcare, institutional delivery and knowledge and access to vaccination", icon: HeartPulse, side: "left", position: "bottom" },
  { title: "Sakshar (Literate)", description: "Schools are places of joyful learning, with proper WASH facilities so that no child, especially no girl, drops out", icon: BookOpen, side: "right", position: "top" },
  { title: "Samruddh (Prosper)", description: "Each household is able to make a dignified living with multiple sources of livelihood", icon: Sprout, side: "right", position: "middle" },
  { title: "Shristi (Climate)", description: "Each village embraces climate-conscious living through efforts in waste management, solar energy adoption, soil and water conservation", icon: Leaf, side: "right", position: "bottom" },
];

function DreamPoint({ point }) {
  const Icon = point.icon;
  return (
    <article className={`${styles.point} ${styles[point.side]} ${styles[point.position]}`}>
      <div className={styles.iconWrap} aria-hidden="true"><Icon size={48} strokeWidth={2.4} /></div>
      <div><h3>{point.title}</h3><p>{point.description}</p></div>
    </article>
  );
}

export default function Dream() {
  return (
    <section className={styles.section} id="dream" aria-labelledby="dream-title">
      <div className={styles.container}>
        <h2 className={styles.title} id="dream-title"> Dream Village</h2>
        <p className={styles.subtitle}>A Dream Village is an empowered, self-sustaining community with individual household water, sanitation, health, and economic stability.</p>
        <div className={styles.villageLayout}>
          {dreamPoints.filter((point) => point.side === "left").map((point) => <DreamPoint key={point.title} point={point} />)}
          <div className={styles.feature}>
            <Image
              src={getSiteImageUrl("DREAM VILLAGE/Village.jpeg")}
              alt="Community members celebrating in a dream village"
              width={1024}
              height={1024}
              className={styles.featureImage}
            />
          </div>
          {dreamPoints.filter((point) => point.side === "right").map((point) => <DreamPoint key={point.title} point={point} />)}
        </div>
        <a className={styles.button} href="#about">Know More</a>
      </div>
    </section>
  );
}