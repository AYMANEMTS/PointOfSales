import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ManualyForm from "@/components/adminComponets/Tables/ManualyForm.jsx";
import AutomaticForm from "@/components/adminComponets/Tables/AutomaticForm.jsx";

function TableModal({closeModal}) {
    return (
        <>
            <div  className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                            <h3 className="text-3xl font-semibold">
                                Modal Tables
                            </h3>
                            <button className="p-1 ml-8 bg-transparent  border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                       onClick={closeModal} >
                                        <span className="bg-white text-gray-950  h-6 w-6 text-2xl block outline-none focus:outline-none">
                                          ×
                                        </span>
                            </button>
                        </div>
                        <div className=" p-6 flex-auto">
                            <Tabs defaultValue="Manualy" className="w-[400px]">
                                <TabsList>
                                    <TabsTrigger value="Manualy">Manualy</TabsTrigger>
                                    <TabsTrigger value="Automatic">Automatic</TabsTrigger>
                                </TabsList>
                                <TabsContent value="Manualy">
                                    <ManualyForm closeModal={closeModal}/>
                                </TabsContent>
                                <TabsContent value="Automatic">
                                    <AutomaticForm closeModal={closeModal}/>
                                </TabsContent>
                            </Tabs>

                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-30 fixed inset-0 z-40 bg-black"></div>
        </>
    );
}

export default TableModal;