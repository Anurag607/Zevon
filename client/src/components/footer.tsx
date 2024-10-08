import React from "react";
import Image from "next/image";
import styles from "../../src/styles/footer.module.scss";

export default function Footer() {
  return (
    <footer className={`${styles["footer"]}`}>
      <section id="contact" className={styles.contact}>
        <div id="footlogo" className={styles.footlogo}>
          <h2>Zevon</h2>
        </div>
        <br />
        <div id="contact_number" className={styles["contact_number"]}>
          <Image src="/icon-phone.svg" alt="phone" width={18} height={18} />
          <span>Phone: +1-543-123-4567</span>
        </div>
        <div id="contact_email" className={styles["contact_email"]}>
          <Image src="/icon-email.svg" alt="email" width={20} height={16} />
          <span>Email: zevon@gmail.com</span>
        </div>
        <br />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "1rem",
            marginLeft: "-0.75rem",
          }}
        >
          <a href="#">
            <Image
              className={styles["contact_ico"]}
              src="/f.svg"
              alt="facebook"
              width={40}
              height={40}
            />
          </a>
          <a href="#">
            <Image
              className={styles["contact_ico"]}
              src="/i.svg"
              alt="insta"
              width={40}
              height={40}
            />
          </a>
          <a href="#">
            <Image
              className={styles["contact_ico"]}
              src="/t.svg"
              alt="twitter"
              width={40}
              height={40}
            />
          </a>
          <a href="#">
            <Image
              className={styles["contact_ico"]}
              src="/l.svg"
              alt="linkedin"
              width={40}
              height={40}
            />
          </a>
        </div>
      </section>
      <section id="newsletter" className={styles["newsletter"]}>
        <h1 style={{ margin: "0" }}>NEWSLETTER</h1>
        <p style={{ fontSize: "1rem" }}>
          To receieve your weekly fashion tips, <br />
          sign up to our weekly newsletter. We&apos;ll never send <br />
          you spam or pass on your eamil address
        </p>
        <br />
        <form className={styles.Subform}>
          <input
            type="email"
            id="email"
            className={styles["email"]}
            name="email"
            placeholder="example@gmail.com"
          />
          <input
            type="submit"
            value="Subscribe"
            id="submit"
            className={styles["submit"]}
          />
        </form>
      </section>
    </footer>
  );
}
