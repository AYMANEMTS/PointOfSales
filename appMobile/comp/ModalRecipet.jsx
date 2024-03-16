import React from "react";
import {View, Text, StyleSheet, ScrollView, TouchableOpacity} from "react-native";
import {useOrderContext} from "../context/OrderContext";
import {useUserContext} from "../context/UserContext";
import ServerApi from "../Api/ServerApi";
import {useToast} from "react-native-toast-notifications";
import {useQueryClient} from "react-query";
const ModalRecipet = ({table_id,setModalVisible,resetDropDownTable}) => {
    const {cartItems,getTotalPrice,setCartItems} = useOrderContext()
    const {user,setIsLoading} = useUserContext()
    const toast = useToast()
    const queryClient = useQueryClient()
    const sendOrder = async () => {
        const commandData = {
            user_id: user.id,
            table_id: table_id,
            total: getTotalPrice(),
            menu_choices: []
        }
        await cartItems.forEach((item) => {
            commandData.menu_choices.push({
                menu_id: item?.menu?.id,
                choices: item.detail
            })
        })
        setModalVisible(false)
        setCartItems([])
        resetDropDownTable()
        setIsLoading(true)
        await ServerApi.storeOrder(commandData).then(({data}) => {
            if (data.success){
                toast.show(data.message,{
                    type: 'success',
                    placement: 'top',
                    animationType:'slide-in'
                })
                queryClient.invalidateQueries('commands')
            } else {
                toast.show('Failed to send request',{
                    type: 'danger',
                    placement: 'top',
                    animationType:'slide-in'
                })
            }
        }).catch((e) => console.log(e)).finally(() => setIsLoading(false))
    }
    return (
        <>
            <View style={styles.table}>
                {/* Fixed Header */}
                <View style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#22BEF8",
                    borderRadius:5,
                    borderBottomColor:'black',
                    borderBottomWidth:2

                }}>
                    <Text style={styles.cell}>Menu</Text>
                    <Text style={styles.cell}>Choices</Text>
                    <Text style={styles.cell}>Sub price</Text>
                </View>

                {/* Scrollable Content */}
                <ScrollView>
                    <View>
                        {cartItems.map((item,key) => (
                            <View key={key} style={styles.row}>
                                <Text style={styles.cell}>{item.menu.title}</Text>
                                <Text style={styles.cell}>{item.detail}</Text>
                                <Text style={styles.cell}>{item.menu.price}DH</Text>
                            </View>
                        ))}
                    </View>
                </ScrollView>
            </View>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 10,
                paddingVertical: 20,


            }}>
                <Text style={{fontWeight:'bold',fontSize:18}}>
                    Total Price : {getTotalPrice()}DH
                </Text>
                <TouchableOpacity style={{
                    backgroundColor: '#22BEF8',
                    padding: 10,
                    borderRadius:5 }}
                onPress={() => sendOrder()}>
                    <Text style={{color:'white'}}>
                        Submit Order
                    </Text>
                </TouchableOpacity>
            </View>
        </>

    );
};

const styles = StyleSheet.create({
    table: {

        marginTop: 20,
        height:550
    },
    row: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    cell: {
        flex: 1,
        padding: 10,
        textAlign: "center",
        fontSize: 18,
        color: "black",

    },
});

export default ModalRecipet;
