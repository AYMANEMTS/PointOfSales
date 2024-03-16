import {Modal, ScrollView,StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useEffect, useState} from "react";

function CommandDetails({setModalVisible,modalVisible,}) {
    const [data, setData] = useState([])
    useEffect(() => {
        if (modalVisible.data !== null){
            setData(modalVisible.data)
        }
    }, [modalVisible]);

    return (
        <View >
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible.status}
                onRequestClose={() => {
                    setModalVisible({status:false});
                }}
                >
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
                                              onPress={() => setModalVisible({status:false})}>
                                <Text style={{fontWeight:'bold',fontSize:22,color:'white'}}>
                                    X
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={{marginLeft:19,fontWeight:'bold'}}>
                            Command N°{data?.number}
                        </Text>
                        <Text style={{marginLeft:19,fontWeight:'bold'}}>
                            Table: {data?.table?.name}     |     Server : {data?.user?.name}
                        </Text>
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
                                    {data?.menus?.map((item,key) => (
                                        <View key={key} style={styles.row}>
                                            <Text style={styles.cell}>{item.title}</Text>
                                            <Text style={styles.cell}>{item.pivot?.choices}</Text>
                                            <Text style={styles.cell}>{item.price}DH</Text>
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
                                Total Price : {data?.total}DH
                            </Text>
                            <TouchableOpacity style={{
                                backgroundColor: '#22BEF8',
                                padding: 10,
                                borderRadius:5 }}
                                              >
                                <Text style={{color:'white'}}>
                                    Scan
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
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
})

export default CommandDetails;
