import CurrentRecipes from './homepageSections/CurrentRecipes'
import Headline from './homepageSections/Headline'
import Recipe from './interfaces/recipe'

const HomePage = ({ recipes }: { recipes: Recipe[] }) => {
  return (
    <>
      <h1>Home Page</h1>
      <Headline />
      <CurrentRecipes recipes={recipes} />
    </>
  )
}

export default HomePage
