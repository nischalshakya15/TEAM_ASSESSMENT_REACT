import React from "react";
import AssessmentTable from "../component/table/AssessmentTable";
import Dropdown from "../component/drop-down/Dropdown";
import {getEmails} from "../service/EmailService";
import {
    getIndividualAverage,
    getIndividualAverageByEmail,
    getIndividualAverageOfAverage
} from "../service/IndividualAssessmentService";
import {ACCOUNTABILITY, ASSESSMENTS as assessments, COMMITMENT, CONFLICT, RESULT, TRUST} from "../constant/Variables";

class IndividualAssessment extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activeId: "",
            assessmentData: [],
            emails: [],
            email: ""
        }
        this.handleNavigationClick = this.handleNavigationClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        getEmails(this.props.file)
            .then((response) => this.setState({emails: response.data}));
    }

    setAssessmentData(response, filterType) {
        let assessmentType = response.data[0].assessment_result.filter(f => f.assessment_type === filterType);
        let result = assessmentType[assessmentType.length - 1].result;
        this.setState({assessmentData: result});
    }

    getAverageOfAverage() {
        getIndividualAverageOfAverage(this.props.file, this.state.email)
            .then((response) => {
                this.setState({assessmentData: response.data.result})
            });
    }

    getFiveStrongestArea() {
        getIndividualAverage(this.props.file, 'False', 'True', this.state.email)
            .then((response) => {
                let data = response.data;
                this.setState({assessmentData: data.splice((data.length - 1) - 5, data.length - 1)})
            });
    }

    getFiveWeakestArea() {
        getIndividualAverage(this.props.file, 'False', 'True', this.state.email)
            .then((response) => this.setState({assessmentData: response.data.splice(0, 6)}));
    }

    getAverageWithoutSortedAndGroup() {
        getIndividualAverage(this.props.file, 'False', 'False', this.state.email)
            .then((response) => this.setState({assessmentData: response.data}));
    }

    getTrustAverage() {
        getIndividualAverageByEmail(this.props.file, this.state.email)
            .then((response) => {
                this.setAssessmentData(response, TRUST);
            });
    }

    getConflictAverage() {
        getIndividualAverageByEmail(this.props.file, this.state.email)
            .then((response) => {
                this.setAssessmentData(response, CONFLICT);
            });
    }

    getCommitmentAverage() {
        getIndividualAverageByEmail(this.props.file, this.state.email)
            .then((response) => {
                this.setAssessmentData(response, COMMITMENT);
            });
    }

    getAccountabilityAverage() {
        getIndividualAverageByEmail(this.props.file, this.state.email)
            .then((response) => {
                this.setAssessmentData(response, ACCOUNTABILITY);
            });
    }

    getResultAverage() {
        getIndividualAverageByEmail(this.props.file, this.state.email)
            .then((response) => {
                this.setAssessmentData(response, RESULT);
            });
    }

    handleNavigationClick(key) {
        this.setState({activeId: key});
        if (this.state.email === 'none') {
            this.setState({assessmentData: []})
        } else {
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
                    this.getAverageWithoutSortedAndGroup();
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
                    this.getAccountabilityAverage()
                    break;
                case 8:
                    this.getResultAverage();
                    break;
                default:
                    break;
            }
        }
    }

    handleChange(e) {
        this.setState({email: e.target.value}, () => {
            if (this.state.activeId !== "") {
                this.handleNavigationClick(this.state.activeId);
            }
        })
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
                <Dropdown emails={this.state.emails} handleChange={this.handleChange}/>
                <ul className="assessment-navigation-ul">{assessmentList}</ul>
                <AssessmentTable assessmentData={this.state.assessmentData}/>
            </div>
        );
    }
}

export default IndividualAssessment;
