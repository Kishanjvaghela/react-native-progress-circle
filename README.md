# React Native Countdown Circle

![React Native Countdown Circles](/README/progress-demo.png?raw=true "React Native Countdown Circles")

## Features

* Custom colors
* Custom size and border radius
* Light-weight: No other dependencies besides `react-native`
* Performant and Smooth: Uses React Native's [`Animated`](https://facebook.github.io/react-native/docs/animations.html) library

## Installation

`npm install --save https://github.com/Kishanjvaghela/react-native-progress-circle`

## Usage

```javascript
import ProgressCircle from 'react-native-progress-circle'

render() {
    return (
        <ProgressCircle
            progress={85}
            radius={10}
            borderWidth={1}
            borderColor="#4099DA"
            color="#4099DA"
            bgColor="#F5F6F7"
        />
    )
}
```

## Props
| Name | Description | Type | Required | Default Value |
| :--- | :----- | :--- | :---: | :---: |
| progress | The progress to display | Number | ✓ |  |
| radius | The radius in `px` of the component (including border) | Number | ✓ |  |
| borderWidth | The border width in `px` | Number | ✓ |  |
| color | The progress fill color | String |  | ![#00f](https://placehold.it/15/00f/0000FF?text=+) `blue` |
| bgColor | The inner background color of the component  | String |  | ![#fff](https://placehold.it/15/fff/000000?text=+) `'#fff'` |

## Implementation Details

[React Native Progress Circle](http://cmichel.io/react-native-progress-circle)

## License

MIT
