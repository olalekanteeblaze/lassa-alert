import { Animated, View, TouchableOpacity, SafeAreaView, Text } from 'react-native';
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import HomeScreen from "./HomeScreen";
import ProfileScreen from "./ProfileScreen";

const Tab = createMaterialTopTabNavigator();

function MainScreen() {
  return (
    <Tab.Navigator initialRouteName="Home" tabBar={(props) => <MyTabBar {...props} />}>
        <Tab.Screen name="Dashboard" component={HomeScreen} options={{ tabBarShowLabel: true }}/>
        <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarShowLabel: true }} />
    </Tab.Navigator>
  );
}

function MyTabBar({ state, descriptors, navigation, position }) {
  return (
    <View style={{ flexDirection: 'row', display: 'flex', marginTop: 60 }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const inputRange = state.routes.map((_, i) => i);
        const opacity = position.interpolate({
          inputRange,
          outputRange: inputRange.map(i => (i === index ? 1 : 0)),
        });

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ borderBottomColor: '#40B885', borderBottomWidth: isFocused ? 2 : 0, width: '50%', paddingBottom: 8, opacity }}
            key={index}
          >
            <Text className={`text-center font-semibold ${isFocused && 'text-[#40B885]'}`}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

// ...


// function MyTabBar({ navigation }) {
//   return (
//     <Button
//       title="Go somewhere"
//       onPress={() => {
//         // Navigate using the `navigation` prop that you received
//         navigation.navigate('SomeScreen');
//       }}
//     />
//   );
// }


export default MainScreen;