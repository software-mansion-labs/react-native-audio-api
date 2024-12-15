import React from 'react';

import HomepageButton from '@site/src/components/HomepageButton';
import styles from './styles.module.css';

const Heading: React.FC = () => {
  return (
    <div className={styles.heading}>
      <h1 className={styles.headingLabel}>
        <span>React Native</span>
        <span>Audio API</span>
      </h1>
      <h2 className={styles.subheadingLabel}>
        All You need digital audio workstation for react native.
      </h2>
      <div className={styles.buttonContainer}>
        <HomepageButton href="/docs/" title="Get started" />
        <button type="button">Play</button>
      </div>
    </div>
  );
};

export default Heading;
