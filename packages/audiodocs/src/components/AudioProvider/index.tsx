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

type AudioProviderProps = PropsWithChildren;

export enum AudioAsset {
  SongA = 'SongA',
  SongB = 'SongB',
  SongC = 'SongC',
  SimpleClick = 'SimpleClick',
  MouseClick01 = 'MouseClick01',
  OldRadioButonClick = 'OldRadioButonClick',
}

interface ReactAudioContext {
  isReady: boolean;
  isActive: boolean;
  aCtxRef: RefObject<AudioContext | null>;
  mainGainRef: RefObject<GainNode | null>;
  analyserRef: RefObject<AnalyserNode | null>;
  playAsset: (asset: AudioAsset) => void;
  setIsActive: (isActive: boolean) => void;
}

const audioAssetUrls: Record<AudioAsset, string> = {
  [AudioAsset.SongA]: '/audio/sample-file-1.mp3',
  [AudioAsset.SongB]: '/audio/sample-file-2.mp3',
  [AudioAsset.SongC]: '/audio/sample-file-3.mp3',
  [AudioAsset.SimpleClick]: '/audio/simple-click.mp3',
  [AudioAsset.MouseClick01]: '/audio/mouse-click-01.mp3',
  [AudioAsset.OldRadioButonClick]: '/audio/old-radio-button-click.mp3',
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
    [AudioAsset.OldRadioButonClick]: false,
  });

  const [isReady, setIsReady] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const isActiveRef = useRef(isActive);

  useEffect(() => {
    isActiveRef.current = isActive;
  }, [isActive]);

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

      if (isAssentPlaying.current[asset]) {
        return;
      }

      if (!aCtx || !mainGain || !audioAssets) {
        return;
      }

      const clickBuffer = audioAssets[AudioAsset.MouseClick01];
      const clickSource = aCtx.createBufferSource();
      clickSource.buffer = clickBuffer;

      clickSource.connect(mainGain);
      clickSource.start();

      const buffer = audioAssets[asset];
      const source = aCtx.createBufferSource();

      source.buffer = buffer;
      source.connect(mainGain);
      source.start(aCtx.currentTime, offset || 0, duration || buffer.duration);

      isAssentPlaying.current[asset] = true;
      source.onended = () => {
        isAssentPlaying.current[asset] = false;
      };
    },
    []
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

  const context = useMemo(
    () => ({
      isReady,
      playAsset,
      aCtxRef,
      mainGainRef,
      analyserRef,
      isActive,
      setIsActive,
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
