import React, { useMemo, useState } from 'react';
import { useColorMode } from '@docusaurus/theme-common';

import styles from './spectrogram.module.css';

interface BoxProps {
  isOn: boolean;
  inColIdx: number;
}

type Spectrum = boolean[][];

// prettier-ignore
const staticLevels = [
  1, 2, 3, 4, 5,
  7, 10, 5, 4, 2,
  3, 5, 4, 5, 6,
  9, 7, 5, 4, 6,
  3, 2, 8, 11, 15,
];

function generateInitialSpectrum(): Spectrum {
  const spectrum = [];

  for (let i = 0; i < 25; i += 1) {
    spectrum.push([]);

    for (let j = 0; j < 15; j += 1) {
      if (j < staticLevels[i]) {
        spectrum[i].push(true);
      } else {
        spectrum[i].push(false);
      }
    }
  }

  return spectrum;
}

const Box: React.FC<BoxProps> = ({ isOn, inColIdx }) => {
  const { colorMode } = useColorMode();

  const color = useMemo(() => {
    if (!isOn) {
      return 'transparent';
    }

    if (inColIdx < 4) {
      return `var(--swm-green-${colorMode}-100)`;
    }

    if (inColIdx < 9) {
      return `var(--swm-blue-${colorMode}-100)`;
    }

    if (inColIdx < 12) {
      return `var(--swm-yellow-${colorMode}-100)`;
    }

    return `var(--swm-red-${colorMode}-100)`;
  }, [isOn, inColIdx, colorMode]);

  return (
    <div
      className={styles.box}
      style={{
        backgroundColor: color,
      }}
    />
  );
};

const Spectrogram: React.FC = () => {
  const [spectrum, setSpectrum] = useState(generateInitialSpectrum());

  return (
    <div className={styles.mainContainer}>
      {spectrum.map((col, i) => (
        <div key={i} className={styles.spectrogramColumn}>
          {col.map((isOn, j) => (
            <Box key={j} isOn={isOn} inColIdx={j} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Spectrogram;
