import React from 'react';
import {createStackNavigator,createSwitchNavigator} from 'react-navigation'
import {View,Text} from 'react-native';
import { Container, Header, Content, Tab, Tabs ,TabHeading} from 'native-base';
import ChatBot from './ChatBot';
import PartList from './PartList';
import Tab3 from './Tab3';
import Icon from 'react-native-vector-icons/FontAwesome';
import PartView from './PartView';

export const PartNavigator = createSwitchNavigator({
  PartList: { screen: PartList
},
  PartDetail: { screen: PartView ,navigationOptions: ({ navigation }) => ({
    title: `Welcome Buffer Management System`,
  }),} } , {
    mode: 'modal'
  }
);
export default class Landing extends React.Component {
  constructor(props) {
    super(props);
  }
    render() {
      const user = this.props.navigation.state.params;
      
        return(
            <Container>
           
            <Tabs>
              <Tab heading={ <TabHeading><Icon name="chatbubbles" /><Text> Chat Bot</Text></TabHeading>}>
                <ChatBot user={user} />
              </Tab>
              <Tab heading={ <TabHeading><Icon name="list" /><Text> Part List</Text></TabHeading>}>
                <PartNavigator />
              </Tab>
              <Tab heading="SNP">
                <Tab3 />
              </Tab>
            </Tabs>
          </Container>
        )
    }
}