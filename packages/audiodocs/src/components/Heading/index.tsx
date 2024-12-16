import React from 'react';

import HomepageButton from '@site/src/components/HomepageButton';
import styles from './styles.module.css';
import { AudioAsset, useAudio } from '../AudioProvider';
import OnOffSwitch from '../OnOffSwitch';

const Heading: React.FC = () => {
  const audio = useAudio();

  return (
    <div className={styles.heading}>
      <h1 className={styles.headingLabel}>
        <span>React Native</span>
        <span>
          Audio API
          <OnOffSwitch />
        </span>
      </h1>
      <h2 className={styles.subheadingLabel}>
        All You need digital audio workstation for react native.
      </h2>
      <div className={styles.buttonContainer}>
        <HomepageButton href="/docs/" title="Get started" />
        {audio.isReady && (
          <button
            type="button"
            onClick={() => {
              audio.playAsset(AudioAsset.SongC);
            }}
          >
            Play
          </button>
        )}
      </div>
    </div>
  );
};

export default Heading;
