import React from 'react';
import { useColorMode } from '@docusaurus/theme-common';

import styles from './styles.module.css';
import Spectrogram from './Spectrogram';
import Shape from './Shape';

const Spectrum = () => {
  const { colorMode } = useColorMode();

  const color =
    colorMode === 'dark'
      ? 'var(--swm-blue-dark-100)'
      : 'var(--swm-blue-light-100)';

  return (
    <div className={styles.container}>
      <div style={{ width: '100vw', height: '450px' }} />
      <div
        style={{
          width: '100vw',
          height: '800px',
          position: 'absolute',
          overflowX: 'hidden',
          top: '300px',
        }}
      >
        <Spectrogram />
        <div style={{ width: '100%', overflow: 'hidden' }}>
          <Shape color={color} />
        </div>
      </div>
      <div
        style={{
          width: '100vw',
          height: '1000px',
          backgroundColor: color,
          position: 'relative',
        }}
      >
        <div style={{ width: '100%', overflow: 'hidden' }}>
          <Shape color="var(--swm-landing-background)" />
        </div>
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
