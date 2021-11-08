
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainStack from './src/stacks/MainStack';

import UserContextProvider from './src/contexts/UserContext';
export default  () => {
  return (
    //da acesso dentro de todo o app  as informações de usuario
    <UserContextProvider>
      <NavigationContainer>
        <MainStack/>
      </NavigationContainer>
    </UserContextProvider>
  );
}


