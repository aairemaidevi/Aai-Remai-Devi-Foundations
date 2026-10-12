import { ArrowUpRight, Leaf } from "lucide-react";
import Link from "next/link";
import styles from "./Stories.module.css";
import { committeeMembers } from "@/lib/committeeMembers";

export default function Stories() {
	return (
		<section className={styles.section} id="people-behind-the-promise" aria-labelledby="committee-title">
			<div className={styles.container}>
				<div className={styles.heading}>
					<div>
						<span className={styles.eyebrow}><Leaf size={14} /> Our people</span>
						<h2 id="committee-title">The people behind the promise</h2>
					</div>
					<p>
						Local voices, shared responsibility, and a steady belief that every
						village already carries the wisdom it needs to grow.
					</p>
				</div>

				<div className={styles.rule} aria-hidden="true" />

				<div className={styles.memberGrid}>
					{committeeMembers.map((member, index) => (
						<Link href={`/people/${member.slug}`} className={`${styles.member} ${styles[`tone${index % 3}`]}`} key={member.slug}>
							<div className={styles.photoFrame}>
								<img className={styles.photo} src={member.image} alt={`${member.name} committee portrait`} />
								<div className={styles.number}>{member.initials}</div>
							</div>
							<div className={styles.memberDetails}>
								<div className={styles.designation}>
									<span className={styles.designationLabel}>Designation</span>
									<strong>{member.role}</strong>
									{member.marathiRole && <span className={styles.marathiDesignation}>{member.marathiRole}</span>}
								</div>
								<h3>{member.name}</h3>
							</div>
							<ArrowUpRight className={styles.arrow} size={20} strokeWidth={1.8} aria-hidden="true" />
						</Link>
					))}
				</div>

				<p className={styles.note}>Select a member to read their message to the community.</p>
			</div>
		</section>
	);
}
