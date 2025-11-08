import { NavigationContainer } from "@react-navigation/native";

import RootNavigator from "./src/navigators/RootNavigator";

// const Stack = createNativeStackNavigator();
// const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}
