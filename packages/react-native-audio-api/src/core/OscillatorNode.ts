import { IOscillatorNode } from '../interfaces';
import { WaveType } from './types';
import AudioScheduledSourceNode from './AudioScheduledSourceNode';
import AudioParam from './AudioParam';
import BaseAudioContext from './BaseAudioContext';

export default class OscillatorNode extends AudioScheduledSourceNode {
  readonly frequency: AudioParam;
  readonly detune: AudioParam;

  constructor(context: BaseAudioContext, node: IOscillatorNode) {
    super(context, node);
    this.frequency = new AudioParam(node.frequency);
    this.detune = new AudioParam(node.detune);
    this.type = node.type;
  }

  public get type(): WaveType {
    return (this.node as IOscillatorNode).type;
  }

  public set type(value: WaveType) {
    (this.node as IOscillatorNode).type = value;
  }
}