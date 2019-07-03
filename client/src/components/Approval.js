import React from "react";
import PropTypes from "prop-types";
import { authContext, adalApiFetch } from "../config/adalConfig";
const user = authContext.getCachedUser();
import NavBarAnother from "./presentationals/NavbarAnother";
import Table from "react-bootstrap/Table";
import { Modal, ButtonToolbar, Button, Alert } from "react-bootstrap";
import { Spinner } from "office-ui-fabric-react/lib/Spinner";

class Approval extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            serviceName: this.props.location.state.serviceName,
            clientId: this.props.location.state.clientId,
            environment: this.props.location.state.environment,
            requestedBy: this.props.location.state.requestedBy,
            clientDescription: this.props.location.state.clientDescription,
            akvDomainAccountKey: "",
            sapUsername: "",
            loading: false,
            loaded: false,
            disableInput: false,
            message: "Client Onboarded"
        };
    }
    handleFirstText(event) {
        this.setState({
            akvDomainAccountKey: event.target.value
        });
    }

    handleSecondText(event) {
        this.setState({
            sapUsername: event.target.value
        });
    }

    buttonClick(e) {
        this.setState({
            loaded: false            
        });

        let inp1 = this.state.akvDomainAccountKey.trim();
        let inp2 = this.state.sapUsername.trim();
        if (inp1 === "" || inp2 === "") {
            this.setState({
                loaded: true,
                message:"Please fill all the input fields"
            })            
            return;
        }
        this.setState({
            loading: true,
            disableInput: true,
        });
        var data = {
            serviceName: this.state.serviceName,
            clientId: this.state.clientId,
            AKVDomainAccountKey: inp1,
            SAPUsername: inp2,
            lastModifiedBy: user.userName
        };

        adalApiFetch(fetch, "/api/updaterequest", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Access-Control-Allow-Credentials": true,
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            }
        })
            .then(res => res.text())
            .then(
                result => {
                    this.setState({
                        loading: false,
                        loaded: true,
                        message:"Client Onbaorded"
                    });                    
                    setTimeout(() => {
                        this.props.history.push({
                            pathname: "/user"
                        });
                    }, 2000);
                },
                error => {
                    this.setState({
                        loading: false,
                        loaded: true,
                        message: "There was an error onboarding client"
                    });
                    console.log(error);
                }
            );

    }
    
    render() {
        return (
            <div>
                <NavBarAnother />

                <div className="container">
                    <div className="row">
                        <div className="col" />
                        <div className="col-9">
                            <Table responsive className="approveTableBody">
                                <thead>
                                    <tr>
                                        <th>Options</th>
                                        <th className="borderLeft">Details</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Service Name</td>
                                        <td className="borderLeft">{this.state.serviceName}</td>
                                    </tr>
                                    <tr>
                                        <td>ClientId:</td>
                                        <td className="borderLeft">{this.state.clientId}</td>
                                    </tr>
                                    <tr>
                                        <td>Environment:</td>
                                        <td className="borderLeft">{this.state.environment}</td>
                                    </tr>
                                    <tr>
                                        <td>RequestedBy:</td>
                                        <td className="borderLeft">{this.state.requestedBy}</td>
                                    </tr>
                                    <tr>
                                        <td>Client Description:</td>
                                        <td className="borderLeft">
                                            {this.state.clientDescription}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td> AKVDomainAccountKey:</td>
                                        <td className="borderLeft">
                                            <input
                                                disabled={this.state.disableInput}
                                                onChange={this.handleFirstText.bind(this)}
                                                type="text"
                                                className="form-control"
                                                id="usr"
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td> SAPUsername::</td>
                                        <td className="borderLeft">
                                            <input disabled={this.state.disableInput}
                                                onChange={this.handleSecondText.bind(this)}
                                                type="text"
                                                className="form-control"
                                                id="usr"
                                            />
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                        <div className="col" />
                    </div>
                    <div className="row">
                        <div className="col" />
                        <div className="col">
                            <Alert variant="primary" show={this.state.loading}>
                                <Spinner
                                    key="spin"
                                    label="Wait, wait..."
                                    ariaLive="assertive"
                                    labelPosition="right"
                                />
                            </Alert >
                            <Alert variant="primary" show={this.state.loaded}>
                                {this.state.message}
                            </Alert >
                            <button
                                onClick={this.buttonClick.bind(this)}
                                className="buttonstyle btn"
                            >
                                Approve
                            </button>
                        </div>
                        <div className="col" />
                    </div>
                </div>

            </div>
        );
    }
}

Approval.propTypes = {
    location: PropTypes.object
};

export default Approval;
