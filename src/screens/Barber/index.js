import React, { useState, useEffect } from "react";
import { Text } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Swiper from 'react-native-swiper';

import Stars from '../../Components/Stars';
import BackIcon from '../../../assets/back.svg';

import favoriteIcon from '../../../assets/favorite.svg';

import { 
    Container,
    Scroller,
    SwipeDot,
    SwipeDotActive,
    SwipeItem,
    SwipeImage,
    FakeSwiper,
    PageBody,
    UserInfoArea,
    ServiceArea,
    TestimonialArea,
    UserAvatar,
    UserInfo,
    UserInfoName,
    UserFavButton,
    BackButton,
    LoadingIcon,

    ServiceItem,
    ServiceInfo,
    ServiceName,
    ServicesTitle,
    ServicePrice,
    ServiceChooseButton,
    ServiceChooseBtnText

} from './style';

//import Api from "../../Api";



export default ()=>{
    const navigation = useNavigation();
    const route= useRoute;

    const [userInfo, setUserInfo] = useState ({
        id: route.params.id,
        avatar: route.params.avatar,
        name: route.params.name,
        stars: route.params.stars
    });

    const [loading, setloading] = useState(false);

    useEffect( ()=>{
        const getBarberInfo = async ()=> {
            setloading = (true);
            let json= await getBarber(userInfo.id);
            if (json.error == ''){
                setUserInfo(json.data);
            }else{
                console.log("Erro: "+json.error)
            }
            setloading= (false);
        }
        getBarberInfo();
    }, [] );
            //fazer um layout com fotos 
        const handleBackButton = ()=>{
            navigation.goBack();
        }

    return (
       <Container>
           
           <Scroller>
               
               { userInfo.photos && userinfo.photos.length > 0 ?
                    <Swiper
                        height={{height:240}}
                        dot={<SwipeDot/>}
                        activeDot={<SwipeDotActive/>}
                        paginationStyle={{top: 15, right: 15, bottom: null, left: null /*é necessário especificar todos os lados*/}}
                        autoplay={true}
                    >
                    {userInfo.photos.map((item,key)=>(
                        <SwipeItem key={key}>
                            <SwipeImage source={{uri:item.url}} resizeMode="cover"/>
                        </SwipeItem>



                    ))}

                    </Swiper>
                    :
                    <FakeSwiper>

                    </FakeSwiper>
                }
                <PageBody>
                    <UserInfoArea>
                        <UserAvatar source={{uri: userInfo.avatar}}/>
                        <UserInfo>
                            <UserInfoName>{userInfo.name}</UserInfoName>
                            <Stars stars={userInfo.stars} showNumber={true}/>
                        </UserInfo>
                        <UserFavButton>
                            <favoriteIcon height="24" width="24" fill="#ff0000"/>
                        </UserFavButton>
 
                    </UserInfoArea>
                            {loading &&
                                <loadingIcon size="large" color="#000000"/>
                             }

                    { userInfo.services &&
                        <ServiceArea>
                            <ServicesTitle>lista de Serviços</ServicesTitle>
                       
                            {userInfo.service.map((item,key)=>(
                              <ServiceItem key={key}>
                                    <ServiceInfo>
                                         <ServiceName>{item.name}</ServiceName>
                                    <ServicePrice>R${item.price}</ServicePrice>
                                    </ServiceInfo>
                                    <ServiceChooseButton>
                                        <ServiceChooseBtnText>Agendar</ServiceChooseBtnText>
                                    </ServiceChooseButton>
                                
                                </ServiceItem>

                            ))}     
                    
                     </ServiceArea>
                    }
                    <TestimonialArea>

                    </TestimonialArea>
                </PageBody>
           </Scroller>
           <BackButton onPress={handleBackButton}>
               <BackIcon width="44" height="44" fill="#FFFFFF"/>
           </BackButton>
       </Container>
    );
}