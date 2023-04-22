import React, { useState } from 'react';
import styles from './RockPaperScissors.module.css';

const CHOICES = [
  { id: 'rock', name: 'Rock', imageUrl: './images/rps/rock.png' },
  { id: 'paper', name: 'Paper', imageUrl: './images/rps/paper.png' },
  { id: 'scissors', name: 'Scissors', imageUrl: './images/rps/scissors.png' },
];

const RockPaperScissors = () => {
  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);

  const handlePlayerChoice = (choice) => {
    const computerChoice = CHOICES[Math.floor(Math.random() * CHOICES.length)];
    setPlayerChoice(choice);
    setComputerChoice(computerChoice);
    setAnimate(true);
    setTimeout(() => setAnimate(false), 1000);
  };

  const getResult = () => {
    if (playerChoice && computerChoice) {
      if (playerChoice.id === computerChoice.id) {
        return 'Tie!';
      } else if (
        (playerChoice.id === 'rock' && computerChoice.id === 'scissors') ||
        (playerChoice.id === 'paper' && computerChoice.id === 'rock') ||
        (playerChoice.id === 'scissors' && computerChoice.id === 'paper')
      ) {
        return 'You win!';
      } else {
        return 'Computer wins!';
      }
    }
    return 'Choose ONE!';
  };

  const result = getResult();

  const [animate, setAnimate] = useState(false);

  return (
    <div className={styles.banner}>
      <div className={styles.game}>
        <div className={styles.choices}>
          {CHOICES.map((choice) => (
            <button key={choice.id} onClick={() => handlePlayerChoice(choice)}>
              <img
                src={choice.imageUrl}
                alt={choice.name}
                style={{ width: '50px', height: '50px' }}
              />
            </button>
          ))}
        </div>
        <div className={styles.result}>{`${result}`}</div>
        <div className={styles.resultsContainer}>
          <div className={`${styles.player} ${animate ? styles.animate : ''}`}>
            {playerChoice && (
              <>
                <img
                  src={playerChoice.imageUrl}
                  alt={playerChoice.name}
                  style={{ width: '50px', height: '50px' }}
                />
              </>
            )}
          </div>
          <div className={`${styles.computer} ${animate ? styles.animate : ''}`}>
            {computerChoice && (
              <>
                <img
                  src={computerChoice.imageUrl}
                  alt={computerChoice.name}
                  style={{ width: '50px', height: '50px', transform: 'scaleX(-1)' }}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RockPaperScissors;