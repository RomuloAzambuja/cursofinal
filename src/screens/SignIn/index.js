import React, {useState, useContext} from "react";
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UserContext} from '../../contexts/UserContext';
import { 
    Container,
    InPutArea,
    CustomButton,
    CustomButtonText,
    SignMessageButton,
    SignMessageButtonText,
    SignMessageButtonTextBold } from "./style";

import Api from "../../Api";

import SignInput from "../../Components/SignInput";

import EmailIcon from '../../../assets/email.svg';
import LockIcon from '../../../assets/lock.svg';



export default  () => {
    const {dispatch:userDispatch} = useContext(UserContext);
    const navigation = useNavigation();
    const [emailField,setEmailField] = useState ('');
    const [passwordField,setPasswordField] = useState('');
    
    const handleSignClick =async ()=>{
        if (emailField != '' && passwordField != ''){

            let json = await Api.signIn(emailField,passwordField);

            if(json.token){
                await AsyncStorage.setItem('toke',json.token);

                userDispatch({type:'setAvatar', payload:{avatar: json.data.avatar}});

                navigation.reset({routes:[{name:'MainTab'}]});

            }else{
                alert("e-mail ou senha errados")
            }

        }else{
            alert("Preencha os campos!");
        }
    }
    
    
    const handleMessageButtonClick =( )=>{
        navigation.reset({
            routes:[{name: 'SignUp'}]
        });

    }

    return (
        <Container>
           
           <InPutArea>
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