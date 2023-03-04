import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { red } from "@mui/material/colors";

ChartJS.register(CategoryScale);
ChartJS.register(LinearScale);
ChartJS.register(PointElement);
ChartJS.register(LineElement);
ChartJS.register(Title);
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
                fill: false,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                // text: 'Last 10 days'
                text: props.title
            }
        }
    };

    return (
        <Line data={data} options={options} />
    )
}

export default SensorChart;