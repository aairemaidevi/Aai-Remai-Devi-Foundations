import { ArrowUpRight, Leaf } from "lucide-react";
import styles from "./Stories.module.css";

const committeeMembers = [
	{ name: "Committee Member 01", role: "Chairperson", initials: "01", image: "/BATCH.jpg" },
	{ name: "Committee Member 02", role: "Community Secretary", initials: "02", image: "/BATCH.jpg" },
	{ name: "Committee Member 03", role: "Treasurer", initials: "03", image: "/BATCH.jpg" },
	{ name: "Committee Member 04", role: "Health & Wellbeing", initials: "04", image: "/BATCH.jpg" },
	{ name: "Committee Member 05", role: "Education Lead", initials: "05", image: "/BATCH.jpg" },
	{ name: "Committee Member 06", role: "Village Representative", initials: "06", image: "/BATCH.jpg" },
];

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
						<article className={`${styles.member} ${styles[`tone${index % 3}`]}`} key={member.role}>
							<div className={styles.photoFrame}>
								<img className={styles.photo} src={member.image} alt={`${member.name} committee portrait`} />
								<div className={styles.number}>{member.initials}</div>
							</div>
							<div className={styles.memberDetails}>
								<span>{member.role}</span>
								<h3>{member.name}</h3>
							</div>
							<ArrowUpRight className={styles.arrow} size={20} strokeWidth={1.8} aria-hidden="true" />
						</article>
					))}
				</div>

				<p className={styles.note}>Committee names can be updated together in the <strong>committeeMembers</strong> list.</p>
			</div>
		</section>
	);
}
