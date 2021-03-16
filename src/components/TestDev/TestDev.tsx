// Import third-party
import React from 'react';

// Import globals
import {getProjects} from '../../global.d'

// Import components
import GraphCurveChart from '../GraphCurvesChart/GraphCurveChart'


const TestComponent: React.FC = () => {
    getProjects();

    return (
        <div>
            <h1>test</h1>
            <GraphCurveChart route="AAAAA"/>
        </div>
    )
}

export default TestComponent;
