import React from 'react';
import { useColorMode } from '@docusaurus/theme-common';

import styles from './styles.module.css';
import Spectrogram from './Spectrogram';
import Shape from './Shape';

const Spectrum = () => {
  const { colorMode } = useColorMode();

  const color =
    colorMode === 'dark'
      ? 'var(--swm-green-dark-100)'
      : 'var(--swm-green-light-100)';

  return (
    <div className={styles.container}>
      <div className={styles.topContainer}>
        <Spectrogram />
        <Shape color={color} />
      </div>
      <div
        className={styles.bottomContainer}
        style={{
          backgroundColor: color,
        }}
      >
        <div style={{ flex: 1 }}></div>
        <div style={{ width: '100%', overflow: 'hidden' }}>
          <Shape color="var(--swm-landing-background)" />
        </div>
      </div>
    </div>
  );
};

export default Spectrum;

/* <div
style={
  {
    width: '100vw', position: 'relative'
  }
}
/>
<div
style={
  {
  width: '100vw',
    top: '300px',
  }
}
>
<Shape color={color} />
<div style={{ width: '100%', overflow: 'hidden' }}>
</div>
</div>
<div
style={
  {
    width: '100vw',
    height: '200px',
    backgroundColor: 'var(--swm-landing-background)',
    position: 'relative',
  }
}
/>
*/
