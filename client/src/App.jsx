import {RouterProvider} from "react-router-dom";
import {router} from "./routes/index.jsx";
import UserContext from "./context/UserContext.jsx";
import CashierCartItemsContext from "./context/CashierCartItemsContext.jsx";
import {Toaster} from "react-hot-toast";
import AdminContext from "@/context/AdminContext.jsx";

function App() {

  return (
      <UserContext>
          <AdminContext>
              <CashierCartItemsContext>
                  <RouterProvider router={router} />
                  <Toaster  />
              </CashierCartItemsContext>
          </AdminContext>
      </UserContext>
  )
}

export default App
