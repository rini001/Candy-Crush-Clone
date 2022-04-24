import React from 'react'
import styles from './ScoreBoard.module.css'
export  const ScoreBoard = ({score}) => {
  return (
    <div className={styles.scoreBoard}><h1>Total Score:{score}</h1></div>
  )
}
