import React from "react";
import FileUpload from "./component/file-upload/FileUpload";
import GroupAssessment from "./pages/GroupAssessment";
import IndividualAssessment from "./pages/IndividualAssessment";
import {TYPES as types} from "./constant/Variables";

class TeamAssessment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: "",
            activeId: "",
            showEmailDropDown: false
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleType = this.handleType.bind(this);
    }

    handleClick(e) {
        this.setState({file: e.target.files[0], activeId: 0});
    }

    handleType(key) {
        this.setState({activeId: key});
        switch (key) {
            case 0:
                this.setState({showEmailDropDown: false});
                break;
            case 1:
                this.setState({showEmailDropDown: true});
                break;
            default:
                break;
        }
    }

    render() {
        let assessmentType = Array.isArray(types)
            ? types.map((data, key) => (
                <li key={key}
                    onClick={this.handleType.bind(this, key)}
                    className={this.state.activeId === key ? "active" : undefined}>
                    {data}
                </li>
            )) : undefined;
        let assessmentComponent = !this.state.showEmailDropDown ?
            <GroupAssessment file={this.state.file}/> :
            <IndividualAssessment file={this.state.file}/>;

        return (
            <div className="container">
                <FileUpload onChange={this.handleClick}/>
                <ul className="assessment-navigation-ul">{assessmentType}</ul>
                <div>{assessmentComponent}</div>
            </div>
        );
    }
}

export default TeamAssessment;
