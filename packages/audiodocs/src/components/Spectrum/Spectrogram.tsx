import React, {
  memo,
  useRef,
  useMemo,
  useState,
  useEffect,
  useCallback,
  use,
} from 'react';

import useScreenSize from '@site/src/hooks/useScreenSize';
import styles from './spectrogram.module.css';
import { useAnalyser, useAudio } from '../AudioProvider';
import sampleData from './sampleData';

const numOfLevels = 64;
const numOfBins = 20;

function parseAudioData(dataArray: Uint8Array | number[]): boolean[][] {
  const output = new Array(numOfLevels)
    .fill(null)
    .map(() => new Array(numOfBins).fill(false));

  for (let i = 0; i < numOfLevels; i += 1) {
    const value = dataArray[i] / 255.0;

    for (let j = 0; j < numOfBins; j += 1) {
      output[i][j] = j / numOfBins < value;
    }
  }

  return output;
}

const Spectrogram: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const useDefaultRef = useRef(true);

  const { windowWidth, windowHeight } = useScreenSize();

  const { isActive } = useAudio();

  const renderData = useCallback((data: boolean[][]) => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const cvsCtx = canvas.getContext('2d');

    cvsCtx.clearRect(0, 0, canvas.width, canvas.height);

    const wSize = canvas.width / 32;
    const hSize = canvas.height / numOfBins;

    const boxSize = Math.max(Math.min(32, Math.max(wSize, hSize) * 0.9), 16);
    const boxSpacing = boxSize * 0.1;

    data.forEach((col, i) => {
      col.forEach((isOn, j) => {
        if (!isOn) {
          return;
        }

        cvsCtx.beginPath();

        if (j < numOfBins / 4) {
          cvsCtx.fillStyle = '#57b495';
        } else if (j < numOfBins / 2) {
          cvsCtx.fillStyle = '#38acdd';
        } else if (j < numOfBins / 1.5) {
          cvsCtx.fillStyle = '#ffd61e';
        } else {
          cvsCtx.fillStyle = '#ff6259';
        }

        cvsCtx.roundRect(
          i * (boxSize + boxSpacing) + boxSpacing,
          canvas.height - (j + 1) * (boxSize + boxSpacing),
          boxSize,
          boxSize,
          boxSpacing * 2.5
        );

        cvsCtx.fill();
      });
    });
  }, []);

  useAnalyser(
    useCallback(
      (dataArray) => {
        if (!isActive) {
          if (useDefaultRef.current) {
            renderData(parseAudioData(sampleData));
            return;
          }

          setTimeout(() => {
            useDefaultRef.current = true;
          }, 2000);
        } else {
          useDefaultRef.current = false;
        }

        const newSpectrum = parseAudioData(dataArray);

        if (newSpectrum) {
          renderData(newSpectrum);
        }
      },
      [isActive]
    )
  );

  useEffect(() => {
    renderData(parseAudioData(sampleData));
  }, [windowWidth, windowHeight]);

  return (
    <canvas
      className={styles.canvas}
      ref={canvasRef}
      width={windowWidth}
      height={windowHeight * 0.5}
    />
  );
};

export default Spectrogram;
