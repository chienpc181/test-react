import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    SubTitle,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';

ChartJS.register(CategoryScale);
ChartJS.register(LinearScale);
ChartJS.register(PointElement);
ChartJS.register(LineElement);
ChartJS.register(Title);
ChartJS.register(SubTitle);
ChartJS.register(Tooltip);
ChartJS.register(Legend);
ChartJS.register(Filler);

function SensorChart(props) {
    const data = {
        // labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        labels: props.labels,
        datasets: [
            {
                // label: 'Air quality',
                label: props.label,
                // data: [12, 19, 3, 5, 2, 3],
                data: props.data,
                // borderColor: 'rgb(75, 192, 192)',
                borderColor: props.color,
                backgroundColor: "rgba(75,192,192,0.2)",
                fill: true,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                display: false
            },
            title: {
                display: true,
                text: props.title,
                color: "#D0D0D0",
                font: {
                    size: 16
                },
                padding: {
                    bottom: 20,
                },
                // align: 'start'
            },
            subtitle: {
                display: true,
                text: "Unit: " + props.unit,
                color: props.color,
                font: {
                    size: 12
                },
                padding: {
                    bottom: 20,
                },
                align: 'end'
            }
        },
        scales: {
            y: {
                title: {
                    display: false,
                    text: props.unit,
                    color: props.color
                },
                min: props.minRange,
                max: props.maxRange,
            }
        }
    };

    return (
        <Line data={data} options={options} />
    )
}

export default SensorChart;