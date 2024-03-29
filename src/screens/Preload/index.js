import React, {useEffect,useContext} from "react";
import { Container, LoadingIcon } from "./style";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {UserContext} from '../../contexts/UserContext';


//import Api from '../../Api';



export default  ()=> {
    const {dispatch:userDispatch} = useContext(UserContext);
    const navigation = useNavigation();

    useEffect(()=>{
        const checkToken = async ()=>{
            const token = await AsyncStorage.getItem('token');
            if (token!==null){
                let res = await Api.checkToken(token);
                if (res.token){
                    await AsyncStorage.setItem('toke',res.token);

                    userDispatch({type:'setAvatar', payload:{avatar: res.data.avatar}});
    
                    navigation.reset({routes:[{name:'MainTab'}]});
                }else{
                    navigation.navigate('SignIn');
                }
            }else{
                //fazer login
                navigation.navigate('SignIn');
            }



        }
        checkToken();

    },[]);



    return (
        <Container>
           
            <LoadingIcon size='large' color='white'/>
        </Container>
    );
}