import React, { useCallback } from 'react';

import styles from './styles.module.css';
import { AudioAsset, useAudio } from '../AudioProvider';

const OnOffSwitch = () => {
  const { playAsset, isActive, setIsActive } = useAudio();

  const onClick = useCallback(() => {
    if (isActive) {
      setIsActive(false);
    } else {
      setIsActive(true);
      setTimeout(() => {
        playAsset(AudioAsset.SimpleClick);
      }, 0);
    }
  }, [isActive, setIsActive, playAsset]);

  return (
    <button type="button" onClick={onClick} className={styles.buttonContainer}>
      <div
        className={styles.buttonInner}
        style={{
          backgroundColor: isActive
            ? 'var(--swm-green-light-60)'
            : 'var(--swm-red-dark-110)',
          paddingTop: !isActive ? '0' : '7.5px',
          paddingBottom: !isActive ? '7.5px' : '0',
        }}
      >
        <div className={styles.buttonTextWrapper}>
          <div className={isActive ? styles.buttonText : styles.buttonTextOn}>
            O
          </div>
          <div style={{ height: '5px' }} />
          <div className={isActive ? styles.buttonTextOn : styles.buttonText}>
            I
          </div>
        </div>
        <div
          className={styles.buttonMid}
          style={{
            backgroundColor: isActive
              ? 'var(--swm-green-dark-100)'
              : 'var(--swm-red-dark-100)',
            borderTopLeftRadius: !isActive ? '0' : '7px',
            borderTopRightRadius: !isActive ? '0' : '7px',
            borderBottomLeftRadius: !isActive ? '7px' : '0',
            borderBottomRightRadius: !isActive ? '7px' : '0',
          }}
        />
      </div>
    </button>
  );
};

export default OnOffSwitch;
