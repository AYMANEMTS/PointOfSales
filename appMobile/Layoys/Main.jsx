import React, {useEffect, useState} from 'react';
import {NavigationContainer} from "@react-navigation/native";
import Home from "../screns/Home";
import Detail from "../screns/Detail";
import Login from "../comp/Login";
import {useUserContext} from "../context/UserContext";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {ActivityIndicator, View} from "react-native";
import Settings from "../screns/Settings";

function Main() {
    const Tab = createBottomTabNavigator();
    const {token} = useUserContext()

    return (
        <>
            {token ? (
                    <NavigationContainer>
                        <Tab.Navigator>
                            <Tab.Screen name="Orders" component={Home} />
                            <Tab.Screen name="Commands" component={Detail} />
                            <Tab.Screen name="Settings" component={Settings} />
                        </Tab.Navigator>
                    </NavigationContainer>
                ) :  <Login />
            }
        </>
    );
}
export default Main;