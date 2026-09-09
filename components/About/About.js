import styles from "./About.module.css";

export default function About() {
  return (
    <section className={styles.section} id="get-involved">
      <div className={`container ${styles.layout}`}>
        <div className={styles.mediaPanel}>
          <video className={styles.media} autoPlay muted loop playsInline>
            <source src="/TP.mp4" type="video/mp4" />
          </video>
          <div className={styles.mediaShade} />
          <div className={styles.mediaContent}>
            <span className={styles.mediaEyebrow}>आई रेमाई देवी</span>
            <h2 className={styles.title}>Empowering rural lives in India</h2>
            <p className={styles.text}>
              Community-led change that helps families build a stronger,
              more hopeful future.
            </p>
            <div className={styles.pillarsRow}>
              <span>सेवा — Service</span>
              <span>समर्पण — Dedication</span>
              <span>विकास — Development</span>
            </div>
          </div>
        </div>

        <div className={styles.card} id="donate">
          <h3 className={styles.cardTitle}>Get Involved</h3>
          <p className={styles.cardText}>
            Choose a cause, give what you can, or join us as a volunteer.
          </p>
          <form className={styles.form} action="#" method="post">
            <label className={styles.label} htmlFor="cause">Choose your cause</label>
            <select className={styles.field} id="cause" name="cause" defaultValue="education">
              <option value="education">Education</option>
              <option value="livelihoods">Livelihoods</option>
              <option value="health">Health and wellbeing</option>
              <option value="women">Women-led communities</option>
            </select>

            <span className={styles.label}>How would you like to help?</span>
            <div className={styles.choiceRow}>
              <label className={styles.choice}>
                <input type="radio" name="supportType" value="donation" defaultChecked />
                <span>Donate</span>
              </label>
              <label className={styles.choice}>
                <input type="radio" name="supportType" value="volunteer" />
                <span>Volunteer</span>
              </label>
            </div>

            <div className={styles.donationFields}>
              <span className={styles.label}>Choose a donation frequency</span>
              <div className={styles.choiceRow}>
                <label className={styles.choice}>
                  <input type="radio" name="frequency" value="once" defaultChecked />
                  <span>Give once</span>
                </label>
                <label className={styles.choice}>
                  <input type="radio" name="frequency" value="monthly" />
                  <span>Give monthly <b aria-hidden="true">♥</b></span>
                </label>
              </div>

              <span className={styles.label}>Choose an amount</span>
              <div className={styles.amounts}>
                {[1000, 2000, 3000, 4000, 5000].map((amount, index) => (
                  <label key={amount} className={styles.amount}>
                    <input type="radio" name="amount" value={amount} defaultChecked={index === 0} />
                    <span>₹{amount}</span>
                  </label>
                ))}
              </div>

              <label className={styles.customAmount}>
                <input type="number" name="customAmount" min="1" placeholder="OTHER AMOUNT" />
                <span>INR</span>
              </label>

              <label className={styles.volunteerNote}>
                <input type="checkbox" name="volunteerUpdates" />
                <span>Also tell me about volunteering opportunities</span>
              </label>

              <button type="submit" className={`btn btn-navy ${styles.donate}`}>
                Continue <span aria-hidden="true">♥</span>
              </button>
            </div>

            <div className={styles.volunteerFields}>
              <label className={styles.label} htmlFor="volunteer-name">Name</label>
              <input className={styles.field} id="volunteer-name" name="volunteerName" type="text" autoComplete="name" placeholder="Your name" />

              <label className={styles.label} htmlFor="volunteer-email">Email</label>
              <input className={styles.field} id="volunteer-email" name="volunteerEmail" type="email" autoComplete="email" placeholder="you@example.com" />

              <label className={styles.label} htmlFor="volunteer-mobile">Mobile number</label>
              <input className={styles.field} id="volunteer-mobile" name="volunteerMobile" type="tel" autoComplete="tel" placeholder="Your mobile number" />

              <label className={styles.label} htmlFor="volunteer-address">Address</label>
              <textarea className={`${styles.field} ${styles.address}`} id="volunteer-address" name="volunteerAddress" autoComplete="street-address" placeholder="Your address" rows="3" />

              <button type="submit" className={`btn btn-navy ${styles.donate}`}>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
