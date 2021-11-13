import React, { useState, useEffect } from "react";
import { Text } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Swiper from 'react-native-swiper';

import Stars from '../../Components/Stars';
import orderModal from '../../Components/OrderModal';


import BackIcon from '../../../assets/back.svg';
import NavprevIcon from '../../../assets/nav_prev.svg';
import NavNextIcon from '../../../assets/nav_next.svg';
import favoriteIcon from '../../../assets/favorite.svg';
import favoriteFullIcon from '../../../assets/favorite_full.svg';

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
    ServiceChooseBtnText,

    TestimonialArea,
    TestimonialInfo,
    TestimonialName,
    TestimonialItem,
    TestimonialBody

} from './style';

import Api from "../../Api";



export default ()=>{
    const navigation = useNavigation();
    const route= useRoute;

    const [userInfo, setUserInfo] = useState ({
        id: route.params.id,
        avatar: route.params.avatar,
        name: route.params.name,
        stars: route.params.stars
    });

    const [loading, setLoading] = useState(false);
    const [favorited, setFavorited] = useState(false);
    const [selectedService, setSelectedServide] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect( ()=>{
        const getBarberInfo = async ()=> {
            setLoading = (true);
            let json= await getBarber(userInfo.id);
            if (json.error == ''){
                setUserInfo(json.data);
                setFavorited(json.data.favorited);
            }else{
                console.log("Erro: "+json.error)
            }
            setLoading= (false);
        }
        getBarberInfo();
    }, [] );
            //fazer um layout com fotos 
        const handleBackButton = ()=>{
            navigation.goBack();
        }

        const handleFavClick =()=>{
            setFavorited (!favorited);
            Api.setFavorite(userInfo.id);
        }
        const handleServiceChoose =(key)=>{
                setSelectedServide(key);
                setShowModal(true);
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
                        <UserFavButton onPress={handleFavClick}>
                            {favorited ?

                                <favoriteFullIcon height="24" width="24" fill="#ff0000"/>
                                :
                                <favoriteIcon height="24" width="24" fill="#ff0000"/>

                            }
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
                                    <ServicePrice>R${item.price.toFixed(2)}</ServicePrice>
                                    </ServiceInfo>
                                    <ServiceChooseButton onPress={()=>handleServiceChoose(key)}>
                                        <ServiceChooseBtnText>Agendar</ServiceChooseBtnText>
                                    </ServiceChooseButton>
                                
                                </ServiceItem>

                            ))}     
                    
                     </ServiceArea>
                    }
                    {userInfo.testimonials && userInfo.testimonials.length > 0 && 
                            <TestimonialArea>
                               <Swiper
                                    style={{height: 110}}
                                    showsButtons={true}
                                    showsPagination={false}
                                    prevButton={<NavprevIcon width="35" height="35" fill="#000000"/>}
                                    nextButton={<NavNextIcon width="35" heigth="35" fill="#000000"/>}
                               >
                                   {userInfo.testimonials.map(( item, key )=>(
                                      
                                       <TestimonialItem key={key}>
                                           <TestimonialInfo>
                                               <TestimonialName>{item.name}</TestimonialName>
                                                <Stars stars={item.rate} showNumber={false}/>
                                           </TestimonialInfo>
                                            <TestimonialBody>
                                                {item.body}
                                            </TestimonialBody>
                                       </TestimonialItem>    
                                   ))}
                               </Swiper>
                            </TestimonialArea>
                    
                    }
                </PageBody>
           </Scroller>
           <BackButton onPress={handleBackButton}>
               <BackIcon width="44" height="44" fill="#FFFFFF"/>
           </BackButton>

           <orderModal
            show={showModal}
            setShow={setShowModal}
            user={userInfo}
            service={selectedService}
           />
       </Container>
    );
}