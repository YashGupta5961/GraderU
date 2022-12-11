import "../Graph/styles/graph.scss";
import { Bar } from "react-chartjs-2";
import React from "react";
import { CategoryScale, LinearScale, BarElement, Chart } from "chart.js";

Chart.register(CategoryScale);
Chart.register(LinearScale);
Chart.register(BarElement);



function GraphComponent(props) {

    const chartData = {
        labels: ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C+', 'D+', 'D', 'D-', 'F'],
        // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
        datasets: [
            {
              label: 'Grade Distribution',
            //   data: [55, 96, 23, 11],
              data: props.distribution,
              borderColor: "black",
              borderWidth: 1,
            }
        ]
    }



    return (
        <div>

            <h1 className="heading"> {props.subject} {props.number}: {props.name} </h1>
            <div className = "gradeChart">
                <Bar
                    data={chartData}
                    options={{
                        plugins: {
                            title: {
                                display: true,
                                text: `Grade distribution for {props.profName}`,
                                position: "bottom"
                            },
                            legend: {
                                display: true
                            }
                        }
                    }}
                />
            </div>
                <h3 className="heading">Grade Distribution for {props.profName}</h3>

        </div> 
    )
}

export default GraphComponent;

// GraphComponent.propTypes = {
    // distribution: PropTypes.arrayOf(PropTypes.number).isRequired,
    // subject: PropTypes.string.isRequired,
    // number: PropTypes.number.isRequired,
    // name: PropTypes.string.isRequired,
    // profName: PropTypes.string.isRequired
// }