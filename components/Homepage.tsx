import CurrentRecipes from './homepageSections/CurrentRecipes'

const HomePage = () => {
  return (
    <>
      <h1>Home Page</h1>
      <section>
        <p>
          Welcome to <strong>Recipe Saver!</strong>
        </p>
        <p>
          Here you are able to upload your personal recipes and access them
          whenever you need.
        </p>
      </section>
      <CurrentRecipes />
    </>
  )
}

export default HomePage
