import { useState } from 'react'
import './App.css'

const Header = ({ text }) => <h1>{text}</h1>

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
)

const StatisticsLine = ({ title, value }) => (
  <tr>
    <td>{title}</td>  
    <td>
      {value}
    </td>
  </tr>
)

const Statistics = ({ good, neutral, bad }) => {
  const calculateAverage = () => {
    const total = good + neutral + bad
    if (total === 0) return 0
    return (good - bad) / total
  }

  const calculatePositive = () => {
    const total = good + neutral + bad
    if (total === 0) return 0
    return (good / (good + neutral + bad) * 100) + " %"
  }

  if (good === 0 && neutral === 0 && bad === 0) {
    return <p>No feedback given</p>
  }

  return (
    <table>
      <tbody>
        <StatisticsLine title="good" value={good} />
        <StatisticsLine title="neutral" value={neutral} />
        <StatisticsLine title="bad" value={bad} />
        <StatisticsLine title="all" value={good + neutral + bad} />
        <StatisticsLine title="average" value={calculateAverage()} />
        <StatisticsLine title="positive" value={calculatePositive()} />
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header text="give feedback" />
      <div style={{ display: 'flex', gap: 5 }}>
        <Button handleClick={() => setGood(good + 1)} text="good" />
        <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
        <Button handleClick={() => setBad(bad + 1)} text="bad" />
      </div>
      <Header text="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
