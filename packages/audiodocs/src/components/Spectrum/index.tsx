import React from 'react';
import { useColorMode } from '@docusaurus/theme-common';

import styles from './styles.module.css';
import Spectrogram from './Spectrogram';
import Shape from './Shape';

const Spectrum = () => {
  const { colorMode } = useColorMode();

  const color =
    colorMode === 'dark'
      ? 'var(--swm-red-dark-100)'
      : 'var(--swm-red-light-100)';

  return (
    <div className={styles.container}>
      <div style={{ width: '100vw', height: '400px', position: 'relative' }}>
        <Spectrogram />
        <Shape color={color} />
      </div>
      <div
        style={{
          width: '100vw',
          height: '1000px',
          backgroundColor: color,
          position: 'relative',
        }}
      >
        <Shape color="var(--swm-landing-background)" />
      </div>
      <div
        style={{
          width: '100vw',
          height: '200px',
          backgroundColor: 'var(--swm-landing-background)',
          position: 'relative',
        }}
      />
    </div>
  );
};

export default Spectrum;
