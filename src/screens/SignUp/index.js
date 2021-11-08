import React, {useState, useContext} from "react";
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {UserContext} from '../../contexts/UserContext';
import { 
    Container,
    InPutArea,
    CustomButton,
    CustomButtonText,
    SignMessageButton,
    SignMessageButtonText,
    SignMessageButtonTextBold } from "./style";

//import Api from '../../../src/Api';

import SignInput from "../../Components/SignInput";

import PersonIcon from '../../../assets/person.svg';
import EmailIcon from '../../../assets/email.svg';
import LockIcon from '../../../assets/lock.svg';




export default  () => {
    const {dispatch:userDispatch} = useContext(UserContext);
    const navigation = useNavigation();
    const [nameField,setNameField] = useState('');
    const [emailField,setEmailField] = useState ('');
    const [passwordField,setPasswordField] = useState('');
    
    const handleSignClick = async ()=>{
        if (nameField!=''&& emailField !== '' && passwordField !=''){
            
            let res = await Api.signUp(nameField,emailField,passwordField);
            console.log(res);
            if (res.token){
                await AsyncStorage.setItem('toke',res.token);

                userDispatch({type:'setAvatar', payload:{avatar: res.data.avatar}});

                navigation.reset({routes:[{name:'MainTab'}]});
            }else{
                alert('Erro: '+res.error);
            }

        }else{
            alert ("Preencha todos os campos");
        }

    }
    
    
    const handleMessageButtonClick =( )=>{
        navigation.reset({
            routes:[{name: 'SignIn'}]
        });

    }

    return (
        <Container>
           
           <InPutArea>

           <SignInput 
                    IconSvg= {PersonIcon} 
                    placeholder="Digite seu nome"
                    value={nameField}
                    onChangeText={t=>setNameField(t)}
                    /> 

                 <SignInput 
                    IconSvg= {EmailIcon} 
                    placeholder="Digite seu e-mail"
                    value={emailField}
                    onChangeText={t=>setEmailField(t)}
                    /> 

                 <SignInput 
                    IconSvg={LockIcon} 
                    placeholder="Digite sua senha"
                    value={passwordField}
                    onChangeText={t=>setPasswordField(t)}
                    password={true}
                    />                      

                <CustomButton onPress={handleSignClick}>
                    <CustomButtonText>Login</CustomButtonText>
                </CustomButton>
           </InPutArea>

            <SignMessageButton onPress={handleMessageButtonClick}>
                <SignMessageButtonText>Ainda não possui uma conta?</SignMessageButtonText>
                <SignMessageButtonTextBold>Cadastre-se</SignMessageButtonTextBold>
            </SignMessageButton>
        </Container>
    );
}