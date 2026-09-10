"use client";

import {
  Users,
  Droplets,
  ShieldPlus,
  School,
  BriefcaseBusiness,
  Baby,
  House,
  BookOpen,
  SunMedium,
  HandCoins,
  Sparkles,
  HeartHandshake,
  Stethoscope,
  Landmark,
  Globe2,
  Tractor,
  WalletCards,
  HandHelping,
  Building2,
  Briefcase,
} from "lucide-react";
import { useState } from "react";
import styles from "./impact.module.css";

const impactData = {
  community: {
    label: "Community Leadership",
    accent: "#f59d32",
    cardBg: "#f5e3d4",
    cards: [
      { value: "13,200+", label: "Community volunteers", desc: "trained in multi-dimensional programmes", icon: Users },
      { value: "1,417+", label: "Village Development Committees", desc: "creating empowered community leaders", icon: Building2 },
      { value: "2,372", label: "specialised eco-system builders", desc: "trained in Health care, Animal welfare, Livelihoods & more", icon: HandHelping },
      { value: "14,135+", label: "women", desc: "empowered through capacity building across 1,417 SHGs", icon: HeartHandshake },
      { value: "6", label: "Farmer Producer Organisations", desc: "for farmer support system and ongoing training", icon: BriefcaseBusiness },
    ],
  },
  water: {
    label: "Water, Sanitation & Green Initiatives",
    accent: "#1f9ae2",
    cardBg: "#dfeef7",
    cards: [
      { value: "298,855", label: "lives", desc: "received access to clean drinking water through 763 drinking water schemes", icon: Droplets },
      { value: "177,080", label: "Individuals", desc: "received access to safe, individual toilets at home", icon: Baby },
      { value: "39,222", label: "Individual household toilets", desc: "built in rural homes", icon: House },
      { value: "437", label: "schools", desc: "supported with WASH facilities", icon: School },
      { value: "1503+", label: "hamlets", desc: "declared open defecation free (ODF)", icon: Landmark },
    ],
  },
  health: {
    label: "Health",
    accent: "#f59d32",
    cardBg: "#f4e2d0",
    cards: [
      { value: "549,895", label: "people", desc: "screened by Swades Mitras", icon: ShieldPlus },
      { value: "2,700+", label: "health volunteers", desc: "trained within the communities", icon: Users },
      { value: "146,655", label: "spectacles", desc: "delivered to rural doorsteps", icon: Sparkles },
      { value: "24,971", label: "cataract surgeries", desc: "conducted to restore sight", icon: Stethoscope },
      { value: "400+", label: "village health camps", desc: "screening & care for 19,000+ individuals", icon: HeartHandshake },
    ],
  },
  education: {
    label: "Education",
    accent: "#f2b928",
    cardBg: "#f7e8b0",
    cards: [
      { value: "317,705", label: "students", desc: "impacted through education efforts", icon: BookOpen },
      { value: "10,649", label: "students", desc: "supported through scholarship", icon: BookOpen },
      { value: "4,500+", label: "teachers", desc: "trained across multiple programmes", icon: Users },
      { value: "659+", label: "schools", desc: "supported with library set-up", icon: School },
      { value: "18,800+", label: "students", desc: "impacted with solar infra in 365+ schools", icon: SunMedium },
    ],
  },
  economy: {
    label: "Economic Development",
    accent: "#1fa76a",
    cardBg: "#dff2e7",
    cards: [
      { value: "Rs. 1260", label: "million", desc: "added to annual GDP through community livelihood initiatives", icon: WalletCards },
      { value: "50,800+", label: "entrepreneurs", desc: "empowered across livestock and farm initiatives", icon: Globe2 },
      { value: "10,500+", label: "youth", desc: "skilled through training programs", icon: Briefcase },
      { value: "103,000+", label: "farmers", desc: "trained through capacity-building programmes", icon: Tractor },
      { value: "21,352", label: "women", desc: "empowered across livelihood programmes", icon: HandCoins },
    ],
  },
};

const tabs = [
  "community",
  "water",
  "health",
  "education",
  "economy",
];

export default function Impact() {
  const [activeTab, setActiveTab] = useState("economy");
  const activeSection = impactData[activeTab];

  return (
    <section className={styles.section} id="aim">
      <div className={styles.container}>
        <h2 className={styles.title}>Our AIM </h2>

        <p className={styles.subtitle}>
          Every number represents a life touched. Over 600,000 lives have been positively impacted through Swades&apos; holistic interventions
        </p>

        <div className={styles.tabs}>
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`${styles.tab} ${activeTab === tab ? styles.tabActive : ""}`}
              style={
                activeTab === tab
                  ? { background: activeSection.accent, color: "#fff" }
                  : { background: "rgba(255,255,255,0.35)", color: "#1f2937" }
              }
            >
              {impactData[tab].label}
            </button>
          ))}
        </div>

        <div className={styles.grid}>
          {activeSection.cards.map((card, index) => {
            const Icon = card.icon;

            return (
              <article
                key={`${activeTab}-${index}`}
                className={styles.card}
                style={{ background: activeSection.cardBg }}
              >
                <div className={styles.number} style={{ color: activeSection.accent }}>
                  {card.value}
                </div>

                <div className={styles.cardText}>
                  <p className={styles.label}>{card.label}</p>
                  <p className={styles.desc}>{card.desc}</p>
                </div>

                <div className={styles.mediaWrap}>
                  <div className={styles.iconCanvas}>
                    <Icon className={styles.icon} />
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className={styles.footerAction}>
          <button type="button" className={styles.viewButton}>View Our AIM</button>
        </div>
      </div>
    </section>
  );
}
