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
} from 'chart.js';

ChartJS.register(CategoryScale);
ChartJS.register(LinearScale);
ChartJS.register(PointElement);
ChartJS.register(LineElement);
ChartJS.register(Title);
ChartJS.register(SubTitle);
ChartJS.register(Tooltip);
ChartJS.register(Legend);

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
                color: "white",
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
                text: "Max at: " + props.maxAt,
                color: props.color,
                font: {
                    size: 12
                },
                padding: {
                    bottom: 20,
                },
                align: 'end'
            }
        }
    };

    return (
        <Line data={data} options={options} />
    )
}

export default SensorChart;