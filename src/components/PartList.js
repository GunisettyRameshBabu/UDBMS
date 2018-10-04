import React, { Component } from 'react';
import { TextInput,FlatList,RefreshControl,View,ActivityIndicator,TouchableOpacity,StyleSheet,AsyncStorage} from 'react-native';
import {List,ListItem} from 'react-native-elements';


import Icon from 'react-native-vector-icons/MaterialIcons';
import FAB from 'react-native-fab';
import { Container, Header, Content, Card, CardItem, Text, Body, Button } from 'native-base';
export default class PartList extends Component {
  static navigationOptions = {
    header: null
}
constructor(props) {
  super(props);
  
  this.state = {
    items : [ 
    ],
    mainData:[],
    refreshing : false,
    loginId:''
  };
}
componentDidMount() {
  this.props.navigation.addListener('didFocus', this._onFocus);
  this.GetData();
}
componentWillUnmount() {
  this.props.navigation.removeListener('didBlur', this._onFocus);
}
componentWillMount()
{
    AsyncStorage.getItem('loginId').then((value) => { this.setState({ 'loginId': value })});
   
}

_onFocus = () => {
  this.GetData();
};


GetData()
{
  this.changeUserdata(true,'refreshing');
  fetch('http://buffermanagemetapi.azurewebsites.net/api/partmasters',{
    method: 'GET',
    
})
.then((response) => response.json())
.then((res) => { 
    
    this.changeUserdata(false,'refreshing');
  if(res != null && res.Message != null)
  {
      alert( res.Message)
  }
  else  
  {
    this.changeUserdata(res,'items');
    this.changeUserdata(res,'mainData');
}
})
.catch(err => {
    alert(JSON.stringify(err));
    this.changeUserdata(false,'refreshing');
})
  }

GetItem (item) {
 
  alert(item);
   
  }

  ListViewItemSeparator = () => {
    return (
      <View
        style={{
  
          height: .5,
          width: "100%",
          backgroundColor: "#000",
  
        }}
      />
    );
  }

showPopup()
{
  this.changeUserdata(true,'showPupUp');
}

showPartDetails(item)
{
  primaryPrefered = true;
  //alert(JSON.stringify((item.PrimaryLocationQuantity / item.PrimaryLocationCapacity) * 100 > 80))
  if (item.PrimaryLocationQuantity > 0) {
    if (((item.PrimaryLocationQuantity / item.PrimaryLocationCapacity) * 100 > 80)) {
      primaryPrefered = false;
    }
  }
  var randomNumber = Math.floor(Math.random() * 2) + 1; 
 
  this.props.navigation.navigate({ routeName: 'Details' ,params : { primaryLocationImage : randomNumber == 1 ? 'primary1':'primary2',bufferLocationImage : randomNumber == 2 ? 'buffer1':'buffer2', name : this.props.navigation.state.params.name , primaryPrefered : primaryPrefered , partName : item.PartName , partNo : item.PartId , capacity:item.PrimaryLocationCapacity, comment : item.Comment , sNPQuantity : item.SNPQuantity,primaryLocation:item.PrimaryLocationName,bufferLocation:item.BufferLocationName,quantity:item.PrimaryLocationQuantity,bufferQuantity:item.BufferLocationQUantity,updatedBy:item.UpdatedBy, updatedDate : item.UpdatedDate , primaryLocationId: item.PrimaryLocation , bufferLocationId : item.BufferLocation }});
 
}

changeUserdata(data, key) {
  let userdetails = this.state;
  userdetails[key] = data;
  this.setState(userdetails);
}

filterData(e)
{
  let text = e.toLowerCase()
    let trucks = this.state.mainData;
    let filteredName = trucks.filter((item) => {
      return item.PartId.toLowerCase().match(text) || item.PartName.toLowerCase().match(text)
    })
    if (!text || text === '') {
      this.setState({
        items: trucks
      })
    } else if (!Array.isArray(filteredName) && !filteredName.length) {
      // set no data flag to true so as to render flatlist conditionally
      this.setState({
        items:[]
      })
    } else if (Array.isArray(filteredName)) {
      this.setState({
        noData: false,
        items: filteredName
      })
    }
    
}
    render() {
      if(this.state.refreshing){
        return  <ActivityIndicator size="large"  color="red" style={{flex:1, alignItems:'center', justifyContent:'center'}} />
    }
        return (
         
<View style={{flex:1}}>
<View style={styles.SectionStyle}>
<Icon name="search" size={24}/>
<TextInput style={{flex:1}} 
            autoCapitalize="none" 
            onSubmitEditing={() => this.passwordInput.focus()} 
            autoCorrect={false} 
            keyboardType='email-address' 
            returnKeyType="next" 
            placeholder=' Search For Part'
            underlineColorAndroid="transparent"
            
             onChangeText={value =>  this.filterData(value) } />
            
  </View>

          <FlatList 
data={this.state.items}
ListEmptyComponent={<Text style={{padding:30,alignContent:'center', alignSelf:'center'}}>No Data Found</Text>}
renderItem={({item}) =>
<View style={{flexDirection:'row', padding: 10, borderBottomWidth: 1, borderBottomColor: 'lightgrey'}}>

<TouchableOpacity onPress={() => this.showPartDetails(item)} style={{flex:1}}>
<View style={{paddingLeft:10}}>
<Text style={{fontFamily:'arial',fontSize:20,fontWeight:'bold'}} >Part Number :  {item.PartId}</Text>
<Text style={{fontFamily:'arial',fontSize:15,fontStyle:'italic'}}>Part Name : {item.PartName}</Text>
<Text style={{fontFamily:'arial',fontSize:15,fontStyle:'italic'}}>Received Quantity: {item.SNPQuantity}</Text>
</View>
</TouchableOpacity>
</View>
}
keyExtractor={item => item.PartId.toString()}
/> 
<FAB buttonColor="red" iconTextColor="#FFFFFF" onClickAction={() => {this.props.navigation.navigate("ChatBot")}} visible={true} iconTextComponent={<Icon name="chat"/>} style={{resizeMode : 'contain'}} /> 
</View>

        );
      }
    }

    const styles = StyleSheet.create(
      {SectionStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: .5,
        borderColor: '#000',
        height: 40,
        borderRadius: 5 ,
        margin: 20
    },
        SubmitButtonStyle: {
 
          marginTop:10,
          paddingTop:15,
          paddingBottom:15,
          marginLeft:30,
          marginRight:30,
          backgroundColor:'red',
          borderRadius:10,
          borderWidth: 1,
          borderColor: '#fff',
          width : 100,
          alignSelf:'flex-end'
         
        },
        TextStyle:{
          color:'#fff',
          textAlign:'center',
      },
      }
    )