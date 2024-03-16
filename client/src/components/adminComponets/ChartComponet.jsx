
import Chart from "react-apexcharts";
import { Square3Stack3DIcon } from "@heroicons/react/24/outline";
import {Card, CardContent, CardHeader} from "@/components/ui/card.jsx";
import {Button} from "@/components/ui/button.jsx";
const chartConfig = {
    type: "bar",
    height: 280,
    series: [
        {
            name: "Ventes",
            data: [50, 40, 300, 200, 230, 500,800],
        },
    ],
    options: {
        chart: {
            toolbar: {
                show: false,
            },
        },
        title: {
            show: "",
        },
        dataLabels: {
            enabled: false,
        },
        colors: ["#1037e0"],
        plotOptions: {
            bar: {
                columnWidth: "40%",
                borderRadius: 2,
            },
        },
        xaxis: {
            axisTicks: {
                show: false,
            },
            axisBorder: {
                show: false,
            },
            labels: {
                style: {
                    colors: "#616161",
                    fontSize: "12px",
                    fontFamily: "inherit",
                    fontWeight: 400,
                },
            },
            categories: [
                "Lundi",
                "Mardi",
                "Mercredi",
                "Jeudi",
                "Vendredi",
                "Samedi",
                "Dimanche",
            ],
        },
        yaxis: {
            labels: {
                style: {
                    colors: "#616161",
                    fontSize: "12px",
                    fontFamily: "inherit",
                    fontWeight: 400,
                },
            },
        },
        grid: {
            show: true,
            borderColor: "#dddddd",
            strokeDashArray: 5,
            xaxis: {
                lines: {
                    show: true,
                },
            },
            padding: {
                top: 5,
                right: 20,
            },
        },
        fill: {
            opacity: 0.8,
        },
        tooltip: {
            theme: "dark",
        },
    },
};

export default function ChartComponet() {
    return (
        <Card className={"m-3"}>
            <CardHeader
                color="transparent"
                className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
            >
                <div className="flex-grow ml-auto text-2xl font-semibold">Top Ventes par jour</div>
                <div className={"text-2xl font-semibold"}>Janvier semaine 3</div>

            </CardHeader>
            <CardContent className="px-2 pb-0">
                <Chart {...chartConfig} />
            </CardContent>
        </Card>
    );
}