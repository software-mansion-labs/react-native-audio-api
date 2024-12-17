import React, { useCallback } from 'react';

import styles from './styles.module.css';
import { useAudio } from '../AudioProvider';

const OnOffSwitch = () => {
  const { isActive, setIsActive } = useAudio();

  const onClick = useCallback(() => {
    if (isActive) {
      setIsActive(false);
    } else {
      setIsActive(true);
    }
  }, [isActive, setIsActive]);

  return (
    <button type="button" onClick={onClick} className={styles.buttonContainer}>
      <div className={styles.innerBezel}>
        <div
          className={styles.switchOuter}
          style={{
            backgroundColor: isActive
              ? 'var(--swm-green-light-100)'
              : 'var(--swm-red-light-100)',
          }}
        >
          {!isActive && <div className={styles.switchTop} />}
          <div
            className={styles.switchInner}
            style={{
              background:
                isActive === true
                  ? 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(255, 255, 255, 0.4)) 100%'
                  : 'linear-gradient(180deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0)) 100%',
            }}
          >
            <div
              className={isActive ? styles.switchTextOn : styles.switchTextOff}
            >
              I
            </div>
            <div
              className={isActive ? styles.switchTextOff : styles.switchTextOn}
            >
              O
            </div>
          </div>
          {isActive && <div className={styles.switchBottom} />}
        </div>
      </div>
    </button>
  );
};

export default OnOffSwitch;

/* <div
className={styles.buttonInner}
style={{
  backgroundColor: isActive
    ? 'var(--swm-green-light-60)'
    : 'var(--swm-red-dark-110)',
  paddingTop: !isActive ? '0' : '7.5px',
  paddingBottom: !isActive ? '7.5px' : '0',
}}
>
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
</div> */
