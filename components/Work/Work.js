"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import styles from "./Work.module.css";

const PILLARS = [
  {
    title: "Economic Development",
    desc: "Empowering rural youth and farmers with skills training, dairy farming, poultry, and farm-based livelihood programs.",
    image: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=1000&q=85",
  },
  {
    title: "Our Approach",
    desc: "Our 360-degree development model operates across WASH, Health, Education, and Economic Development to create sustainable villages.",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1000&q=85",
  },
  {
    title: "Water and Sanitation",
    desc: "Providing 360-degree clean drinking water taps and household toilets to eliminate open defecation and water scarcity across rural Maharashtra.",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1000&q=85",
  },
  {
    title: "Health",
    desc: "Discover better healthcare access through medical camps, screenings, nutrition support, and referrals for every family.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1000&q=85",
  },
];

export default function Work() {
  const [activeIndex, setActiveIndex] = useState(PILLARS.length);
  const [isPaused, setIsPaused] = useState(false);
  const trackRef = useRef(null);

  const move = (direction) => setActiveIndex((index) => index + direction);

  useEffect(() => {
    if (isPaused) return undefined;
    const timer = window.setInterval(() => move(1), 5200);
    return () => window.clearInterval(timer);
  }, [isPaused]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;
    const handleTransitionEnd = () => {
      if (activeIndex >= PILLARS.length * 2) setActiveIndex(PILLARS.length);
      if (activeIndex < PILLARS.length) setActiveIndex(PILLARS.length * 2 - 1);
    };
    track.addEventListener("transitionend", handleTransitionEnd);
    return () => track.removeEventListener("transitionend", handleTransitionEnd);
  }, [activeIndex]);

  const cards = [...PILLARS, ...PILLARS, ...PILLARS];

  return (
    <section className={styles.section} id="work" aria-labelledby="work-title">
      <div className={styles.heading}>
        <h2 className={styles.kicker} id="work-title">Our Work</h2>
        <p className={styles.title}>Transforming Rural Lives Through Holistic Change</p>
      </div>
      <div className={styles.carousel} onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
        <div className={styles.track} ref={trackRef} style={{ "--active-index": activeIndex }}>
          {cards.map((card, index) => (
            <article className={styles.card} key={`${card.title}-${index}`}>
              <img src={card.image} alt="" className={styles.image} />
              <div className={styles.scrim} />
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{card.title}</h3>
                <p className={styles.cardDesc}>{card.desc}</p>
                <a href="#about" className={styles.cardLink}>Read More <span aria-hidden="true">↗</span></a>
              </div>
            </article>
          ))}
        </div>
      </div>
      <div className={styles.controls}>
        <button type="button" className={styles.control} onClick={() => move(-1)} aria-label="Previous project"><ArrowLeft size={22} strokeWidth={1.5} /></button>
        <button type="button" className={styles.control} onClick={() => move(1)} aria-label="Next project"><ArrowRight size={22} strokeWidth={1.5} /></button>
      </div>
    </section>
  );
}
