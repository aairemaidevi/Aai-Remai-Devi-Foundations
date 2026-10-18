import styles from "./BranchDivider.module.css";

export default function BranchDivider({ label }) {
  return (
    <div className={styles.divider} aria-hidden="true">
      <span className={styles.line} />
      <span className={styles.label}>{label}</span>
      <span className={styles.line} />
    </div>
  );
}
  