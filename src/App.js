//TODO: STEP 1 - Import the useState hook.
import React, { useState, useEffect } from "react";
import "./App.css";
import BottomRow from "./BottomRow";

function App() {
  //TODO: STEP 2 - Establish your application's state with some useState hooks.  You'll need one for the home score and another for the away score.
  const [homeScore, updateHomeScore] = useState(0)
  const [awayScore, updateAwayScore] = useState(0)
  const [timer, updateTimer] = useState(15*60)
  const [quarter, updateQuarter] = useState(1)
  const [timerRunning, updateTimerRunning] = useState(false)

  useEffect(() => {
    if(timerRunning) {
      const interval = setInterval(() => {
          updateTimer(timer => timer-1)
        }, 1000);
      return () => clearInterval(interval)
    }
  }, [timerRunning])

  useEffect(() => {
    if(timer<1) {
      updateTimer(15*60)
      updateQuarter(quarter+1)
    } 
  }, [timer, quarter])

  return (
    <div className="container">
      <section className="scoreboard">
        <div className="topRow">
          <div className="home">
            <h2 className="home__name">Lions</h2>

            {/* TODO STEP 3 - We need to change the hardcoded values in these divs to accept dynamic values from our state. */}

            <div className="home__score">{homeScore}</div>
          </div>
          <div className="timer" onClick={() => updateTimerRunning(!timerRunning)}>
            {`${(Math.floor(timer/60)).toString().padStart(2,'0')}:${(timer%60).toString().padStart(2,'0')}`}
          </div>
          <div className="away">
            <h2 className="away__name">Tigers</h2>
            <div className="away__score">{awayScore}</div>
          </div>
        </div>
        <BottomRow timer={timer} quarter={quarter}/>
      </section>
      <section className="buttons">
        <div className="homeButtons">
          {/* TODO STEP 4 - Now we need to attach our state setter functions to click listeners. */}
          <button className="homeButtons__touchdown" onClick = {() => (updateHomeScore(homeScore + 7))}>Home Touchdown</button>
          <button className="homeButtons__fieldGoal" onClick = {() => (updateHomeScore(homeScore + 3))}>Home Field Goal</button>
        </div>
        <div className="awayButtons">
          <button className="awayButtons__touchdown" onClick = {() => (updateAwayScore(awayScore + 7))}>Away Touchdown</button>
          <button className="awayButtons__fieldGoal" onClick = {() => (updateAwayScore(awayScore + 3))}>Away Field Goal</button>
        </div>
      </section>
    </div>
  );
}

export default App;
