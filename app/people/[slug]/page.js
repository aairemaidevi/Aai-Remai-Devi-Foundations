import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { notFound } from "next/navigation";
import MemberPortrait from "@/components/MemberPortrait";
import { getCommitteeMember, committeeMembers } from "@/lib/committeeMembers";
import styles from "./page.module.css";

export function generateStaticParams() {
  return committeeMembers.map((member) => ({ slug: member.slug }));
}

export default function PersonPage({ params }) {
  const member = getCommitteeMember(params.slug);

  if (!member) {
    notFound();
  }

  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <Link href="/#people-behind-the-promise" className={styles.backLink}>
          <ArrowLeft size={17} aria-hidden="true" />
          Back to our people
        </Link>

        <div className={styles.profile}>
          <div className={styles.photoPanel}>
            <MemberPortrait
              src={member.image}
              alt={`${member.name} portrait`}
              initials={member.initials}
              className={styles.photo}
            />
            <span className={styles.number}>{member.initials}</span>
          </div>

          <article className={styles.message}>
            <span className={styles.eyebrow}>{member.institution || "Aai Ramai Social Institution"}</span>
            <p className={styles.sequence}>The people behind the promise</p>
            <h1>{member.name}</h1>
            <div className={styles.designationBlock}>
              <span className={styles.designationLabel}>Designation</span>
              <p className={styles.designation}>{member.role}</p>
              <p className={styles.marathiDesignation}>{member.marathiRole}</p>
            </div>
            {member.marathiName && <p className={styles.marathiName}>{member.marathiName}</p>}
            <div className={styles.rule} />
            <div className={styles.copy}>
              {member.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </article>
        </div>

        <nav className={styles.profileNav} aria-label="Committee members">
          {committeeMembers.map((item) => (
            <Link href={`/people/${item.slug}`} key={item.slug} className={item.slug === member.slug ? styles.active : ""}>
              {item.role}
              <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          ))}
        </nav>
      </div>
    </main>
  );
}