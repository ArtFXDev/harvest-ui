// Import third-party
import React, { useState, useEffect } from 'react';

// Import globals
import {getProjects, Project} from '../../global.d'

// Import components
import GraphCurveChart from '../GraphCurvesChart/GraphCurveChart'


const TestComponent: React.FC = () => {
    const [projects, setProjects] = useState<Array<Project>>([]);

    const graphInput = [
        {
            "key": "test",
            "minValue": 40,
            "maxValue": 50,
        }
    ]

    useEffect(() => {
        getProjects().then( (projectsList) => {
            setProjects(projectsList);
            console.log(projectsList)
        });
    }, []);

    return (
        <div>
            <h1>test</h1>
            <GraphCurveChart route="/zrgegr" inputInfos={ graphInput } />
        </div>
    )
}

export default TestComponent;
