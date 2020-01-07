import React from 'react'
import {
  Animated,
  StyleSheet,
  View,
  ViewPropTypes,
} from 'react-native'
import PropTypes from 'prop-types'

// compatability for react-native versions < 0.44
const ViewPropTypesStyle = ViewPropTypes
  ? ViewPropTypes.style
  : View.propTypes.style

const styles = StyleSheet.create({
  outerCircle: {
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center'
  },
  innerCircle: {
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftWrap: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  halfCircle: {
    position: 'absolute',
    top: 0,
    left: 0,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
})

function calcInterpolationValuesForHalfCircle1(animatedValue, { color }) {
  const rotate = animatedValue.interpolate({
    inputRange: [0, 50, 50, 100],
    outputRange: ['0deg', '180deg', '180deg', '180deg'],
  })

  const backgroundColor = color
  return { rotate, backgroundColor }
}

function calcInterpolationValuesForHalfCircle2(
  animatedValue,
  { bgColor, color },
) {
  const rotate = animatedValue.interpolate({
    inputRange: [0, 50, 50, 100],
    outputRange: ['0deg', '0deg', '180deg', '360deg'],
  })

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 50, 50, 100],
    outputRange: [bgColor, bgColor, color, color],
  })
  return { rotate, backgroundColor }
}

function getInitialState(props) {
  const circleProgress = new Animated.Value(props.progress)
  return {
    circleProgress,
    interpolationValuesHalfCircle1: calcInterpolationValuesForHalfCircle1(
      circleProgress,
      props
    ),
    interpolationValuesHalfCircle2: calcInterpolationValuesForHalfCircle2(
      circleProgress,
      props
    )
  };
}

export default class PercentageCircle extends React.PureComponent {
                 static propTypes = {
                   progress: PropTypes.number.isRequired,
                   radius: PropTypes.number.isRequired,
                   color: PropTypes.string,
                   bgColor: PropTypes.string,
                   borderColor: PropTypes.string,
                   borderWidth: PropTypes.number,
                   containerStyle: ViewPropTypesStyle
                 };

                 static defaultProps = {
                   color: "blue",
                   borderColor: "blue",
                   bgColor: "#fff",
                   borderWidth: 1,
                   children: null,
                   containerStyle: null
                 };

                 constructor(props) {
                   super(props);

                   this.state = getInitialState(props);
                   this.restartAnimation();
                 }

                 componentWillReceiveProps(nextProps) {
                   if (this.props.progress !== nextProps.progress) {
                     this.state.circleProgress.stopAnimation();
                     this.setState(
                       getInitialState(nextProps),
                       this.restartAnimation
                     );
                   }
                 }

                 onCircleAnimated = ({ finished }) => {
                   // if animation was interrupted by stopAnimation don't restart it.
                   if (!finished) return;
                   this.setState({
                     ...getInitialState(this.props)
                   });
                 };

                 restartAnimation = () => {
                   this.state.circleProgress.stopAnimation();
                   this.onCircleAnimated({ finished: true });
                 };

                 renderHalfCircle({ rotate, backgroundColor }) {
                   const { radius } = this.props;

                   return (
                     <View
                       style={[
                         styles.leftWrap,
                         {
                           width: radius,
                           height: radius * 2
                         }
                       ]}
                     >
                       <Animated.View
                         style={[
                           styles.halfCircle,
                           {
                             width: radius,
                             height: radius * 2,
                             borderRadius: radius,
                             backgroundColor,
                             transform: [
                               { translateX: radius / 2 },
                               { rotate },
                               { translateX: -radius / 2 }
                             ]
                           }
                         ]}
                       />
                     </View>
                   );
                 }

                 render() {
                   const {
                     interpolationValuesHalfCircle1,
                     interpolationValuesHalfCircle2
                   } = this.state;
                   return (
                     <View
                       style={[
                         styles.outerCircle,
                         {
                           width: this.props.radius * 2,
                           height: this.props.radius * 2,
                           borderRadius: this.props.radius,
                           backgroundColor: this.props.bgColor,
                           borderWidth: this.props.borderWidth,
                           borderColor: this.props.borderColor
                         }
                       ]}
                     >
                       {this.renderHalfCircle(interpolationValuesHalfCircle1)}
                       {this.renderHalfCircle(interpolationValuesHalfCircle2)}
                     </View>
                   );
                 }
               }
