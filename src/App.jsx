import { useState } from "react";
import Header from "./components/Header"
import { languages } from "./languages"

const App = () => {
  const languageElement = languages.map(language => {
    const styles = {
      backgroundColor: language.backgroundColor,
      color: language.color,
    };
    return (
      <span key={language.name} style={styles}>{language.name}</span>
    )
  })

  const [currentWord, setCurrentWord] = useState("react")
  const wordElement = currentWord.split("").map((letter, index) => {
    return (
      <span className="letter-box" key={index}>{letter.toUpperCase()}</span>
    )
  })


  return (
    <main>
      <Header />
      <section className="game-status">
        <h1>You win!</h1>
        <p>Well done🎉</p>
      </section>
      <section className="languages-chips">
        {languageElement}
      </section>
    </main>
  )
}
export default App