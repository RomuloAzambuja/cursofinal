import React from "react";
import { useNavigation, useState, useEffect } from '@react-navigation/native';
//verifica qual se android ou IOS
import { Platform , RefreshControl} from "react-native";
//bibliotecas que possibilitam pegar a localização
//bibliotecas que são diferentes do exemplo preciso refazer 
import {request, PERMISSIONS} from 'expo-permissions';



//import Api from "../../Api";

import {
    Container,
    Scroller,

    HeaderArea,
    HeaderTitle,
    SearchButton,

    LocationArea,
    LocationInput,
    LocationFinder, 
    
    LoadingIcon,
    ListArea

} from './style';

import BarberItem from '../../Components/BarberItem';
import SearchIcon from '../../../assets/search.svg';
import MyLocationIncon from '../../../assets/my_location.svg';


export default ()=>{

    const navigation = useNavigation();
    //salva as coordenadas inicialmente colocadas como null até terminar a implementação
    const [coords, setCoords] = useState ('null');
    const [locationText, setLocationText] = useState ('');
    const [loading, setLoading] = useState (false);
    const [list, setList] = useState ([]);
    const [refreshing, setRefreshing]=useState (false);

    const handleLocationFinder= ()=>{
        //verificar como funciona no expo
    //1º zerar qualquer coordenada armazenada ao clicar
        setCoords = (null);
        //2º solicitar permissão de acesso a localização do aparelho se ios ou android
        /*let result = await request (
            Platform.OS === "ios"?
                PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
                :
                PERMISSIONS.ANDROID.ACCES_FINE_LOCATION
        ); 

        if (result== 'granted'){
            
            setLoading(true);
            setLocationText('');
            setList([]);

            Geolocation.getCurrentPosition((info)=>{
                //utilizar o cosole.log(info); para ver se a permissão funciona no terminal e o formato dos dados
                setCoords(info.coords);
                //função para puxar na lista os barbeiros proximos
                getBarbers();
            });*/
        }

        const getBarbers =async ()=>{
                setLoading(true);
                setList([]);

                let lat= null;
                let lng= null;
                if (coords){
                    lat=coords.latitude;
                    lng=coords.longitude;
                };


                let res = await Api.getBarbers(lat,lng, locationText);
                if (res.error== ''){
                    if(res.loc){
                        setLocationText(res.loc);
                    }
                    setList(res.data);

                }else{
                    alert ('Error:'+res.error);
                }
                setLoading(false);


        }

        useEffect (()=>{
            getBarbers();
        },[]);

            //atualiza a lista de barbeiros 
        const onRefresh = () => {
            setRefreshing(false);
            getBarbers();
        }
        
        const handleLocationSearch =()=> {
            setCoords({});
            getBarbers();
        }

        return (
        <Container>
                <Scroller RefreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
                }>
                    <HeaderArea>
                        <HeaderTitle numberOfLine={2}>Encontre o Seu Barbeiro Favorito</HeaderTitle>
                        <SearchButton onPress={()=>navigation.navigate('Search')}>
                            <SearchIcon width="26" heigth="26" fill="#FFFFFF"/>
                        </SearchButton>
                    </HeaderArea>
                      
                    <LocationArea>
                        <LocationInput
                            placeholder="Onde você está?"
                            placeholderTextColor= "#FFFFFF"
                            value={locationText}
                            onChangeText ={t=>setLocationText(t)}
                        />
                        <LocationFinder onPress={handleLocationFinder}>
                            <MyLocationIncon width="24" heigth="24" fill="#FFFFFF"/>
                        </LocationFinder>
                    </LocationArea>
                    {loading &&
                    <LoadingIcon size="large" color="#FFFFFF"/>
                    }
                    <ListArea>
                        {list.map((item, k)=>(
                            <BarberItem key={k} data= {item}/>
                        ))}
                    </ListArea>
                </Scroller>
        </Container>
        );
    
}