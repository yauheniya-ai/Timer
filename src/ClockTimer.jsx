import { useState, useEffect, useRef } from "react";
import timerSound from '/timer-sound.mp3'

function getTime() {
    let date = new Date()
    return [date.getHours(), date.getMinutes(), date.getSeconds()]
}

export default function Clock() {
    const [now, setNow] = useState(getTime())
    const [mt, setMt] = useState(true)
    const [initialMinutes, setInitialMinutes] = useState(5)
    const [timerMinutes, setTimerMinutes] = useState(5)
    const [timerSeconds, setTimerSeconds] = useState(0)
    const [isTimerRunning, setIsTimerRunning] = useState(false)
    const audioRef = useRef(null)

    useEffect(() => {
        audioRef.current = new Audio(timerSound)
    }, [])

    useEffect(() => {
        const clockInterval = setInterval(() => setNow(getTime()), 1000)
        return () => clearInterval(clockInterval)
    }, [])

    useEffect(() => {
        let timerInterval
        if (isTimerRunning) {
            timerInterval = setInterval(() => {
                if (timerSeconds > 0) {
                    setTimerSeconds(timerSeconds - 1)
                } else if (timerMinutes > 0) {
                    setTimerMinutes(timerMinutes - 1)
                    setTimerSeconds(59)
                } else {
                    setIsTimerRunning(false)
                    playSound()
                }
            }, 1000)
        }
        return () => clearInterval(timerInterval)
    }, [isTimerRunning, timerMinutes, timerSeconds])

    function handleClockFormat(choice) {
        setMt(choice)
    }

    function startTimer() {
        setTimerMinutes(initialMinutes)
        setTimerSeconds(0)
        setIsTimerRunning(true)
    }

    function resetTimer() {
        setIsTimerRunning(false)
        setTimerMinutes(initialMinutes)
        setTimerSeconds(0)
    }

    function playSound() {
        if (audioRef.current) {
            audioRef.current.currentTime = 0  // Reset to beginning
            audioRef.current.play().catch(error => console.log('Audio playback failed', error))
        }
    }

    let min = now[1].toString().padStart(2, '0')
    let sec = now[2].toString().padStart(2, '0')
    let hour = now[0]
    if (hour > 12 && !mt) hour = hour - 12
    hour = hour.toString().padStart(2, '0')

    return (
        <>
          <div style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
          }}>
            <div style={{
              border: '2px solid crimson',
              borderRadius: '50%',
              padding: '20px',
              width: '300px',
              height: '300px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <h2>⏰ Clock</h2>
              <h1>{hour} : {min} : {sec}</h1>
              <div>
                <button disabled={!mt} onClick={() => handleClockFormat(false)}>12H</button>
                <button disabled={mt} onClick={() => handleClockFormat(true)}>24H</button>
              </div>
            </div>
          </div>
      
          <div style={{
            position: 'absolute',
            bottom: '20px',
            left: '20px',
          }}>
            <div style={{
              border: '2px solid lime',
              borderRadius: '15px',
              padding: '20px',
              width: '300px',
            }}>
              <h2>⏲️ Timer</h2>
              <h1>{timerMinutes.toString().padStart(2, '0')} : {timerSeconds.toString().padStart(2, '0')}</h1>
              <input 
                type="number" 
                value={initialMinutes}
                onChange={(e) => {
                  const value = e.target.value;
                  const parsedValue = parseInt(value);
                  setInitialMinutes(isNaN(parsedValue) ? 0 : parsedValue);
                }}
                disabled={isTimerRunning}
                min="0"
              />
              <div>
                <button onClick={startTimer} disabled={isTimerRunning}>Start</button>
                <button onClick={resetTimer}>Reset</button>
                <button onClick={playSound}>Sound</button>
              </div>
            </div>
          </div>
        </>
      )
      
    
}
