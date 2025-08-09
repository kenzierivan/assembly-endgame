import { useState } from "react";
import Header from "./components/Header"
import { languages } from "./languages"

const App = () => {
  //State values
  const [currentWord, setCurrentWord] = useState("react")
  const [guessedLetters, setGuessedLetters] = useState([]);

  //Derived values
  const wrongGuessCount = guessedLetters.filter(letter => !currentWord.includes(letter)).length;

  //Static values
  const alphabets = "abcdefghijklmnopqrstuvwxyz";

  const languageElement = languages.map(language => {
    const styles = {
      backgroundColor: language.backgroundColor,
      color: language.color,
    };
    return (
      <span key={language.name} style={styles}>{language.name}</span>
    )
  })


  const wordElement = currentWord.split("").map((letter, index) => {
    const isGuessed = guessedLetters.includes(letter);
    return (
      <span className="letter-box" key={index}>{isGuessed ? letter.toUpperCase() : ""}</span>
    )
  })


  function guessLetter(letter) {
    setGuessedLetters(prev => prev.includes(letter) ? prev : [...prev, letter]);
  }
  const alphabetElement = alphabets.split("").map(letter => {
    const isGuessed = guessedLetters.includes(letter);
    const isCorrect = currentWord.includes(letter);
    const styles = {
      backgroundColor: isGuessed ? (isCorrect ? "#10A95B" : "#ec664eff") : "#E0E0E0",
    }
    return (
      <button style={styles} onClick={() => guessLetter(letter)} key={letter}>{letter.toUpperCase()}</button>
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
      <section className="word-box">
        {wordElement}
      </section>
      <section className="alphabets-chips">
        {alphabetElement}
      </section>
    </main>
  )
}
export default App