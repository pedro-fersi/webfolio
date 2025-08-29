import styles from "./Home.module.css";

export default function Home() {
  return (
    <section className={styles.hero}>
      <div className={styles.textBlock}>
        <h1 className={styles.title}>
          Design&nbsp;<span className={styles.amp}>&amp;</span><br />
          Videomaker
        </h1>
        <p className={styles.subtitle}>
          Descubra sua verdadeira identidade e mostre sua marca ao mundo!
        </p>
      </div>

      <div className={styles.bigName} aria-hidden="true">
        PEDRO FERSI
      </div>
    </section>
  );
}
