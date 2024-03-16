import {View, Text, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity} from "react-native";
import {useEffect, useState} from "react";
import ServerApi from "../Api/ServerApi";
import {useUserContext} from "../context/UserContext";
import {Path, Svg} from "react-native-svg";
import CommandDetails from "../comp/CommandDetails";
import {useToast} from "react-native-toast-notifications";
import {useQuery, useQueryClient} from "react-query";
import ModalAddMenusToCommand from "../comp/ModalAddMenusToCommand";
import {useOrderContext} from "../context/OrderContext";

export default function Detail(){
    const {isLoading} = useUserContext()
    const { setCartItems} = useOrderContext()
    const [CommandContext, setCommandContext] = useState({
        status:false,
        data:[]
    })
    const [commands, setCommands] = useState()
    const {data,isFetching} = useQuery('commands',ServerApi.getTodayCommands,{
        onSettled:(({data}) => {
            setCommands(data.commands)
        }),
    })
    const [AddMenusModel, setAddMenusModel] = useState(false)
    const [commandSelected, setCommandSelected] = useState(null)
    const toast = useToast()
    const queryClient = useQueryClient()
    if (isLoading||isFetching) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }
    const formatTime = (dateTimeString) => {
        const date = new Date(dateTimeString);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    };
    const renderItem = ({item}) => (
        <View style={styles.card}>
            <Text style={styles.title}>Cmnd N°{item.number}</Text>
            <Text>Table: {item.table.name}</Text>
            <Text>Server: {item.user.name}</Text>
            <Text>Time: {formatTime(item.created_at)}</Text>
            <Text>Total: {item.total}DH</Text>
            <View style={styles.buttonContainer}>
                {item.payed ? (
                    <TouchableOpacity style={styles.button} onPress={() => {
                        setCommandContext({status: true,data: item})
                    }}>
                        <Svg xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 512 512" width={30} height={20} fill={"white"}>
                            <Path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/>
                        </Svg>
                    </TouchableOpacity>
                ) : (
                    <>
                        <TouchableOpacity style={[styles.button,{backgroundColor: '#22BEF8'}]}
                                          onPress={() => {
                                              setCartItems([])
                                              setAddMenusModel(!AddMenusModel)
                                              setCommandSelected(item)
                                          }}>
                            <Text style={styles.buttonText}>+</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button,{backgroundColor: 'gray'}]}
                        onPress={() => markOrderPayedCall(item.id)}>
                            <Text style={styles.buttonText}>✅</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => {
                            setCommandContext({status: true,data: item})
                        }}>
                            <Svg xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 512 512" width={30} height={20} fill={"white"}>
                                <Path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/>
                            </Svg>
                        </TouchableOpacity>
                    </>
                )}

            </View>
        </View>
    );
    const currentDate = new Date();
    const formattedDateYY = currentDate.toLocaleDateString('en-GB').split('/').map((part, index) => index === 2 ? part.slice(-2) : part).join('/');
    const markOrderPayedCall = async (id) => {
        try {
            await ServerApi.markAsPayed(id).then(({data}) => {
                if (data.success){
                    toast.show(data.message, {
                        type: 'success',
                        placement: 'top',
                        animationType: 'slide-in'
                    })
                    queryClient.invalidateQueries('commands')
                }
            })
                .catch((e)=> console.log(e))
        }catch (e){console.log(e)}
    }

    return (
        <>
            <View style={styles.container}>
                <Text style={{
                    marginLeft:15,
                    marginVertical:10,
                    fontSize:18,
                    fontWeight:'bold'
                }}>Today Commands : {formattedDateYY}</Text>
                <FlatList
                    data={commands}
                    renderItem={renderItem}
                    keyExtractor={item => item.id.toString()}
                    numColumns={2}
                    contentContainerStyle={styles.listContainer}
                />
            </View>
            <CommandDetails setModalVisible={setCommandContext} modalVisible={CommandContext} />
            <ModalAddMenusToCommand AddMenusModel={AddMenusModel} setAddMenusModel={setAddMenusModel} commandSelected={commandSelected} />
        </>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    listContainer: {
        paddingHorizontal: 10,
    },
    card: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 8,
        margin: 5, // Adjust margin to manage spacing
        flex: 1, // This ensures the card expands to fill the available space
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        width: '30%',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize:19
    },
});