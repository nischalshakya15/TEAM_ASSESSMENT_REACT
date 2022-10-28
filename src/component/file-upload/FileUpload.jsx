import React from "react";

class FileUpload extends React.Component {
    render() {
        return (
            <div>
                <input
                    type="file"
                    onChange={(e) => {
                        e.preventDefault();
                        this.props.onChange(e);
                    }}
                />
            </div>
        );
    }
}

export default FileUpload;
