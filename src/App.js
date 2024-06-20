import { StatusBar } from 'expo-status-bar';
import { registerRootComponent } from 'expo';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import ManageExpenseScreen from '../screens/ManageExpenseScreen';
import RecentExpenseScreen from '../screens/RecentExpenseScreen';
import AllExpenseScreen from '../screens/AllExpenseScreen';
import IconButton from '../components/ui/IconButton';
import ExpensesContextProvider from '../store/expenses-context';

const Stack = createNativeStackNavigator();
const bottomTabs = createBottomTabNavigator();

function ExpensesOverview(){
  return (
  <bottomTabs.Navigator screenOptions={({ navigation }) => ({
    headerStyle: {backgroundColor: 'skyblue'},
    headerTintColor: 'white',
    tabBarStyle: { backgroundColor: 'skyblue'},
    tabBarActiveTintColor: 'lightpurple',
    headerRight: ({tintColor}) => (<IconButton icon="add" size={24} color={tintColor} onPress={() => {
      navigation.navigate('ManageExpense');
    }}/>
    ),
  })}>
    <bottomTabs.Screen 
      name="RecentExpenses" 
      component={RecentExpenseScreen} 
      options={{
        title: 'Recent Expenses', 
        tabBarLabel: 'Recent', 
        tabBarIcon: ({color, size}) => {
          <Ionicons name="hourglass" size={size} color={color} />
      }}}/>
    <bottomTabs.Screen 
      name="AllExpenses" 
      component={AllExpenseScreen} 
      options={{
        title: 'All Expenses', 
        tabBarLabel: 'All Expenses', 
        tabBarIcon: ({color, size}) => {
          <Ionicons name="calendar" size={size} color={color} />
      }}}/>
  </bottomTabs.Navigator>
  ) 
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <ExpensesContextProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{
            headerStyle: { backgroundColor: 'lightpurple'},
            headerTintColor: 'white'
          }}>
            <Stack.Screen 
              name="ExpensesOverview" 
              component={ExpensesOverview} 
              options={{headerShown: false}}>
            </Stack.Screen>
            <Stack.Screen 
              name="ManageExpense" 
              component={ManageExpenseScreen}
              options={{
                presentation: 'modal',
              }}>
            </Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </ExpensesContextProvider>
    </>
      
  );
}

