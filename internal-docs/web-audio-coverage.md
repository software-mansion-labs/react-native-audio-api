## Web Audio API coverage

<details>
  <summary><b>AudioContext</b><br/> Android: ✅ <br/>iOS: ✅</summary>

| Method / Property     | iOS | Android |
| --------------------- | --- | ------- |
| 🔹 destination        | ✅  | ✅      |
| 🔹 sampleRate         | ✅  | ✅      |
| 🔹 state              | ✅  | ✅      |
| 🔹 currentTime        | ✅  | ✅      |
| 🔘 createGain         | ✅  | ✅      |
| 🔘 createOscillator   | ✅  | ✅      |
| 🔘 createStereoPanner | ✅  | ✅      |
| 🔘 createBiquadFilter | ✅  | ✅      |
| 🔘 close              | ✅  | ✅      |

</details>

<details>
  <summary><b>AudioNode</b><br/> Android: ✅ <br />iOS: ✅</summary>

| Method / Property       | iOS | Android |
| ----------------------- | --- | ------- |
| 🔹context               | ✅  | ✅      |
| 🔹numberOfInputs        | ✅  | ✅      |
| 🔹numberOfOutputs       | ✅  | ✅      |
| 🔹channelCount          | ⌛  | ✅      |
| 🔹channelCountMode      | ⌛  | ⌛      |
| 🔹channelInterpretation | ⌛  | ⌛      |
| 🔘connect               | ✅  | ✅      |
| 🔘disconnect            | ✅  | ✅      |

</details>

<details>
  <summary><b>AudioScheduledSourceNode</b><br/> Android: ✅ <br />iOS: ✅</summary>

| Method / Property | iOS | Android |
| ----------------- | --- | ------- |
| 🔘start           | ✅  | ✅      |
| 🔘stop            | ✅  | ✅      |

</details>

<details>
  <summary><b>AudioDestinationNode</b><br/> Android: ✅ <br />iOS: ✅</summary>

| Method / Property | iOS | Android |
| ----------------- | --- | ------- |

</details>

<details>
  <summary><b>AudioParam</b><br/> Android: ✅ <br />iOS: ✅</summary>

| Method / Property              | iOS | Android |
| ------------------------------ | --- | ------- |
| 🔹value                        | ✅  | ✅      |
| 🔹defaultValue                 | ✅  | ✅      |
| 🔹minValue                     | ✅  | ✅      |
| 🔹maxValue                     | ✅  | ✅      |
| 🔘setValueAtTime               | ✅  | ✅      |
| 🔘linearRampToValueAtTime      | ✅  | ✅      |
| 🔘exponentialRampToValueAtTime | ✅  | ✅      |

</details>

<details>
  <summary><b>OscillatorNode</b><br/> Android: ✅ <br />iOS: ✅</summary>

| Method / Property | iOS | Android |
| ----------------- | --- | ------- |
| 🔹frequency       | ✅  | ✅      |
| 🔹detune          | ✅  | ✅      |
| 🔹type            | ✅  | ✅      |

</details>

<details>
  <summary><b>GainNode</b><br/> Android: ✅ <br />iOS: ✅</summary>

| Method / Property | iOS | Android |
| ----------------- | --- | ------- |
| 🔹gain            | ✅  | ✅      |

</details>

<details>
  <summary><b>StereoPannerNode</b><br/> Android: ✅ <br />iOS: ✅</summary>

| Method / Property | iOS | Android |
| ----------------- | --- | ------- |
| 🔹pan             | ✅  | ✅      |

</details>

<details>
  <summary><b>BiquadFilterNode</b><br/> Android: ✅ <br />iOS: ✅</summary>

| Method / Property | iOS | Android |
| ----------------- | --- | ------- |
| 🔹frequency       | ✅  | ✅      |
| 🔹detune          | ✅  | ✅      |
| 🔹Q               | ✅  | ✅      |
| 🔹gain            | ✅  | ✅      |
| 🔹type            | ✅  | ✅      |

</details>
