import React from "react";

class AssessmentTable extends React.Component {
    render() {
        return (
            <div>
                <table>
                    <tbody>
                    <tr>
                        <th>Assessment Type</th>
                        <th>Average</th>
                    </tr>
                    {
                        this.props.assessmentData.map((data, key) => (
                            <tr key={key}>
                                <td>{data.assessment}</td>
                                <td>{data.average}</td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default AssessmentTable;
