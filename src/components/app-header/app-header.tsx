import styles from './app-header.module.css';

export default function AppHeader() {
  return (
    <header className={styles.header}>
      <h1 className={styles.project_name}>spa-card-testjob</h1>
      <h2 className={styles.project_tagline}>
        List of films with the word "love" in the title! 🎥
      </h2>
      <a
        href="https://github.com/LedyBacer/spa-card-testjob"
        className={styles.btn}
      >
        View on GitHub
      </a>
    </header>
  );
}
