import {FlatList, Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {useQuery, useQueryClient} from "react-query";
import ServerApi from "../Api/ServerApi";
import {useOrderContext} from "../context/OrderContext";
import {useToast} from "react-native-toast-notifications";


function ModalAddMenusToCommand({AddMenusModel,setAddMenusModel,commandSelected}) {
    const {insertDetailItem,increaseCartItem,removeItemFromCart,cartItems,getTotalPrice,setCartItems} = useOrderContext()
    const {data: {data}=[]} = useQuery('menus',ServerApi.getMenus)
    const queryQlient = useQueryClient()
    const toast = useToast()
    const imagePath = (image) => 'http://192.168.1.7:8000/storage/menu_images/' + image.toString()
    const renderProductItem = ({ item }) => (
        <TouchableOpacity style={{padding:5}} onPress={() => increaseCartItem(item)} >
            <Image style={{width:70,height:70,borderRadius:8,borderColor:'black',borderWidth:1}} source={{uri:imagePath(item.image)}} alt={item.title}  />
        </TouchableOpacity>
    )
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
    const formData = cartItems.map((item) => {
        return {menu_id:item.menu.id,choices:item.detail}
    })

    const addMenusCallBack = async () => {
        const id = commandSelected.id
        try {
            await  ServerApi.addMenusToOrder(id,formData).then(({data}) => {
                if (data.success){
                    setAddMenusModel(false)
                    toast.show(data.message,{
                        type:'success',
                        placement:'top',
                        animationType:'slide-in'
                    })
                    queryQlient.invalidateQueries('commands')
                }else{
                    setAddMenusModel(false)
                    toast.show('Error '+data.message,{
                        type:'error',
                        placement:'top',
                        animationType:'slide-in'
                    })
                }
            }).catch((e) => console.log(e))
        }catch (e) {
            console.error(e)
        }
    }
    return (
        <View >
            <Modal
                animationType="slide"
                transparent={true}
                visible={AddMenusModel}
                onRequestClose={() => {
                    setAddMenusModel(false);
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
                            <TouchableOpacity style={{backgroundColor:'#2f3434',padding:5,borderRadius:5}}
                                              onPress={() => {
                                                  setCartItems([])
                                                  setAddMenusModel(false)
                                              }}>
                                <Text style={{fontWeight:'bold',fontSize:20,color:'white'}}>
                                    X
                                </Text>
                            </TouchableOpacity>

                        </View>
                        <Text style={{fontWeight:'bold',fontSize:22,marginTop:18}}>
                            Add Menus To Command N° {commandSelected?.number}
                        </Text>
                        <View style={{marginVertical:10}}>
                            <FlatList
                                horizontal={true}
                                data={data}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={renderProductItem}
                            />
                            <FlatList data={cartItems} renderItem={renderCartItems} style={{marginBottom:60}}/>

                        </View>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            // paddingHorizontal: 10,
                            paddingVertical: 20,


                        }}>
                            <View style={{flexDirection:'column',marginRight:15}}>
                                <Text style={{fontSize:15,fontWeight:'600'}}>
                                    Command Before total price : {commandSelected?.total}DH
                                </Text>
                                <Text style={{fontSize:15,fontWeight:'600'}}>
                                    Total Price for this Items : {getTotalPrice()}Dh
                                </Text>
                                <Text style={{fontSize:15,fontWeight:'600'}}>
                                    Total Price : { commandSelected?.total + getTotalPrice()}Dh
                                </Text>
                            </View>
                            <TouchableOpacity style={[{
                                backgroundColor: '#22BEF8',
                                padding: 8,
                                borderRadius:5 },(cartItems.length<1 && {backgroundColor: 'gray'})]}
                            disabled={cartItems.length<1} onPress={addMenusCallBack}>
                                <Text style={{color:'white'}}>
                                    Submit
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

})
export default ModalAddMenusToCommand;