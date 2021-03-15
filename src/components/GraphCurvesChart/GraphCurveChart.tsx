// Import third-party
import React, { useState, useEffect } from 'react';
import { ResponsiveContainer, CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis, ReferenceLine } from 'recharts';

// Import global variables
import { PROJECTS, Project, projectNameToUpperCase} from "../../global.d";

// import sytle
import styles from './GraphCurveChart.module.scss';

// Initialise dates
const startTime = (+ new Date(2021, 1, 23));
const deadline = (+ new Date(2021, 5, 2));


// Format timestamp to MM/DD/YYYY
function formatTimestamp(unixTime: number): string {
    return (new Date(unixTime)).toLocaleDateString("en-US");
}

// Interface for the infos about each curves
interface InputInfos {
    key: string;
    minValue: number;
    maxValue: number;
}

// All the props
interface Props {
    route?: string;
    sampleKey: string;
    // inputInfos: Array<InputInfos>;
}

const defaultProps: Props = {
    route: "/",
    sampleKey: "timestamp",
}

// COMPONENT - Display graph from given API url
const GraphCurveChart: React.FC<Props> = (props: Props = defaultProps) => {
    const [data, setData] = useState<Array<any> | undefined>([]);
    console.log(props.route)
    console.log(props.sampleKey)

    return (
    <div className="chartContainerWide">
        <ResponsiveContainer width="100%" height="100%">
            <LineChart
                width={800}
                height={500}
                data={data}
                className="chart"
                margin={{
                    top: 20,
                    right: 20,
                    left: 20,
                    bottom: 20,
                }}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis
                    type="number"
                    domain={[startTime, deadline]}
                    dataKey="timestamp"
                    tickFormatter={formatTimestamp}
                    scale="linear"
                    interval="preserveStartEnd"
                    label={{
                        value: "Time",
                        position: "insideBottom",
                    }}
                />

                <YAxis
                    type="number"
                    domain={[0, 100]}
                    tickFormatter={value => `${value}%`}
                    label={{
                        value: "% of frames rendered",
                        angle: "-90",
                        position: "insideLeft",
                        textAnchor: "middle"
                    }}
                />

                {/* Format tooltip with the real number of frames */}
                <Tooltip
                    formatter={(value: any, projectName: any) => {
                    const totalFrames = (PROJECTS as any | undefined).find((pr: Project) => pr.name === projectName).totalFrames ?? 1;
                    return `${Math.floor((value / 100) * totalFrames)} frames`;
                    }}
                    labelFormatter={formatTimestamp}
                />

                <ReferenceLine
                    label="Goal"
                    stroke="red"
                    strokeDasharray="3 3"
                    segment={[{ x: startTime, y: 0 }, { x: deadline, y: 100 }]}
                    ifOverflow="extendDomain"
                />
            </LineChart>
        </ResponsiveContainer>
    </div>
    )
};

export default GraphCurveChart;
