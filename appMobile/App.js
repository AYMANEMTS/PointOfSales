
import Main from "./Layoys/Main";
import UserContext from "./context/UserContext";
import OrderContext from "./context/OrderContext";
import {ToastProvider} from "react-native-toast-notifications";
import {View} from "react-native";
import {QueryClient, QueryClientProvider} from "react-query";

export default function App(){
    const client = new QueryClient
  return (
      <QueryClientProvider client={client}>
          <UserContext>
              <OrderContext>
                  <ToastProvider renderType={{
                      custom_type: (toast) => (
                          <View style={{padding: 15, backgroundColor: 'grey'}}>
                              <Text>{toast.message}</Text>
                          </View>
                      )
                  }}>
                      <Main />
                  </ToastProvider>
              </OrderContext>
          </UserContext>
      </QueryClientProvider>

  )
}