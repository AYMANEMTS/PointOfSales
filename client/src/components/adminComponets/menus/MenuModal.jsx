
import MenuForm from "@/components/adminComponets/menus/MenuForm.jsx";

function MenuModal({setContext,context}) {
    const closeModal = () => setContext({modal:false})
    return (
        <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                            <h3 className="text-3xl font-semibold">
                                {context.isUpdate?'Edit menu':'Créer un menu'}
                            </h3>
                            <button className="p-1 ml-8 bg-transparent  border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={closeModal}>
                                        <span className="bg-white text-gray-950  h-6 w-6 text-2xl block outline-none focus:outline-none">
                                          ×
                                        </span>
                            </button>
                        </div>
                        <div className=" p-6 flex-auto">
                            <MenuForm closeModal={closeModal} context={context} setContext={setContext}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-30 fixed inset-0 z-40 bg-black"></div>
        </>
    );
}

export default MenuModal;