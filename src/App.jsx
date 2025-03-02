import './App.css'
import MyComp from './MyComp'
import JSXBasics from './JSXBasics'
import JSXChallenge from './JSXChallenge'
import JSXChallengeExtra from './JSXChallengeExtra'
import ClockTimer from './ClockTimer.jsx'

export default function() {
  // Component must be pure and have no side effects
  
  return (
    <>
      {/* This component must be pure */}
      {/* It must have no side effects */}
      {/* document.title = 'not allowed' */}
      {/* No exchanging data with an external system */}
      {/* <MyComp />*/}
      {/* <JSXChallengeExtra /> */}
      <ClockTimer />
    </>
  )
}
