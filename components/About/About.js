"use client";

import { useState } from "react";
import styles from "./About.module.css";
import { supabase } from "@/lib/supabaseClient";

export default function About() {
  const [supportType, setSupportType] = useState("donation");
  const [submission, setSubmission] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const cause = String(formData.get("cause") || "");

    if (!supabase) {
      setSubmission({
        type: "error",
        message: "Supabase is not configured. Check the project URL and publishable key in .env.local.",
      });
      return;
    }

    setIsSubmitting(true);
    setSubmission(null);

    try {
      if (formData.get("supportType") === "volunteer") {
        const volunteer = {
          name: String(formData.get("volunteerName") || "").trim(),
          email: String(formData.get("volunteerEmail") || "").trim(),
          mobile: String(formData.get("volunteerMobile") || "").trim(),
          address: String(formData.get("volunteerAddress") || "").trim(),
          cause,
        };
        const { error } = await supabase.from("volunteer_submissions").insert(volunteer);

        if (error) throw error;
        setSubmission({
          type: "success",
          message: `Thank you, ${volunteer.name}. Your volunteer form has been saved.`,
        });
      } else {
        const customAmount = String(formData.get("customAmount") || "").trim();
        const amountRupees = customAmount
          ? Number(customAmount)
          : Number(formData.get("amount"));
        const frequency = String(formData.get("frequency") || "");
        const donor = {
          donor_name: String(formData.get("donorName") || "").trim(),
          donor_email: String(formData.get("donorEmail") || "").trim(),
          cause,
          frequency,
          amount_rupees: amountRupees,
          volunteer_updates: formData.get("volunteerUpdates") === "on",
          status: "pending",
        };

        if (!Number.isSafeInteger(amountRupees) || amountRupees <= 0) {
          setSubmission({ type: "error", message: "Enter a valid donation amount in whole rupees." });
          return;
        }

        const { error } = await supabase.from("donations").insert(donor);

        if (error) throw error;
        setSubmission({
          type: "success",
          message: "Your donation details have been saved. Payment has not been collected yet.",
        });
      }
    } catch (error) {
      console.error("Could not save the form submission:", error);
      setSubmission({
        type: "error",
        message: "We could not save your details. Please try again in a moment.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

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
          {submission ? (
            <div
              className={styles.successMessage}
              role={submission.type === "error" ? "alert" : "status"}
              aria-live="polite"
            >
              {submission.type === "success" && (
                <span className={styles.successMark} aria-hidden="true">&#10003;</span>
              )}
              <h4>{submission.type === "success" ? "Thank you" : "Unable to submit"}</h4>
              <p>{submission.message}</p>
              {submission.type === "error" && (
                <button type="button" className={`btn btn-navy ${styles.donate}`} onClick={() => setSubmission(null)}>
                  Try again
                </button>
              )}
            </div>
          ) : (
          <form className={styles.form} onSubmit={handleSubmit}>
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
                <input
                  type="radio"
                  name="supportType"
                  value="donation"
                  checked={supportType === "donation"}
                  onChange={() => setSupportType("donation")}
                />
                <span>Donate</span>
              </label>
              <label className={styles.choice}>
                <input
                  type="radio"
                  name="supportType"
                  value="volunteer"
                  checked={supportType === "volunteer"}
                  onChange={() => setSupportType("volunteer")}
                />
                <span>Volunteer</span>
              </label>
            </div>

            <div className={styles.donationFields}>
              <label className={styles.label} htmlFor="donor-name">Name</label>
              <input className={styles.field} id="donor-name" name="donorName" type="text" autoComplete="name" placeholder="Your name" required={supportType === "donation"} />

              <label className={styles.label} htmlFor="donor-email">Email</label>
              <input className={styles.field} id="donor-email" name="donorEmail" type="email" autoComplete="email" placeholder="you@example.com" required={supportType === "donation"} />

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

              <span className={styles.label}>Choose an amount in Indian rupees (INR)</span>
              <div className={styles.amounts}>
                {[1000, 2000, 3000, 4000, 5000].map((amount, index) => (
                  <label key={amount} className={styles.amount}>
                    <input type="radio" name="amount" value={amount} defaultChecked={index === 0} />
                    <span>₹{amount.toLocaleString("en-IN")}</span>
                  </label>
                ))}
              </div>

              <label className={styles.customAmount}>
                <input type="number" name="customAmount" min="1" step="1" placeholder="Other amount in ₹" />
                <span>₹ INR</span>
              </label>

              <label className={styles.volunteerNote}>
                <input type="checkbox" name="volunteerUpdates" />
                <span>Also tell me about volunteering opportunities</span>
              </label>

              <button type="submit" className={`btn btn-navy ${styles.donate}`} disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save donation details"} <span aria-hidden="true">♥</span>
              </button>
            </div>

            <div className={styles.volunteerFields}>
              <label className={styles.label} htmlFor="volunteer-name">Name</label>
              <input className={styles.field} id="volunteer-name" name="volunteerName" type="text" autoComplete="name" placeholder="Your name" required={supportType === "volunteer"} />

              <label className={styles.label} htmlFor="volunteer-email">Email</label>
              <input className={styles.field} id="volunteer-email" name="volunteerEmail" type="email" autoComplete="email" placeholder="you@example.com" required={supportType === "volunteer"} />

              <label className={styles.label} htmlFor="volunteer-mobile">Mobile number</label>
              <input className={styles.field} id="volunteer-mobile" name="volunteerMobile" type="tel" autoComplete="tel" placeholder="Your mobile number" required={supportType === "volunteer"} />

              <label className={styles.label} htmlFor="volunteer-address">Address</label>
              <textarea className={`${styles.field} ${styles.address}`} id="volunteer-address" name="volunteerAddress" autoComplete="street-address" placeholder="Your address" rows="3" required={supportType === "volunteer"} />

              <button type="submit" className={`btn btn-navy ${styles.donate}`} disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Submit"}
              </button>
            </div>
          </form>
          )}
        </div>
      </div>
    </section>
  );
}
