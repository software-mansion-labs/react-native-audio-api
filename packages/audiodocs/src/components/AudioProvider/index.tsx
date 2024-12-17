import React, {
  useRef,
  useMemo,
  useState,
  useEffect,
  RefObject,
  useContext,
  useCallback,
  createContext,
  PropsWithChildren,
} from 'react';

import { useColorMode } from '@docusaurus/theme-common';

type AudioProviderProps = PropsWithChildren;

export enum AudioAsset {
  SongA = 'SongA',
  SongB = 'SongB',
  SongC = 'SongC',
  SimpleClick = 'SimpleClick',
  MouseClick01 = 'MouseClick01',
  LightSwitchOnOff = 'LightSwitchOnOff',
  OldRadioButonClick = 'OldRadioButonClick',
}

interface ReactAudioContext {
  isReady: boolean;
  isActive: boolean;
  aCtxRef: RefObject<AudioContext | null>;
  mainGainRef: RefObject<GainNode | null>;
  analyserRef: RefObject<AnalyserNode | null>;
  playAsset: (asset: AudioAsset, offset?: number, duration?: number) => void;
  setIsActive: (isActive: boolean) => void;
}

const audioAssetUrls: Record<AudioAsset, string> = {
  [AudioAsset.SongA]: '/react-native-audio-api/audio/sample-file-1.mp3',
  [AudioAsset.SongB]: '/react-native-audio-api/audio/sample-file-2.mp3',
  [AudioAsset.SongC]: '/react-native-audio-api/audio/sample-file-3.mp3',
  [AudioAsset.SimpleClick]: '/react-native-audio-api/audio/simple-click.mp3',
  [AudioAsset.MouseClick01]: '/react-native-audio-api/audio/mouse-click-01.mp3',
  [AudioAsset.LightSwitchOnOff]:
    '/react-native-audio-api/audio/light-switch-on-off.mp3',
  [AudioAsset.OldRadioButonClick]:
    '/react-native-audio-api/audio/old-radio-button-click.mp3',
};

const ReactAudioContext = createContext<ReactAudioContext>({
  isReady: false,
  isActive: false,
  aCtxRef: { current: null },
  mainGainRef: { current: null },
  analyserRef: { current: null },

  setIsActive: () => {},
  playAsset: () => {},
});

function setupAudioContext() {
  const aCtx = new AudioContext();

  const mainGain = aCtx.createGain();
  const analyser = aCtx.createAnalyser();

  mainGain.connect(analyser);
  analyser.connect(aCtx.destination);
  analyser.fftSize = 128;

  mainGain.gain.value = 1;

  return {
    aCtx,
    mainGain,
    analyser,
  };
}

export function useAudio() {
  const rac = useContext(ReactAudioContext);

  if (!rac) {
    throw new Error('useAudio must be used within an AudioProvider');
  }

  return rac;
}

export function useAnalyser(
  callback: (data: Uint8Array, length: number) => void
) {
  const { isReady, analyserRef } = useAudio();

  useEffect(() => {
    if (!isReady || !analyserRef.current) {
      return;
    }

    function getAnalyserData() {
      if (!analyserRef.current) {
        return;
      }

      const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
      analyserRef.current.getByteFrequencyData(dataArray);

      callback(dataArray, dataArray.length);
    }

    const intervalId = setInterval(getAnalyserData, 40);

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  });
}

const AudioProvider: React.FC<AudioProviderProps> = ({ children }) => {
  const aCtxRef = useRef<AudioContext | null>(null);
  const mainGainRef = useRef<GainNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const audioAssetsRef = useRef<null | Record<AudioAsset, AudioBuffer>>(null);

  const isAssentPlaying = useRef<Record<AudioAsset, boolean>>({
    [AudioAsset.SongA]: false,
    [AudioAsset.SongB]: false,
    [AudioAsset.SongC]: false,
    [AudioAsset.SimpleClick]: false,
    [AudioAsset.MouseClick01]: false,
    [AudioAsset.LightSwitchOnOff]: false,
    [AudioAsset.OldRadioButonClick]: false,
  });

  const [isReady, setIsReady] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const { colorMode } = useColorMode();

  const isActiveRef = useRef(isActive);
  const isReadyRef = useRef(isReady);

  useEffect(() => {
    isActiveRef.current = isActive;
  }, [isActive]);

  useEffect(() => {
    isReadyRef.current = isReady;
  }, [isReady]);

  const loadAudioAssets = useCallback(async () => {
    const aCtx = aCtxRef.current;
    if (!aCtx) {
      return;
    }

    const assets = await Promise.all(
      Object.entries(audioAssetUrls).map(async ([key, url]) => {
        const response = await fetch(url, { mode: 'no-cors' });
        const arrayBuffer = await response.arrayBuffer();

        return {
          key: key as AudioAsset,
          buffer: await aCtx.decodeAudioData(arrayBuffer),
        };
      })
    );

    audioAssetsRef.current = assets.reduce((acc, { key, buffer }) => {
      acc[key as AudioAsset] = buffer;
      return acc;
    }, {} as Record<AudioAsset, AudioBuffer>);
  }, []);

  const playAsset = useCallback(
    (asset: AudioAsset, offset?: number, duration?: number) => {
      if (!isActiveRef.current) {
        return;
      }

      const aCtx = aCtxRef.current;
      const mainGain = mainGainRef.current;
      const audioAssets = audioAssetsRef.current;

      // if (isAssentPlaying.current[asset]) {
      //   return;
      // }

      if (!aCtx || !mainGain || !audioAssets) {
        return;
      }

      const buffer = audioAssets[asset];
      const source = aCtx.createBufferSource();

      source.buffer = buffer;
      source.connect(mainGain);
      source.start(
        aCtx.currentTime,
        offset || undefined,
        duration || undefined
      );

      isAssentPlaying.current[asset] = true;

      source.onended = () => {
        isAssentPlaying.current[asset] = false;
      };
    },
    []
  );

  const setIsActiveWrapper = useCallback(
    (isActive: boolean) => {
      const aCtx = aCtxRef.current;
      const audioAssets = audioAssetsRef.current;
      const asset = isActive ? AudioAsset.MouseClick01 : AudioAsset.SimpleClick;

      const buffer = audioAssets[asset];

      const source = aCtx.createBufferSource();
      source.buffer = buffer;

      source.connect(aCtx.destination);
      source.connect(analyserRef.current);

      source.start(aCtx.currentTime);

      setIsActive(isActive);
    },
    [playAsset, setIsActive]
  );

  useEffect(() => {
    const { aCtx, mainGain, analyser } = setupAudioContext();

    aCtxRef.current = aCtx;
    mainGainRef.current = mainGain;
    analyserRef.current = analyser;

    loadAudioAssets().then(() => {
      setIsReady(true);
    });

    return () => {
      aCtxRef.current?.close();
    };
  }, []);

  useEffect(() => {
    if (!isActive) {
      mainGainRef.current?.gain.setValueAtTime(0, aCtxRef.current?.currentTime);
    } else {
      mainGainRef.current?.gain.setValueAtTime(1, aCtxRef.current?.currentTime);
    }
  }, [isActive]);

  useEffect(() => {
    if (!isReadyRef.current || !isActiveRef.current) {
      return;
    }

    if (colorMode === 'light') {
      playAsset(AudioAsset.LightSwitchOnOff, 0.1, 1);
    } else {
      playAsset(AudioAsset.LightSwitchOnOff, 0.1, 1);
    }
    0;
  }, [colorMode, playAsset]);

  const context = useMemo(
    () => ({
      aCtxRef,
      mainGainRef,
      analyserRef,

      isReady,
      isActive,

      playAsset,
      setIsActive: setIsActiveWrapper,
    }),
    [isReady, isActive, setIsActive, playAsset]
  );

  return (
    <ReactAudioContext.Provider value={context}>
      {children}
    </ReactAudioContext.Provider>
  );
};

export default AudioProvider;
