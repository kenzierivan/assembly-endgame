import { useState } from "react";
import Header from "./components/Header"
import { languages } from "./languages"
import { clsx } from 'clsx';
import { getFarewellText, getRandomWord } from "./utils";
import Confetti from 'react-confetti'

const App = () => {
  //State values
  const [currentWord, setCurrentWord] = useState(() => getRandomWord())
  const [guessedLetters, setGuessedLetters] = useState([]);

  //Derived values
  const wrongGuessCount = guessedLetters.filter(letter => !currentWord.includes(letter)).length;
  const isGameWon = currentWord.split("").every(letter => guessedLetters.includes(letter));
  const isGameLost = wrongGuessCount > languages.length - 1;
  const isGameOver = isGameWon || isGameLost;
  const lastGuessedLetter = guessedLetters[guessedLetters.length - 1];
  const isLastGuessIncorrect = lastGuessedLetter && !currentWord.includes(lastGuessedLetter);

  //Static values
  const alphabets = "abcdefghijklmnopqrstuvwxyz";

  const languageElement = languages.map((language, index) => {
    const isLanguageLost = index < wrongGuessCount
    const styles = {
      backgroundColor: language.backgroundColor,
      color: language.color,
    };
    return (
      <span key={language.name} style={styles} className={isLanguageLost ? "lost" : null}>{language.name}</span>
    )
  })


  const wordElement = currentWord.split("").map((letter, index) => {
    const shouldRevealLetter = isGameLost || guessedLetters.includes(letter);
    return (
      <span className="letter-box" key={index}>{shouldRevealLetter ? letter.toUpperCase() : ""}</span>
    )
  })


  function guessLetter(letter) {
    setGuessedLetters(prev => prev.includes(letter) ? prev : [...prev, letter]);
  }

  function startNewGame() {
    setCurrentWord(() => getRandomWord());
    setGuessedLetters([]);
  }
  const alphabetElement = alphabets.split("").map(letter => {
    const isGuessed = guessedLetters.includes(letter);
    const isCorrect = currentWord.includes(letter);
    const styles = {
      backgroundColor: isGuessed ? (isCorrect ? "#10A95B" : "#ec664eff") : "#E0E0E0",
    }
    return (
      <button style={styles} disabled={isGameOver} aria-disabled={guessedLetters.includes(letter)} onClick={() => guessLetter(letter)} key={letter}>{letter.toUpperCase()}</button>
    )
  })

  const gameStatusClass = clsx("game-status", {
    won: isGameWon,
    lost: isGameLost,
    farewell: !isGameOver && isLastGuessIncorrect
  })

  return (
    <main>
      {isGameWon ? <Confetti /> : null}
      <Header />
      <section aria-live="polite" className={gameStatusClass}>
        {isGameOver ? (
          isGameWon ? (
            <>
              <h1>You win!</h1>
              <p>Well done🎉</p>
            </>
          ) : (
            <>
              <h1>Game over!</h1>
              <p>You lose! Better start learning Assembly😭</p>
            </>
          )
        ) : (
          isLastGuessIncorrect ? (
            <h1>{getFarewellText(languages[wrongGuessCount - 1].name)}</h1>
          ) : (
            null
          )
        )} 
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
      <div className="button-container">
        {isGameOver ? <button onClick={startNewGame} className="new-game">New Game</button> : null}
      </div>
    </main>
  )
}
export default App