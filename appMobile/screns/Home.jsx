import React, {useEffect, useRef, useState} from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    FlatList,
    Image,
    TextInput,
    Pressable,
    Modal,
    Alert, ActivityIndicator
} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown'
import { Svg, Path } from 'react-native-svg';
import ServerApi from "../Api/ServerApi";
import {useOrderContext} from "../context/OrderContext";
import ModalRecipet from "../comp/ModalRecipet";
import {useToast} from "react-native-toast-notifications";
import {useUserContext} from "../context/UserContext";
import func from "../helpers/func";
const Home = () => {
    const [menus, setMenus] = useState([])
    const [tables, setTables] = useState([])
    const [selectTable, setSelectTable] = useState(null)
    const {isLoading,setIsLoading} = useUserContext()
    const toast = useToast()
    const { increaseCartItem , cartItems, removeItemFromCart , setCartItems,
        getTotalPrice , insertDetailItem} = useOrderContext()
    const tableDropDownRef = useRef();

    useEffect(() => {
        try {
            async function getData(){
                setIsLoading(true)
                await ServerApi.getMenus().then(({data}) => setMenus(data))
                    .catch((e) => {
                        console.log(e)
                        toast.show('Failed to get menus',{
                            type: 'danger',
                            placement: 'top',
                            animationType:'slide-in'
                        })
                    }).finally(() => setIsLoading(false))
                await ServerApi.getTables().then(({data}) => setTables(data?.tables))
                    .catch((e) => {
                        console.log(e)
                        toast.show('Failed to get menus', {
                            type: 'danger',
                            placement: 'top',
                            animationType: 'slide-in'
                        })
                    }).finally(() => setIsLoading(false))
            }
        }catch (e){
            console.log(`getMenus error : ${e}`)
        }

        getData()
    }, []);
    const imagePath = (image) => 'http://192.168.1.7:8000/storage/menu_images/' + image.toString()
    const renderProductItem = ({ item }) => (
        <TouchableOpacity style={styles.productItem}  onPress={() => increaseCartItem(item)} >
            <Image style={{width:70,height:70,borderRadius:8}} source={{uri:imagePath(item.image)}} alt={item.title}  />
        </TouchableOpacity>
    );
    const renderCartItems = (({item}) => {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {/* Image */}
                <Image
                    source={{uri:imagePath(item.menu.image)}}
                    style={{ width: 50, height: 50, marginRight: 10 }}
                />
                {/* Input Field */}
                <TextInput onChangeText={(text) => insertDetailItem(item.menu.id, item.DPN, text)}
                    style={{ flex: 1, height: 35, borderColor: 'gray', borderWidth: 1, marginRight: 10,borderRadius:5,padding:5 }}
                    placeholder="Enter text"
                />
                {/* Button */}
                <TouchableOpacity onPress={() => removeItemFromCart(item.menu.id,item.DPN)}
                    style={{ backgroundColor: 'red', padding: 8, borderRadius: 5 }}
                >
                    <Text style={{ color: 'white' ,fontWeight:'bold'}}>X</Text>
                </TouchableOpacity>
            </View>
        )
    })
    const SelectTable = () => {
        return (
            <SelectDropdown
                ref={tableDropDownRef}
                defaultButtonText={"Select table"}
                buttonStyle={{ width: 160, height: 35, borderRadius: 5 }}
                data={tables.map(table => ({ value: table.id, label: table.name }))}
                rowTextForSelection={(item, index) =>  item.label }
                buttonTextAfterSelection={(item) => item.label}
                onSelect={(selectedItem) => {
                    setSelectTable(selectedItem)
                    return selectedItem.label
                }}
            />

        );
    };
    const resetDropDownTable = () => tableDropDownRef.current?.reset()
    const [modalVisible, setModalVisible] = useState(false);
    if (isLoading){
        return (
            <View style={{
                flex:1,
                justifyContent:'center',
                alignItems:'center'
            }}>
                <ActivityIndicator size="large" />
            </View>
        )
    }
    const {playSound} = func
    const restFormDataOrder = () => {
        playSound()
        resetDropDownTable()
        setCartItems([])
        setSelectTable(null)
    }

    return (
        <>
            <View style={styles.container}>
                <View style={styles.leftSidebar}>
                    {/* Left Sidebar content */}
                    <FlatList
                        data={menus}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={renderProductItem}
                    />
                </View>
                {/* Main Content */}
                <View style={styles.mainContent}>
                    {/* Top Area */}
                    <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'space-between' }}>
                        {SelectTable()}
                        <TouchableOpacity style={{ backgroundColor: 'red', padding: 8, borderRadius: 5 }}
                                          onPress={() => restFormDataOrder()}>
                            <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width={20} height={20} fill="white">
                                <Path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                            </Svg>
                        </TouchableOpacity>
                    </View>
                    <View style={{ borderBottomWidth: 1, borderColor: 'gray', marginVertical: 10 }} />

                    {/* Main Area */}
                    <FlatList data={cartItems} renderItem={renderCartItems} style={{marginBottom:60}}/>

                </View>
                <View style={styles.bottomContent}>
                    {/* Bottom Content */}
                    <View style={{flex:1}}>
                        <Text>Prix Total : {getTotalPrice()}:Dh</Text>
                        <Text>Total Menus : {cartItems.length}</Text>
                    </View>
                    <TouchableOpacity
                        style={[
                            styles.processedButton,
                            (cartItems.length < 1 || selectTable === null) && styles.disabledButton
                        ]}
                        onPress={() => setModalVisible(true)}
                        disabled={selectTable === null || cartItems.length < 1 }
                    >
                        <Text style={{color: "white"}}>
                            Processed
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            {/* MODAL RECIPET */}
            <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <View style={{
                                flexDirection:"row",
                                alignItems:"center",
                                justifyContent:"space-around"
                            }}>
                                <Text style={{fontWeight:'bold',fontSize:22}}>
                                    Restaurant Aymane
                                </Text>
                                <TouchableOpacity style={{backgroundColor:'#2f3434',padding:8,borderRadius:5}}
                                onPress={() => setModalVisible(false)}>
                                    <Text style={{fontWeight:'bold',fontSize:22,color:'white'}}>
                                        X
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <Text style={{marginLeft:19,fontWeight:'bold'}}>
                                Table: {selectTable?.label}
                            </Text>
                            <ModalRecipet table_id={selectTable?.value} setModalVisible={setModalVisible} resetDropDownTable={resetDropDownTable}/>
                        </View>
                    </View>
                </Modal>
            </View>
        </>


    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: '100%',
    },
    leftSidebar: {
        width: 100,
        backgroundColor: '#EEEEEE',
        padding: 16,
    },
    mainContent: {
        flex: 1,
        backgroundColor: 'white',
        padding: 16,
    },
    bottomContent: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#EEEEEE',
        padding: 16,
        flexDirection: 'row'

    },
    productItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.76)'


    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 25,
        // alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: 'auto'
    },
    processedButton: {
        backgroundColor: '#22BEF8',
        padding: 8,
        borderRadius: 5,
    },
    disabledButton: {
        backgroundColor: 'gray', // Change to your desired color
        // Add any additional styles for the disabled state
    },


});

export default Home;
