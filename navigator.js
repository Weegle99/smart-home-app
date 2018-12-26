import { createStackNavigator, createAppContainer } from "react-navigation";
import { Animated, Easing } from "react-native";

import { HomeScreen } from "./src/pages/HomeScreen";
import { BulbsList } from "./src/pages/BulbsList";
import { BulbDetails } from "./src/pages/BulbDetails";

const transitionConfig = () => {
  return {
    transitionSpec: {
      duration: 400,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true
    },
    screenInterpolator: sceneProps => {
      const { position, layout, scene } = sceneProps;

      const width = layout.initWidth;

      const thisSceneIndex = scene.index;

      const translateX = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
        outputRange: [width, 0, -width]
      });

      const opacity = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
        outputRange: [0, 1, 0]
      });

      return { opacity, translateX };
    }
  };
};

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    BulbsList,
    BulbDetails
  },
  {
    initialRouteName: "Home",
    headerMode: "none",
    transitionConfig,
    cardStyle: { backgroundColor: "#000000" }
  }
);

export const AppContainer = createAppContainer(AppNavigator);
