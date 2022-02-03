import styles from './homepage.module.css'
export default function Headline() {
  return (
    <section className={styles.section}>
      <h1>Welcome to Recipe Saver!</h1>
      <p>
        Here you are able to upload your personal recipes and access them
        whenever you need.
      </p>
    </section>
  )
}
