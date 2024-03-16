
function EmptyMenus() {
    return (
        <>
          <div className="select-none bg-blue-gray-100 rounded-3xl flex flex-wrap content-center justify-center h-full opacity-25">
                <div className="w-full text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 inline-block" fill="none"
                         viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"/>
                    </svg>
                    <p className="text-xl">
                        YOU DONT HAVE
                        <br/>
                        ANY PRODUCTS TO SHOW
                    </p>
                </div>
            </div>
        </>
    );
}

export default EmptyMenus;
