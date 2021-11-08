import React from "react";

import styled from 'styled-components';


export const Container = styled.SafeAreaView`
    background-color: #dcedb9;
    flex: 1;
    justify-content: center;
    align-items:center;
`;
export const InPutArea = styled.View`
    width:100%;
    padding:40px;
`;

export const CustomButton = styled.TouchableOpacity`
    height: 60px;
    background-color: #cbd081;
    border-radius:30px;
    justify-content: center;
    align-items: center;

`;
export const CustomButtonText = styled.Text`
    font-size: 18px;
    color: #918868;
`;

export const SignMessageButton = styled.TouchableOpacity`
    flex-direction: row;
    justify-content:center;
    margin-top:50px;
    margin-bottom:20px;
`;
export const SignMessageButtonText = styled.Text`
    font-size:16px;
    color:#918868;
`;
export const SignMessageButtonTextBold = styled.Text`
    font-size:16px;
    color:#918868;
    font-weight:bold;
    margin-left:5px;
`;

