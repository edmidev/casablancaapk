import React, { useContext, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Platform, TouchableOpacity, View } from 'react-native';
import { COLORS, ROUTES, IMGS } from '../constants';
import { CreateRecord, VerifyRecord, ReportOutput, Dashboard, ScanQR, CreateRecordForm, Profile, ScanCodebar } from '../screens';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomTabBarButton from '../components/CustomTabBarButton';
import CustomTabBar from '../components/CustomTabBar';
import { useNavigation } from '@react-navigation/native';

import HorizontalLogo from '../assets/images/logo_horizontal.svg';
import BtnHome from '../assets/images/btn_home.svg';
import BtnPerfil from '../assets/images/btn_perfil.svg';
import BtnIngresos from '../assets/images/btn_ingresos.svg';
import BtnVerificacion from '../assets/images/btn_verificacion.svg';
import BtnSalidas from '../assets/images/btn_salidas.svg';
import BtnLogout from '../assets/images/btn_logout.svg'
import IconOffilne from '../assets/images/icon_offline.svg'
import { AuthContext } from '../context/AuthContext';
import { VerificationContext } from '../context/VerificationContext';

const Tab = createBottomTabNavigator();

function BottomTabNavigator({ navigation, route }) {    
    const { logout } = useContext(AuthContext)
    const { isConected } = useContext(VerificationContext)

    useEffect(() => {
        const focusHandler = navigation.addListener('focus', () => {
            switch (route.name) {
                case ROUTES.CREATE_RECORD + 'd':
                    navigation.navigate(ROUTES.CREATE_RECORD)
                    break;

                case ROUTES.REPORT_OUTPUT + 'd':
                    navigation.navigate(ROUTES.REPORT_OUTPUT)
                    break;

                case ROUTES.HOME + 'd':
                    navigation.navigate(ROUTES.HOME)
                    break;

                case ROUTES.VERIFY_RECORD + 'd':
                    navigation.navigate(ROUTES.VERIFY_RECORD)
                    break;

                case ROUTES.PROFILE + 'd':
                    navigation.navigate(ROUTES.PROFILE)
                    break;

                default:
                    navigation.navigate(ROUTES.HOME)
                    break;
            }
        });

        return focusHandler;
    }, [navigation])

    return (
        <Tab.Navigator
            tabBar={props => <CustomTabBar {...props} />}
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarShowLabel: false,
                tabBarInactiveTintColor: COLORS.dark,
                tabBarStyle: styles.tabBarStyle,
                tabBarActiveTintColor: COLORS.primary,
                tabBarIconStyle: styles.tabBarIconStyle,
                tabBarIcon: ({ color, size, focused }) => {                    
                    if (route.name === ROUTES.DASHBOARD) {
                        return <BtnHome width={35} height={35} style={styles.mr7} fill={(focused) ? COLORS.secondary : '#000'}/>
                    } else if (route.name === ROUTES.PROFILE) {
                        return <BtnPerfil width={35} height={35} style={styles.mr7} fill={(focused) ? COLORS.secondary : '#000'}/>
                    } else if (route.name === ROUTES.CREATE_RECORD) {
                        return <BtnIngresos width={35} height={35} style={styles.mr7} fill={(focused) ? COLORS.secondary : '#000'}/>
                    } else if (route.name === ROUTES.VERIFY_RECORD) {
                        return <BtnVerificacion width={35} height={35} style={styles.mr7} fill={(focused) ? COLORS.secondary : '#000'}/>
                    } else if (route.name === ROUTES.REPORT_OUTPUT) {
                        return <BtnSalidas width={35} height={35} style={styles.mr7} fill={(focused) ? COLORS.secondary : '#000'}/>
                    }
                },
                header: () => {
                    return (
                        <View style={styles.header}>
                            {
                                !isConected && <TouchableOpacity onPress={() => logout()} style={styles.BtnConnection} >
                                    <View>
                                        <IconOffilne width={15} height={15} fill='#f44336'/>
                                    </View>
                                </TouchableOpacity>
                            }
                            <View>
                                <HorizontalLogo width={200} height={70} />
                            </View>
                            <TouchableOpacity onPress={() => logout()} style={styles.BtnLogout} >
                                <View>
                                    <BtnLogout width={25} height={25} fill='#000'/>
                                </View>
                            </TouchableOpacity>
                        </View>
                    );
                }
            })}>
            <Tab.Screen
                name={ROUTES.DASHBOARD}
                component={Dashboard}
                options={{
                    headerShown: true,
                    tabBarButton: props => <CustomTabBarButton route="home" {...props} />,
                }}
            />
            <Tab.Screen
                name={ROUTES.PROFILE}
                component={Profile}
                options={{
                    headerShown: true,
                    tabBarButton: props => <CustomTabBarButton route="home" {...props} />,
                }}
            />
            <Tab.Screen
                name={ROUTES.CREATE_RECORD}
                component={CreateRecord}
                options={{
                    headerShown: true,
                    tabBarButton: props => <CustomTabBarButton {...props} />,
                }}
            />
            <Tab.Screen
                name={ROUTES.VERIFY_RECORD}
                component={VerifyRecord}
                options={{
                    headerShown: true,
                    tabBarButton: props => <CustomTabBarButton {...props} />,
                }}
                initialParams={{ code: null }}
            />
            <Tab.Screen
                name={ROUTES.REPORT_OUTPUT}
                component={ReportOutput}
                options={{
                    headerShown: true,
                    tabBarButton: props => (
                        <CustomTabBarButton route="settings" {...props} />
                    ),
                }}
                initialParams={{ origin: '' }}
            />
            <Tab.Screen
                name={ROUTES.SCAN_QR}
                component={ScanQR}
                options={{
                    headerShown: true,
                    tabBarButton: props => (
                        <CustomTabBarButton route="settings" {...props} hide={true} />
                    ),
                }}
                initialParams={{ origin: '' }}
            />
            <Tab.Screen
                name={ROUTES.SCAN_CODEBAR}
                component={ScanCodebar}
                options={{
                    headerShown: true,
                    tabBarButton: props => (
                        <CustomTabBarButton route="settings" {...props} hide={true} />
                    ),
                }}
                initialParams={{ origin: '' }}
            />
            <Tab.Screen
                name={ROUTES.CREATE_RECORD_FORM}
                component={CreateRecordForm}
                options={{
                    headerShown: true,
                    tabBarButton: props => (
                        <CustomTabBarButton route="settings" {...props} hide={true} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

export default BottomTabNavigator;

const styles = StyleSheet.create({
    tabBarStyle: {
        position: 'absolute',        
        borderTopWidth: 1,
        bottom: 0,
        // right: 10,
        // left: 10,
        height: 92,
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.white        
    },
    BtnLogout: {
        position: 'absolute',
        right: 10
    },
    BtnConnection: {
        position: 'absolute',
        left: 10
    },
});
