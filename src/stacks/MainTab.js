import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { TabActions } from '@react-navigation/routers';


import CustomTabBar from '../Components/CustomTabBar';
import Home from '../screens/Home';
import Search from '../screens/Search';
import Appointments from '../screens/Appointments';
import Favorites from '../screens/Favorites';
import Profile from '../screens/Profile';

const tab = createBottomTabNavigator();

export default ()=>(
    <Tab.Navigator tabBar={props=><CustomTabBar{...props}/>}>
        <Tab.Screen name="Home" component={Home}/>
        <Tab.Screen name="Search" component={Search}/>
        <Tab.Screen name="Appointments" component={Appointments}/>
        <Tab.Screen name="Favorites" component={Favorites}/>
        <Tab.Screen name="Profile" component={Profile}/>
    </Tab.Navigator>


);