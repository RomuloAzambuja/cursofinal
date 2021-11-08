import React from "react";
import styled from "styled-components";


const InPutArea = styled.View`
    width:100%;
    height:60px;
    background-color:#d2e59e;
    flex-direction:row;
    border-radius:30px;
    padding-left:15px;
    align-items:center;
    margin-bottom:15px;
`;

const Input = styled.TextInput`
    flex: 1;
    font-size: 16px;
    color: #918868;
    margin-left:10px;
`;


export default ({IconSvg,placeholder,value,onChangeText,password}) => {
    return (
        <InPutArea>
        <IconSvg width="24" height="24" fill="#918868"/>
        <Input 
            placeholder={placeholder} 
            placeholderTextColor="#918868" 
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={password}
        />
        </InPutArea>
    );
}