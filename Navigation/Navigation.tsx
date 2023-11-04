import { createAppContainer } from 'react-navigation'
import { createStackNavigator} from 'react-navigation-stack'
import Hello from '../Components/Hello'

const MainNavigation = createStackNavigator({
    Hello: {
      screen: Hello,
      navigationOptions: {
        headerShown: false,
        title: 'Hello'
      }
    }
  })
  
  export default createAppContainer(MainNavigation)  