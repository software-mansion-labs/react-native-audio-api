import {
  ContextState,
  FilterType,
  WaveType,
  ChannelCountMode,
  ChannelInterpretation,
} from './core/types';

export interface IBaseAudioContext {
  readonly destination: IAudioDestinationNode;
  readonly state: ContextState;
  readonly sampleRate: number;
  readonly currentTime: number;
  createOscillator(): IOscillatorNode;
  createGain(): IGainNode;
  createStereoPanner(): IStereoPannerNode;
  createBiquadFilter: () => IBiquadFilterNode;
  createBufferSource: () => IAudioBufferSourceNode;
  createBuffer: (
    channels: number,
    length: number,
    sampleRate: number
  ) => IAudioBuffer;
}

export interface IAudioContext extends IBaseAudioContext {
  close(): void;
}

export interface IAudioNode {
  readonly context: BaseAudioContext;
  readonly numberOfInputs: number;
  readonly numberOfOutputs: number;
  readonly channelCount: number;
  readonly channelCountMode: ChannelCountMode;
  readonly channelInterpretation: ChannelInterpretation;
  connect: (node: IAudioNode) => void;
  disconnect: (node: IAudioNode) => void;
}

export interface IGainNode extends IAudioNode {
  readonly gain: IAudioParam;
}

export interface IStereoPannerNode extends IAudioNode {
  readonly pan: IAudioParam;
}

export interface IBiquadFilterNode extends IAudioNode {
  readonly frequency: AudioParam;
  readonly detune: AudioParam;
  readonly Q: AudioParam;
  readonly gain: AudioParam;
  type: FilterType;
}

export interface IAudioDestinationNode extends IAudioNode {}

export interface IAudioScheduledSourceNode extends IAudioNode {
  start: (time: number) => void;
  stop: (time: number) => void;
}

export interface IOscillatorNode extends IAudioScheduledSourceNode {
  readonly frequency: IAudioParam;
  readonly detune: IAudioParam;
  type: WaveType;
}

export interface IAudioBufferSourceNode extends IAudioScheduledSourceNode {
  buffer: IAudioBuffer;
  loop: boolean;
}

export interface IAudioBuffer {
  readonly length: number;
  readonly duration: number;
  readonly sampleRate: number;
  readonly numberOfChannels: number;
  getChannelData(channel: number): number[];
  copyFromChannel(
    destination: number[],
    channelNumber: number,
    startInChannel: number
  ): void;
  copyToChannel(
    source: number[],
    channelNumber: number,
    startInChannel: number
  ): void;
}

export interface IAudioParam {
  value: number;
  defaultValue: number;
  minValue: number;
  maxValue: number;
  setValueAtTime: (value: number, startTime: number) => void;
  linearRampToValueAtTime: (value: number, endTime: number) => void;
  exponentialRampToValueAtTime: (value: number, endTime: number) => void;
}