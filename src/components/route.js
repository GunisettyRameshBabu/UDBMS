import React from 'react';
import ChatBot from './ChatBot';
import PartList from './PartList';
import Tab3 from './Tab3';
import { Text, View , Platform,TouchableOpacity, AsyncStorage} from 'react-native';
import { StackNavigator, TabNavigator , createStackNavigator } from 'react-navigation';
import { Footer, FooterTab, Button, Text as NBText  } from 'native-base';
import Login from './Login';
import PartView from './PartView';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';

const partNavigator = createStackNavigator(
    {
        List : {screen : PartList},
        Details : {screen : PartView}
    }
   
)
_menu = null;
 
  setMenuRef = ref => {
    this._menu = ref;
  };
 
  hideMenu = () => {
    this._menu.hide();
  };
 
  showMenu = () => {
    this._menu.show();
  };
const tabs = TabNavigator({
    PartList: { screen: PartList },
    ChatBot: { screen: ChatBot }
    
    
},
    {
        tabBarPosition: 'top',
        swipeEnabled: true,
        animationEnabled:true,
        
        tabBarOptions:{
activeBackgroundColor:'gray',
inactiveBackgroundColor:'red'
        },
        tabBarComponent: props => {
            return (
                <Footer style={{backgroundColor:'red',borderColor:'red'}}>
                    <FooterTab>
                       
                        <Button style={{backgroundColor:'red'}} iconLeft
                            vertical
                            active={props.navigationState.index === 1}
                            onPress={() => props.navigation.navigate("PartList")}>
                            <Icon name="list" color="#fff" size={24}/>
                            <NBText style={{color:'white'}}>SNP List</NBText>
                        </Button>
                        <Button style={{backgroundColor:'red'}} iconLeft
                            vertical
                            active={props.navigationState.index === 0}
                            onPress={() => props.navigation.navigate("ChatBot")}>
                            <Icon name="chat" color="#fff" size={24}/>
                            <Text style={{color:'white'}}>Chat Bot</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            );
        }
    });

export default MainPage = StackNavigator({
    Home: { screen: Login },
    SuccessLogin: { screen: tabs ,navigationOptions: ({ navigation }) => ({
            //title: `Welcome ${ navigation.state.params.name}`,
            headerStyle: { backgroundColor: 'red'},
            headerTintColor: 'white',
            // headerTitleStyle: { color: 'white' },
            headerRight: (
                // <TouchableOpacity
                //   onPress={
                //    () => {  navigation.navigate("Home") } } >
                // <Text  style={{fontSize: 18, fontWeight: '600', color: "#fff", paddingRight:20}}>Logout</Text>
                // </TouchableOpacity>
                <Menu
          ref={this.setMenuRef}
          button={<Icon name="more-vert" size={30} color="white" onPress={() => showMenu()} />}
        >
          <MenuItem onPress={() =>  navigation.navigate("Home")}>Log Out</MenuItem>
          <MenuItem onPress={this.hideMenu}>Change Language</MenuItem>
          <MenuItem onPress={() =>  navigation.navigate("ChatBot")}>
            Chat Bot
          </MenuItem>
          <MenuDivider />
          <MenuItem onPress={this.hideMenu}>Help</MenuItem>
        </Menu>
              ),
            headerTitle: ({ style, children : title }) => {
                return (
                 <Text style={{fontSize: 18, fontWeight: '600', color: "#fff"}} numberOfLines={2}>{`Welcome ${ navigation.state.params.name}`}</Text> 
                )
              },
            
          })
          ,} ,
          Details : { screen: PartView ,navigationOptions: ({ navigation }) => ({
            //title: `Welcome ${ navigation.state.params.name}`,
            headerStyle: { backgroundColor: 'red'},
            headerTintColor: 'white',
            // headerTitleStyle: { color: 'white' },
            headerRight: (
                // <TouchableOpacity
                //   onPress={
                //    () =>  navigation.navigate("Home") } >
                // <Text  style={{fontSize: 18, fontWeight: '600', color: "#fff", paddingRight:20}}>Logout</Text>
                // </TouchableOpacity>
                <Menu
          ref={this.setMenuRef}
          button={<Icon name="more-vert" size={30} color="white" onPress={() => showMenu()} />}
        >
          <MenuItem onPress={() =>  navigation.navigate("Home")}>Log Out</MenuItem>
          <MenuItem onPress={this.hideMenu}>Change Language</MenuItem>
          <MenuItem onPress={() =>  navigation.navigate("ChatBot")}>
            Chat Bot
          </MenuItem>
          <MenuDivider />
          <MenuItem onPress={this.hideMenu}>Help</MenuItem>
        </Menu>
              ),
            headerTitle: ({ style, children : title }) => {
                return (
                 <Text style={{fontSize: 18, fontWeight: '600', color: "#fff"}} numberOfLines={2}>{`Welcome ${ navigation.state.params.name}`}</Text> 
                )
              },
            
          })
          ,} ,

        } ,);