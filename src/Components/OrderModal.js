import React from "react";
import styled from "styled-components";
import { useNavigation} from '@react-navigation/native';
import { Modal } from "react-native";

import ExpendIcon from '../../assets/expand.svg';
import NavPrevIcon from '../../assets/nav_prev.svg;'
import NavNextIcon from '../../assets/nav_next.svg;'
import ServerContext from "@react-navigation/native/lib/typescript/src/ServerContext";


const ModalArea = styled.View`
    flex: 1;
    background-color: rgba( 0, 0, 0, 0.5 );
    justify-content: flex-end;

`;

const ModalBody = styled.View`
    background-color: #dcedb9;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    min-height:300px;
    padding: 10 px 20px 40px 20px;
`;

const CloseButton = styled.TouchableOpacity`
    width: 40px;
    height: 40px;

`;
const ModalItem = styled.View`
    background-color: #d2e59e;
    border-radiu: 10px;
    margin-bottom: 15px;
    padding: 10px;

`;


const UserInfo = styled.View`
    flex-direction: row;
    align-items: center;

`;

const UserAvatar = styled.Image`
    width: 56px;
    height: 56px;
    border-radius: 20px;
    margin-right: 15px;
`;

const UserName = styled.Text`
    color: #000000;
    font-size: 18px;
    font-weight: bold;
`;

const ServiceInfo = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;
const ServiceName = styled.Text`
    font-size: 16px;
    font-weight: bold;
`;
const ServicePrice = styled.Text`
    font-size: 16px;
    font-weight: bold;
`;

const FinishButton = styled.TouchableOpacity`
    background-color: #cbd081;
    height: 60px;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
`;


const finishiButtonText = styled.Text`
    color: #918868;
    font-size: 17px;
    font-weight: bold;
`;

const DateInfo = styled.View`
    flex-direction: row;
`;

const DatePrevArea = styled.TouchableOpacity`
    flex: 1;
    justify-content: flex-end;
    align-items: flex-end;
`;

const DateTitleArea = styled.View`
    width: 140px;
    justifi-content: center;
    align-items: center;
`;

const DateTile = styled.Text`
    font-size:17px;
    font-weigth: bold;
    color: #000000;
`;

const NavNextArea = styled.TouchableOpacity`
    flex: 1;
    align-items: flex-start;
`;



const months  =[
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
];

const days = [
    'Dom',
    'Seg',
    'Ter',
    'Qua',
    'Qui',
    'Sex',
    'Sab'
];



export default ( show, setShow, user, service )=>{
    
    //const navigation = useNavigation=( );



    const handleCloseButton = ()=> {
        setShow (false);
    }

    const handleFinishClick =() =>{

    }
    
    return (


        <Modal
            transparent={true}
            visible={show}
            animationType="slide"
        >
            <ModalArea>
                <ModalBody>
                    <CloseButton onPress={handleCloseButton}>
                        <ExpendIcon width="40" height="40" fill="#000000"/>
                    </CloseButton>
                    <ModalItem>
                        <UserInfo>
                            <UserAvatar source={{uri: user.avatar}}/>
                            <UserName>{user.name}</UserName>
                        </UserInfo>
                    </ModalItem>
                    <ModalItem>
                        {service !=null &&
                            <ServiceInfo>
                                <ServiceName>
                                    {user.service[service].name}
                                </ServiceName>
                                <ServicePrice>R$ {user.service[service].price.toFixed(2)}</ServicePrice>
                            </ServiceInfo>
                        }
                        <FinishButton onPress={handleFinishClick}>
                            <finishiButtonText>Finalizar a Agendamento!</finishiButtonText>
                        </FinishButton>
                    </ModalItem>
                    <ModalItem>
                        <DateInfo>
                            <DatePrevArea>
                                <NavPrevIcon width="35" height="35" fill="#000000"/>
                            </DatePrevArea>
                            <DateTitleArea>
                                <DateTile>Novembro 2021</DateTile>
                            </DateTitleArea>

                            <DateNextArea>
                            <NavNextIcon width="35" height="35" fill="#000000"/>
                            </DateNextArea>
                        </DateInfo>
                    </ModalItem>
                </ModalBody>
            </ModalArea>

        </Modal>

    );

}
