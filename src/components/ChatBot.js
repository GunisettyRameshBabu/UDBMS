import React, { Component } from 'react';
import { WebView , ActivityIndicator ,View, StyleSheet , Platform , TouchableOpacity,Text } from 'react-native';
import FAB from 'react-native-fab';
import Icon from 'react-native-vector-icons/MaterialIcons';
export default class ChatBot extends Component {

  constructor(props) {
    super(props);
    this.state = {
            canGoBack: false
            }
  }
  WEBVIEW_REF;

//   constructor(props) {
//     super(props);
//     this.state = {
//       canGoBack: false
//       }
// }

onNavigationStateChange(navState)
{
  //this.setState({canGoBack:navState.canGoBack});
}

onBack()
{
  this.refs[this.WEBVIEW_REF].goBack();
}

  ActivityIndicatorLoadingView() {
    
    return (
 
      <ActivityIndicator
        color='red'
        size='large'
        style={styles.ActivityIndicatorStyle}
      />
    );
  }

  render() {
 var user = this.props.navigation.state.params;
 var url = Platform.OS == 'ios' ? 'https://buffermanagementbot.azurewebsites.net?name='+user.name+'&userid='+user.userid : 'https://buffermanagementbot.azurewebsites.net?name='+user.name+'&userid='+user.userid;
 
 return (
     <View style={{flex:1}}>
      <WebView
        source={{uri: url}}
        style={styles.WebViewStyle}
         ref={this.WEBVIEW_REF}
         
        javaScriptEnabled={true}
         domStorageEnabled={true}
        
         renderLoading={this.ActivityIndicatorLoadingView} 
         startInLoadingState={true}  
      />
        </View>
    );
  }
}

const styles = StyleSheet.create(
  {
   
  WebViewStyle:
  {
     justifyContent: 'center',
     alignItems: 'center',
     flex:1,
     marginTop:  0
  },
   
  ActivityIndicatorStyle:{
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'center'
    
  }
  });