import Header from "./components/Header"

const App = () => {
  return (
    <main>
      <Header />
      <section className="game-status">
        <h1>You win!</h1>
        <p>Well done🎉</p>
      </section>
    </main>
  )
}
export default App