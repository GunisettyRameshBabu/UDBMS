import React from 'react'
import {AsyncStorage, StyleSheet , View , Image , Text ,  TextInput, TouchableOpacity , Alert , EventEmitter,  ActivityIndicator, TouchableHighlight} 
from 'react-native'
import CheckBox from 'react-native-checkbox';
import PropTypes from 'prop-types';
import { Left } from 'native-base';
import Loading from 'react-native-whc-loading';
// import { Dropdown } from 'react-native-material-dropdown';
// import I18n from '../Language';

const language_list = [
    {value: "English", code: "en"},
    {value: "Japanese", code: "ja"},
  ]
export default class Login extends React.Component {
    static navigationOptions = {
        header: null
    }
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            emailError: '',
            password: '',
            passwordError: '' ,
            refreshing : false,
            rememberMe : false
          }
    }

    

     
    setName = (value) => {
        AsyncStorage.setItem('email', value);
        this.setState({ 'email': value });
     }

     setLoginId = (value) => {
        AsyncStorage.setItem('loginId', value);
        
     }

     setPassword = (value) => {
        AsyncStorage.setItem('password', value);
        this.setState({ 'password': value });
     }

     componentDidMount(){
        // EventEmitter.on("language_change", (language)=>{
        //   console.log("Language Set to Drawer: ", language);
        //   I18n.locale = language;
        //   //Actions.replace({key: "drawerMenu"});
        //   this.forceUpdate();
        // });
      }
    
    inputOnChange = (language_selected) => {
        console.log("Selected Language: ", language_selected);
        this.setState({language_selected: language_selected});
        //var language_code = "";
        for(item in language_list){
          if(language_list[item].value == language_selected){
            //language_code = language_list[item].code;
            //I18n.locale = language_code;
           // EventEmitter.emit("language_change", language_list[item].code);
            break;
          }
        }
      }
    
  

    componentWillMount()
    {
        AsyncStorage.getItem('email').then((value) => { this.setState({ 'email': value , rememberMe:true })})
     
      AsyncStorage.getItem('password').then((value) =>{ this.setState({ 'password': value })})
    // if (this.state.email != '') {
    //     this.setState({rememberMe:true})
    // }
    }
   
      changeUserdata(data, key) {
        // let userdetails = {...this.state};//this.state;
        // userdetails[key] = data;
        // this.setState(userdetails);
    }

    validateEmail = (text) => {
        Alert.alert(text,text);
        if (this.state.email.test(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)==0) {
            return true;
        } else {
            return false;
        }
        }

      login() {
       
          if(this.state.email == "" || this.state.email == undefined)
          {
           
            this.setState({emailError: 'Please Enter the VCN ID'})
          }
          else{
            //   if(this.validateEmail(this.state.email))
            //   {
            //     this.setState({emailError: 'Please Enter the valid email'})
            //   }
            //   else{
            //     this.setState({emailError: ''})
            //   }

           
          }

          if(this.state.password == "" || this.state.password == undefined)
          {
            
            this.setState({passwordError: 'Please Enter the password'})
          }
          else{
            this.setState({passwordError: ''})
          }
          
        
    
        // this.setState({
        //   emailError: emailError,
        //   passwordError: passwordError
        // })
        if ( this.state.email != '' && this.state.password != '' &&  this.state.email != undefined && this.state.password != undefined)  {
            this.refs.loading.show();
            fetch('http://buffermanagemetapi.azurewebsites.net/api/ValidateUser',{
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'username': this.state.email,
                    'password':this.state.password
                  },
            })
            .then((response) => response.json())
            .then((res) => { 
                
                this.refs.loading.show(false);
              if(res != null && res.Message != null)
              {
                  alert( res.Message)
              }
              else  
              {
                if (this.state.rememberMe) {
                    this.setName(this.state.email);
                    this.setPassword(this.state.password);
                }
                else{
                    AsyncStorage.removeItem('email');
                    AsyncStorage.removeItem('password');
                }
                this.setLoginId(this.state.email);
                this.props.navigation.navigate({ routeName: 'SuccessLogin' ,params : { name: res.name ,  userid:res.userid }});
              }
            })
            .catch(err => {
                alert(JSON.stringify(err));
                this.refs.loading.show(false);
            })
           
           
          }
         
      }

    render() {
        const { navigate } = this.props.navigation;
        // if(this.state.refreshing){
        //     return  <ActivityIndicator size="large"  color="red" style={{flex:1, alignItems:'center', justifyContent:'center'}} />
        // }
        return (
            <View style={styles.container}>
            
            <Text style={styles.textSize}>Welcome to Buffer Management</Text>
            <Image resizeMode="contain" style={styles.logo} source={require('../Images/UDTruck.png')} />
           
            <View style={styles.SectionStyle}>
 
 <Image source={require('../Images/user.jpg')} style={styles.ImageStyle} />
 <TextInput style={{flex:1}} 
            autoCapitalize="none" 
            onSubmitEditing={() => this.passwordInput.focus()} 
            autoCorrect={false} 
            keyboardType='email-address' 
            returnKeyType="next" 
            placeholder='VCN ID'
            underlineColorAndroid="transparent"
            value={this.state.email}
             onChangeText={value =>  this.setState({email: value.trim() , emailError : ''}) } />
            
  

 </View>
 <Text style={styles.errorMessage}>{this.state.emailError}</Text>

           
           <View style={styles.SectionStyle}>
 
 <Image source={require('../Images/password.png')} style={styles.ImageStyle} />
 <TextInput style={{flex:1}}   
           returnKeyType="go" 
           ref={(input)=> this.passwordInput = input} 
           placeholder='Password' 
           onChangeText={value => this.setState({password: value.trim(), passwordError : ''})}
           underlineColorAndroid="transparent"
           value={this.state.password}
           secureTextEntry/> 

            
</View>

<View > 
{/* <Dropdown 
data={language_list}
baseColor="rgba(83, 85, 86, 1)" 
                    labelFontSize={16}
                    style={{fontSize: 12, color: 'black' , flex:1 , alignItems:'flex-start',width:300,height:50}}
                    
                    onChangeText={(item) => {this.inputOnChange(item)}}
                  /> */}
<CheckBox
  label='Remember Me'
  checked = {this.state.rememberMe} 
  onChange={(checked) => this.setState({rememberMe:   !checked})}
/>
    </View>
           <Text style={styles.errorMessage}>{this.state.passwordError}</Text>
<TouchableOpacity style={styles.SubmitButtonStyle} activeOpacity = { .5 }
                  onPress={() =>
                    this.login() } >
          <Text  style={styles.TextStyle}>LOGIN</Text>
</TouchableOpacity> 
<Loading ref="loading" backgroundColor='#ffffffF2'
                    
                    indicatorColor='red'/>
           </View>)
      }
    }
  
      // define your styles
      const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            margin: 10 ,
            backgroundColor:'transparent',
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
            width : 100
          },
         
          TextStyle:{
              color:'#fff',
              textAlign:'center',
          },
        loginContainer:{
            alignItems: 'center',
            flexGrow: 1,
            justifyContent: 'center'
        },
        logo: {
           
            width: 300,
            height: 100
        },
        textSize: {
            fontSize: 18
        },
        searchSection: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff',
        },
        searchIcon: {
            padding: 10,
        },
        input: {
            width : 300,
        },
        buttonContainer:{
            backgroundColor: '#2980b6',
            paddingVertical: 15
        },
        buttonText:{
            color: '#fff',
            textAlign: 'center',
            fontWeight: '700',
            width : 100
        } ,
        errorMessage : {
            color : 'red'
        },
        SectionStyle: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff',
            borderWidth: .5,
            borderColor: '#000',
            height: 40,
            borderRadius: 5 ,
            margin: 10
        },
         
        ImageStyle: {
            padding: 10,
            margin: 5,
            height: 25,
            width: 25,
            resizeMode : 'stretch',
            alignItems: 'center'
        },
        submit:{
            marginRight:40,
            marginLeft:40,
            marginTop:10,
            paddingTop:20,
            paddingBottom:20,
            backgroundColor:'#68a0cf',
            borderRadius:10,
            borderWidth: 1,
            borderColor: '#fff'
          },
          submitText:{
              color:'#fff',
              textAlign:'center',
              fontWeight: '700',
           
          }
    
    },
        
        
        ); 