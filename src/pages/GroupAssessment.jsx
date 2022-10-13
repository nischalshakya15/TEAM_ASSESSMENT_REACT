import React from "react";
import AssessmentTable from "../component/table/AssessmentTable";
import {
    getGroupAverage,
    getGroupAverageOfAverage,
    getGroupAverageWithoutSortedAndGroup
} from "../service/GroupAssessmentService";
import {ACCOUNTABILITY, ASSESSMENTS as assessments, COMMITMENT, CONFLICT, RESULT, TRUST} from "../constant/Variables";

class GroupAssessment extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activeId: "",
            assessmentData: [],
        }
        this.handleNavigationClick = this.handleNavigationClick.bind(this);
        this.setAssessmentData = this.setAssessmentData.bind(this);
    }

    getGroupAverageWithoutSortedAndGroup() {
        getGroupAverageWithoutSortedAndGroup(this.props.file, 'False', 'False')
            .then((response) => this.setState({assessmentData: response.data}));
    }

    getTrustAverage() {
        getGroupAverage(this.props.file)
            .then((response) => {
                this.setAssessmentData(response, TRUST);
            });
    }

    getConflictAverage() {
        getGroupAverage(this.props.file)
            .then((response) => {
                this.setAssessmentData(response, CONFLICT);
            });
    }

    getCommitmentAverage() {
        getGroupAverage(this.props.file)
            .then((response) => {
                this.setAssessmentData(response, COMMITMENT);
            });
    }

    getAccountabilityAverage() {
        getGroupAverage(this.props.file).then((response) => {
            this.setAssessmentData(response, ACCOUNTABILITY);
        });
    }

    getResultAverage() {
        getGroupAverage(this.props.file)
            .then((response) => {
                this.setAssessmentData(response, RESULT);
            });
    }

    getAverageOfAverage() {
        getGroupAverageOfAverage(this.props.file)
            .then((response) => {
                this.setState({assessmentData: response.data});
            });
    }

    getFiveWeakestArea() {
        getGroupAverageWithoutSortedAndGroup(this.props.file, 'False', 'True')
            .then((response) => this.setState({assessmentData: response.data.splice(0, 6)}));
    }

    getFiveStrongestArea() {
        getGroupAverageWithoutSortedAndGroup(this.props.file, 'False', 'True')
            .then((response) => {
                let data = response.data;
                this.setState({assessmentData: data.splice((data.length - 1) - 5, data.length - 1)})
            });
    }


    setAssessmentData(response, filterType) {
        let assessmentType = response.data.filter(f => f.assessment_type === filterType);
        let result = assessmentType[assessmentType.length - 1].result;
        this.setState({assessmentData: result});
    }


    handleNavigationClick(key) {
        this.setState({activeId: key});
        switch (key) {
            case 0:
                this.getAverageOfAverage();
                break;
            case 1:
                this.getFiveStrongestArea();
                break;
            case 2:
                this.getFiveWeakestArea();
                break;
            case 3:
                this.getGroupAverageWithoutSortedAndGroup();
                break;
            case 4:
                this.getTrustAverage();
                break;
            case 5:
                this.getConflictAverage();
                break;
            case 6:
                this.getCommitmentAverage();
                break;
            case 7:
                this.getAccountabilityAverage();
                break;
            case 8:
                this.getResultAverage();
                break;
            default:
                break;
        }
    }

    render() {
        let assessmentList =
            Array.isArray(assessments) ?
                assessments.map((data, key) => (
                    <li key={key}
                        onClick={this.handleNavigationClick.bind(this, key)}
                        className={this.state.activeId === key ? "active" : undefined}>
                        {data}
                    </li>
                )) : undefined;

        return (
            <div>
                <ul className="assessment-navigation-ul">{assessmentList}</ul>
                <AssessmentTable assessmentData={this.state.assessmentData}/>
            </div>
        );
    }
}

export default GroupAssessment;
