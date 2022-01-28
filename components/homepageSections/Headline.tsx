import styles from './homepage.module.css'
export default function Headline() {
  return (
    <section className={styles.section}>
      <p>
        Welcome to <strong>Recipe Saver!</strong>
      </p>
      <p>
        Here you are able to upload your personal recipes and access them
        whenever you need.
      </p>
    </section>
  )
}
