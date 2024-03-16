import ChartComponet from "@/components/adminComponets/ChartComponet.jsx";
import DashboardCards from "@/components/adminComponets/DashboardCards.jsx";

function AdminHome() {
    return (
        <>
            <div className="flex flex-col h-full w-full ">
                <DashboardCards />
                <ChartComponet />
            </div>
        </>
    );
}

export default AdminHome;