import React, { Component } from 'react';
import {  Form, Item, Input, Label ,Button  , TouchableOpacity  } from 'native-base';
import {ScrollView, Text,Image , StyleSheet ,Alert,AsyncStorage,View} from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FAB from 'react-native-fab';
import Loading from 'react-native-whc-loading';
import Modal from 'react-native-modal'; 



export default class PartView extends Component {
  constructor(props) {
    super(props);
    this.state = {
        loginId:'',
        refreshing:false,
        total : '0',
        visibleModal: false,
        primayModel : false
      }
}




getTotal()
{
  return String( parseInt(this.props.navigation.state.params.bufferQuantity) + parseInt( this.props.navigation.state.params.quantity )) ;
}
_renderButton = (text, onPress) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.button}>
      <Text>{text}</Text>
    </View>
  </TouchableOpacity>
);
_renderModalContent = () => (
  <View style={styles.modalContent}>
    {/* <Image style={{justifyContent: 'center'}} source={require('../Images/UDTruck.png')}/> */}
    {this._renderButton('Close', () => this.setState({ visibleModal: false }))}
    
  </View>
);
  updateSNP()
  {
    
    const user = this.props.navigation.state.params;
    if (user.quantity > user.capacity) {
     Alert.alert("Error",'Primary Quantiy can not be greater than capacity');
    }
    else if (user.quantity < 0) {
      Alert.alert("Error",'Quantity can not be less than zero');
    }
    else{
    this.refs.loading.show();

  
  var url = 'http://buffermanagemetapi.azurewebsites.net/api/partmasters';
  var storeadata = {
  'PartId' : user.partNo,
  'Comment' :  user.comment ,
  'PrimaryLocationQuantity' : user.quantity ,
  'BufferLocationQuantity':  user.bufferQuantity ,
  'UpdatedBy' : this.state.loginId,
  'PrimaryLocation':user.primaryLocationId,
  'BufferLocation':user.bufferLocationId
  
  }
 
  fetch(url, {
      method: 'PUT', // or 'PUT'
      body: JSON.stringify(storeadata),
      headers: new Headers({
          'Content-Type': 'application/json',
          'Accept': 'application/json',
      })
  }).then(res => res.json())
      .catch(error => {this.refs.loading.show(false);
        // Toast.show('Error happened', Toast.LONG);
      })
      .then(response => {
        this.refs.loading.Close();
        this.refs.loading.alert("Data Updated Successfully");
        //alert("Data Updated Successfully");
       // Toast.show('SNP Updated Successfully', Toast.LONG);
      // this.refs.toast.show('SNP Updated Successfully');
      
      //  alert('SNP Updated Successfully');

      });
    }
  }

  changePrimaryQuantity(val)
  {
    var index = val.indexOf( "/" ); 
    this.props.navigation.state.params.quantity = index > 0 ? val.substring(0,index) : val;
    this.setState({total : String( parseInt(this.props.navigation.state.params.bufferQuantity) + parseInt( this.props.navigation.state.params.quantity ))})
    
  }

  changeUserdata(data, key) {
    let userdetails = this.state;
    userdetails[key] = data;
    this.setState(userdetails);
}
componentDidMount() {
  this.props.navigation.addListener('didFocus', this._onFocus);
  //this.props.navigation.addListener('didBlur', this._onBlur);
}
componentWillUnmount() {
  //this.props.navigation.removeListener('didFocus', this._onBlur);
  //this.props.navigation.removeListener('didBlur', this._onFocus);
  //this.props.navigation.state.params = {};
}
getImage = (key) => 
{
  switch (key) { 
    case '9524500Z69':
     return require("../Images/9524500Z69.jpg");
    
            break;
            case '4528900Z05':
     return require("../Images/4528900Z05.jpg");
    
            break;

            case '5406300Z11':
     return require("../Images/5406300Z11.jpg");
    
            break;

     case '4432799007':
    return require("../Images/4432799007.jpg");
           
     break;
     case '5221478340':
     return require("../Images/5221478340.jpg");
           
     break;
      case '5222771970':
     return require("../Images/5222771970.jpg");
      break;
      case '5222771975':
      return require("../Images/5222771975.jpg");
       break;
      case '1301000Z01':
      return require("../Images/1301000Z01.jpg");
      break;
      // case '4518400Z14':
      //  return require("../Images/4518400Z14.jpg");
                         
      //                            break;
            default:
           return  require('../Images/UDTruck.png');
            break;

            case 'primary1':
            return require("../Images/primary1.jpg");
    
            break;
            case 'primary2':
     return require("../Images/primary2.jpg");
    
            break;

            case 'buffer1':
     return require("../Images/buffer1.jpg");
    
            break;

     case 'buffer2':
    return require("../Images/buffer2.jpg");
           
     break;
          }

}

_onFocus = () => {
  if (this.props.navigation.state.params.partNo == '' || this.props.navigation.state.params.partNo == undefined) {
    alert('Please select part from SNP list to see the details');
    this.props.navigation.navigate("List");
  }
  else
  {
    this.setState({total:String( parseInt(this.props.navigation.state.params.bufferQuantity) + parseInt( this.props.navigation.state.params.quantity ))});
    
    this.props.navigation.state.params.updatedDate = new Date(this.props.navigation.state.params.updatedDate);
  }
};
_onBlur = () => {
  this.setState({
    loginId:'',
    refreshing:false,
    total : '0',
    visibleModal : false
  });
  this.props.navigation.state.params = {};
};
componentWillMount()
{
    AsyncStorage.getItem('loginId').then((value) => { this.setState({ 'loginId': value })});
   
}

ReviveDateTime( value) 
    {
        if (typeof value === 'string')
        {
            let a = /\/Date\((\d*)\)\//.exec(value);
            if (a)
            {
                return new Date(+a[1]);
            }
        }

        return value;
    }

    

    render(){
    const user = this.props.navigation.state.params;
        return (
        
        //   <Container style={{backgroundColor:'white'}}>
        // <Content style={{backgroundColor:'white'}}>
       <ScrollView style={{flex:1}}>
          <Form style={{backgroundColor:'white', flex: 1}}>
          <Item>
          <Grid >
            <Row style={{flex: 1}}>
              <Col style={{flex: 3, justifyContent: 'center'}}> 
                <Row style={{flex: 1, justifyContent: "flex-start", alignItems: 'center'}}>
                  <Label style={{justifyContent: "flex-start", alignItems: 'center'}} underline={false}>{"Part Number \n \n" + user.partNo}</Label>
                </Row>
              </Col>
              <Col style={{flex: 7}}> 
               <Image style={{justifyContent: 'flex-start',flex:1, width: 250, height: 200}} resizeMode="contain" source={this.getImage(user.partNo)}/>
               </Col>
            </Row>
            
          </Grid>
            </Item>
            
            <Item floatingLabel last>
              <Label>Part Name</Label>
              <Input value={user.partName} disabled/>
            </Item>
            <Item floatingLabel last>
              <Label>Comment</Label>
              <Input multiline={true} numberOfLines={5} value={user.comment} onChangeText={(value) => this.props.navigation.state.params.comment = value}/>
            </Item>
            <Item floatingLabel last>
              <Label>Received Quantity</Label>
              <Input value={user.sNPQuantity} disabled/>
            </Item>
          

           <Item style={{alignSelf:'center'}}>
              <Label>Location Info</Label>
            </Item>
            <Item >
              <Label>Primary :</Label>
              <Icon name='image' color='red' size={24} onPress={() => this.setState({primayModel:true}) }/>
              <Input value={user.primaryLocation} disabled style={user.primaryPrefered ? styles.green : styles.default}/>
              <Input style={user.primaryPrefered ? styles.green : styles.default}
            placeholder='quantity'
            
            value={user.quantity + '/' + user.capacity}
            onChangeText = {(val) => this.changePrimaryQuantity(val)}
              />
           
            </Item>
            <Item >
              <Label>Buffer    :</Label>
              <Icon name='image' color='red' size={24} onPress={() => this.setState({visibleModal:true}) }/>
              <Input value={user.bufferLocation} disabled style={ ! user.primaryPrefered ? styles.green : styles.default}/>
              {/* <Button  onPress={() => this.setState({visibleModal:true})} style={ user.primaryPrefered == false ? styles.green : styles.default}><Text>{user.bufferLocation}</Text></Button> */}
              <Input value={user.bufferQuantity} style={user.primaryPrefered == false ? styles.green : styles.default} onChangeText={(value) => { this.props.navigation.state.params.bufferQuantity = value; this.setState({total:String( parseInt(this.props.navigation.state.params.bufferQuantity) + parseInt( this.props.navigation.state.params.quantity ))}) }} />
            </Item>

            <Item>
              <Label>Total      :</Label>
              <Input value={ ''} disabled></Input>
              <Input value={ this.state.total} disabled></Input>
            </Item>
            <Item floatingLabel >
              <Label>Last Modified By</Label>
              <Input multiline={true} value={ '\nName : '+  user.updatedBy + '\n\nDate : '+ user.updatedDate} disabled/>
            
            </Item>
           
         
            
          </Form>
          <Button style={{backgroundColor:'red' , alignSelf:'center', marginTop: 20, marginBottom:20}} onPress={() => this.updateSNP()}><Text style={{color:'white'}}> Update SNP Information </Text></Button>
          <FAB buttonColor="red" iconTextColor="#FFFFFF" onClickAction={() => {this.props.navigation.navigate("ChatBot")}} visible={true} iconTextComponent={<Icon name="chat"/>}  style={{resizeMode : 'contain'}} /> 
          <Loading ref="loading" backgroundColor='#ffffffF2'
                    
                    indicatorColor='red'/>
          {/* <Toast ref="toast"
                    style={{backgroundColor:'red'}}
                    position='top'
                    positionValue={200}
                    fadeInDuration={750}
                    fadeOutDuration={1000}
                    opacity={0.8}
                    textStyle={{color:'white'}}/> */}

                     <Modal
          isVisible={this.state.visibleModal}
          
          animationIn={'slideInLeft'}
          animationOut={'slideOutRight'}
        >
        <View style={styles.modalContent}>
        <Image style={{justifyContent: 'center'}} style={{height : 400}} source={ this.getImage(user.bufferLocationImage)  } resizeMode = 'contain'  />
        
        <Button style={styles.button} onPress={() => this.setState({ visibleModal: false })}><Text style={{color:'white', size : 24 }}>Close</Text></Button>
        </View>
        
       
        </Modal>
        <Modal
          isVisible={this.state.primayModel}
          
          animationIn={'slideInLeft'}
          animationOut={'slideOutRight'}
        >
        <View style={styles.modalContent}>
       
        <Image style={{justifyContent: 'center'}} style={{height : 400}} source={ this.getImage(this.props.navigation.state.params.primaryLocationImage)  } resizeMode = 'contain' />
        
        <Button style={styles.button} onPress={() => this.setState({ primayModel: false })}><Text style={{color:'white', size : 24 }}>Close</Text></Button>
  
        </View>
        
       
        </Modal>
        </ScrollView>
      // </Container>
        )
      }
}
const styles = StyleSheet.create({
  default : {
    backgroundColor : 'lightgray',
    color : 'black',
    margin : 10
  },
  green : {
    backgroundColor : 'lightgreen',
    color : 'black',
    margin : 10
  },
  button: {
    backgroundColor: 'red',
    padding: 12,
    margin: 16,
    justifyContent: 'center',
    alignItems: 'flex-end',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  }

})