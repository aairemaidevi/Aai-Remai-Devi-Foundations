"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { getSiteImageUrl } from "@/lib/siteImages";
import styles from "./Work.module.css";

const PILLARS = [
  {
    title: "Economic Development",
    desc: "Empowering rural youth and farmers with skills training, dairy farming, poultry, and farm-based livelihood programs.",
    image: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=1000&q=85",
    stages: [
      {
        label: "Before",
        title: "Limited livelihood opportunities",
        description:
          "Rural families may have limited access to local employment, practical training and dependable ways to earn an income.",
        image:
          "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=85",
        imageAlt: "Rural agricultural fields before livelihood initiatives",
      },
      {
        label: "In progress",
        title: "Building skills and opportunity",
        description:
          "Training and livelihood initiatives can help young people and farmers explore skills in agriculture, dairy farming, poultry and related work.",
        image:
          "https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=1000&q=85",
        imageAlt: "Farmland and agricultural work as livelihood initiatives develop",
      },
      {
        label: "After",
        title: "Working toward sustainable livelihoods",
        description:
          "With stronger skills and access to livelihood opportunities, families can work toward more resilient incomes and a stronger local economy.",
        image:
          "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1000&q=85",
        imageAlt: "Harvested crops representing sustainable rural livelihoods",
      },
    ],
  },
  {
    title: "Rural Development",
    desc: "A long-awaited road to Aai Remai Devi Temple, completed through a community-focused CSR initiative.",
    image: getSiteImageUrl("OUR WORK/ROAD/ROAD.jpeg"),
    project: "road-development",
  },
  {
    title: "Water and Sanitation",
    desc: "Providing 360-degree clean drinking water taps and household toilets to eliminate open defecation and water scarcity across rural Maharashtra.",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1000&q=85",
    stages: [
      {
        label: "Before",
        title: "Everyday water and sanitation needs",
        description:
          "Limited access to clean water and household sanitation can make daily routines harder and affect community health.",
        image:
          "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1000&q=85",
        imageAlt: "Water source representing community water and sanitation needs",
      },
      {
        label: "In progress",
        title: "Improving access and awareness",
        description:
          "Water access and sanitation initiatives focus on practical infrastructure and everyday habits that support healthier communities.",
        image:
          "https://images.unsplash.com/photo-1527100673774-cce25eafaf7f?auto=format&fit=crop&w=1000&q=85",
        imageAlt: "Water infrastructure as access improvements are underway",
      },
      {
        label: "After",
        title: "A healthier everyday environment",
        description:
          "Reliable clean water and household sanitation can help families build healthier routines and a cleaner living environment.",
        image:
          "https://images.unsplash.com/photo-1530053969600-caed2596d242?auto=format&fit=crop&w=1000&q=85",
        imageAlt: "Clean water representing a healthier community environment",
      },
    ],
  },
  {
    title: "Health",
    desc: "Discover better healthcare access through medical camps, screenings, nutrition support, and referrals for every family.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1000&q=85",
    stages: [
      {
        label: "Before",
        title: "Healthcare closer to home",
        description:
          "For rural families, finding timely health information, screening and care can be difficult when services are far away.",
        image:
          "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1000&q=85",
        imageAlt: "Healthcare professional representing the need for accessible care",
      },
      {
        label: "In progress",
        title: "Bringing community care together",
        description:
          "Community medical camps, screenings, nutrition support and referrals can help connect families with useful health services.",
        image:
          "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1000&q=85",
        imageAlt: "Healthcare team providing care during a community health initiative",
      },
      {
        label: "After",
        title: "Supporting healthier families",
        description:
          "Better access to health information and care helps families take informed steps toward wellbeing and a healthier community.",
        image:
          "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1000&q=85",
        imageAlt: "Health professional supporting community wellbeing",
      },
    ],
  },
];

const ROAD_STAGES = [
  {
    label: "Before",
    title: "A long-pending need",
    description:
      "For 18 years, paving the road leading to Aai Remai Devi Temple remained pending. In the monsoon, water made the rough stretch difficult for villagers to use.",
    image: "/road-before.png",
    imageAlt: "The unpaved, waterlogged road to Aai Remai Devi Temple before the work",
  },
  {
    label: "Work in progress",
    title: "Building a stronger way forward",
    description:
      "With CSR funding, Aai Remai Devi Educational and Social Institution (Regd.) began the roadwork, including construction of an RCC culvert.",
    image: "/road-in-progress.png",
    imageAlt: "RCC culvert and road paving work underway",
  },
  {
    label: "Completed",
    title: "A safer route to the temple",
    description:
      "The paving and RCC culvert work are complete, giving the village a stronger, more reliable road to the temple.",
    image: "/road-after.png",
    imageAlt: "The completed paved road and RCC culvert near the temple",
  },
];

export default function Work() {
  const [activeIndex, setActiveIndex] = useState(PILLARS.length);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const trackRef = useRef(null);
  const dialogRef = useRef(null);

  const move = (direction) => setActiveIndex((index) => index + direction);

  useEffect(() => {
    if (selectedProject && dialogRef.current && !dialogRef.current.open) {
      dialogRef.current.showModal();
    }
  }, [selectedProject]);

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
            <article
              className={`${styles.card} ${styles.projectCard}`}
              key={`${card.title}-${index}`}
            >
              <img src={card.image} alt="" className={styles.image} />
              <div className={styles.scrim} />
              {card.project ? (
                <button
                  type="button"
                  className={styles.cardOpen}
                  aria-label={`Read more about ${card.title}`}
                  onClick={() => setSelectedProject(card)}
                />
              ) : (
                <button
                  type="button"
                  className={styles.cardOpen}
                  aria-label={`Read more about ${card.title}`}
                  onClick={() => setSelectedProject(card)}
                />
              )}
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{card.title}</h3>
                <p className={styles.cardDesc}>{card.desc}</p>
                {card.project ? (
                  <span className={styles.cardLink}>Read More <span aria-hidden="true">↗</span></span>
                ) : (
                  <a href="#about" className={styles.cardLink}>Read More <span aria-hidden="true">↗</span></a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
      <div className={styles.controls}>
        <button type="button" className={styles.control} onClick={() => move(-1)} aria-label="Previous project"><ArrowLeft size={22} strokeWidth={1.5} /></button>
        <button type="button" className={styles.control} onClick={() => move(1)} aria-label="Next project"><ArrowRight size={22} strokeWidth={1.5} /></button>
      </div>
      <dialog
        ref={dialogRef}
        className={styles.projectDialog}
        aria-labelledby="project-story-title"
        onClose={() => setSelectedProject(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
      >
        <div className={styles.story}>
          <div className={styles.storyHeader}>
            <div>
              {selectedProject?.project ? (
                <>
                  <p className={styles.storyEyebrow}>Our work · Rural development</p>
                  <h2 className={styles.storyTitle} id="project-story-title">
                    A long-awaited road, completed together.
                  </h2>
                  <p className={styles.storyIntro}>
                    We are proud to share the completion of paving work on the
                    road leading to Aai Remai Devi Temple—a project that had
                    remained pending for 18 years. Aai Remai Devi Educational and
                    Social Institution (Regd.) completed the work through CSR
                    funding.
                  </p>
                </>
              ) : selectedProject ? (
                <>
                  <p className={styles.storyEyebrow}>Our work · {selectedProject.title}</p>
                  <h2 className={styles.storyTitle} id="project-story-title">
                    {selectedProject.title}
                  </h2>
                  <p className={styles.storyIntro}>{selectedProject.desc}</p>
                </>
              ) : null}
            </div>
            <button
              type="button"
              className={styles.closeButton}
              aria-label="Close project story"
              onClick={() => dialogRef.current?.close()}
            >
              <X size={21} />
            </button>
          </div>
          {selectedProject?.project ? (
            <>
              <div className={styles.timeline}>
                {ROAD_STAGES.map((stage) => (
                  <article className={styles.timelineRow} key={stage.label}>
                    <div className={styles.stagePhoto}>
                      <img src={stage.image} alt={stage.imageAlt} />
                      <span className={styles.stageBadge}>{stage.label}</span>
                    </div>
                    <div className={styles.stageCopy}>
                      <p className={styles.stageEyebrow}>The journey</p>
                      <h3>{stage.title}</h3>
                      <p>{stage.description}</p>
                    </div>
                  </article>
                ))}
              </div>
              <div className={styles.storyClosing}>
                <h3>More than a road—it is a beginning.</h3>
                <p>
                  This milestone marks an important step towards meeting our
                  village’s essential needs through our own initiatives and
                  resources, without having to seek assistance from others. It is
                  the beginning of our commitment to the development, welfare and
                  progress of our community, and we look forward to many more
                  meaningful efforts in the future.
                </p>
              </div>
            </>
          ) : selectedProject ? (
            <div className={styles.timeline}>
              {selectedProject.stages.map((stage) => (
                <article className={styles.timelineRow} key={stage.label}>
                  <div className={styles.stagePhoto}>
                    <img src={stage.image} alt={stage.imageAlt} />
                    <span className={styles.stageBadge}>{stage.label}</span>
                  </div>
                  <div className={styles.stageCopy}>
                    <p className={styles.stageEyebrow}>{selectedProject.title}</p>
                    <h3>{stage.title}</h3>
                    <p>{stage.description}</p>
                  </div>
                </article>
              ))}
            </div>
          ) : null}
        </div>
      </dialog>
    </section>
  );
}
