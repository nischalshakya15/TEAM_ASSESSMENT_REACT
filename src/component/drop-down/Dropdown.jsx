import React from "react";

class Dropdown extends React.Component {
    render() {
        return (
            <div>
                <select name="emails" id="emails" onChange={this.props.handleChange}>
                    <option value="none" key="none">Select the Trainee</option>
                    {
                        this.props.emails.map((data, key) => (
                            <option value={data} key={key}>{data}</option>
                        ))
                    }
                </select>
            </div>
        );
    }
}

export default Dropdown;
