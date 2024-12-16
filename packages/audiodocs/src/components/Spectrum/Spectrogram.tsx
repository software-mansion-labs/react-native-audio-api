import React, { useCallback, useMemo, useState, memo } from 'react';
import { useColorMode } from '@docusaurus/theme-common';

import styles from './spectrogram.module.css';
import { useAnalyser } from '../AudioProvider';
import sampleData from './sampleData';

interface BoxProps {
  isOn: boolean;
  inColIdx: number;
}

const numOfLevels = 64;
const numOfBins = 20;

function parseAudioData(dataArray: Uint8Array | number[]): boolean[][] | false {
  const output = new Array(numOfLevels)
    .fill(null)
    .map(() => new Array(numOfBins).fill(false));

  const allZero = dataArray.every((v: number) => v === 0);

  if (allZero) {
    return false;
  }

  for (let i = 0; i < numOfLevels; i += 1) {
    const value = dataArray[i] / 255.0;

    for (let j = 0; j < numOfBins; j += 1) {
      output[i][j] = j / numOfBins < value;
    }
  }

  return output;
}

const Box: React.FC<BoxProps> = memo(({ isOn, inColIdx }) => {
  const { colorMode } = useColorMode();

  const color = useMemo(() => {
    if (!isOn) {
      return 'transparent';
    }

    if (inColIdx < numOfBins / 4) {
      return `var(--swm-green-${colorMode}-100)`;
    }

    if (inColIdx < numOfBins / 2) {
      return `var(--swm-blue-${colorMode}-100)`;
    }

    if (inColIdx < numOfBins / 1.5) {
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
});

const Spectrogram: React.FC = () => {
  const [spectrum, setSpectrum] = useState(
    parseAudioData(sampleData) as boolean[][]
  );

  useAnalyser(
    useCallback((dataArray, length) => {
      const newSpectrum = parseAudioData(dataArray);

      if (newSpectrum) {
        setSpectrum(newSpectrum);
      }
    }, [])
  );

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
