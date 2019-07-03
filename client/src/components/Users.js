import React from "react";
import { Spinner } from "office-ui-fabric-react/lib/Spinner";
import PropTypes from "prop-types";
import { adalApiFetch } from "../config/adalConfig";
import NavBarAnother from "./presentationals/NavbarAnother";
import Table from "react-bootstrap/Table";

class Users extends React.Component {
  constructor(props) {
    super(props);
    let entriesInPage = 5;
    this.state = {
      currPage: 1,
      totalPages: "Math.ceil(temp.length / entriesInPage)",
      data: [],
      entriesInPage: entriesInPage,
      isLoaded: false
    };
  }

  componentDidMount() {
    adalApiFetch(fetch, "/api/pendingrequest", {
      method: "GET",
      headers: {
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            totalPages: Math.ceil(result.length / this.state.entriesInPage),
            data: result,
            isLoaded: true
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  handleApproveClick(
    serviceName,
    clientId,
    environment,
    requestedBy,
    clientDescription,
    e
  ) {
    e.preventDefault();
    this.props.history.push({
      pathname: "/approval",
      state: {
        serviceName: serviceName,
        clientId: clientId,
        environment: environment,
        requestedBy: requestedBy,
        clientDescription: clientDescription
      }
    });
  }

  renderRow() {
    if (this.state.isLoaded === true) {
      let children = [];
      let startPoint = (this.state.currPage - 1) * this.state.entriesInPage;
      let endPoint = startPoint + this.state.entriesInPage;
      for (
        let i = startPoint;
        i < endPoint && i < this.state.data.length;
        i++
      ) {
        let data = this.state.data[i];
        children.push(
          <tr key={i}>
            <td>{data.PartitionKey}</td>
            <td>{data.RowKey}</td>
            <td>{data.Environment}</td>
            <td>{data.EmailId}</td>
            <td>{data.AADClientDescription}</td>
            <td>
              <button
                onClick={e =>
                  this.handleApproveClick(
                    data.PartitionKey,
                    data.RowKey,
                    data.Environment,
                    data.EmailId,
                    data.AADClientDescription,
                    e
                  )
                }
                className="buttonstyle btn"
              >
                Onboard
              </button>
            </td>
          </tr>
        );
      }
      return children;
    }
  }

  loading() {
    let children = [];
    if (this.state.isLoaded === false) {
      children.push(
        <Spinner
          key="spin"
          label="Wait, wait..."
          ariaLive="assertive"
          labelPosition="right"
        />
      );
      return children;
    }
  }

  createPagination(cPage, tPage) {
    // parent element is ul element and child element is the li
    let parent = [];
    let children = [];
    for (let j = 1; j <= tPage; j++) {
      if (j === cPage) {
        children.push(
          <li key={j} className="page-item active">
            <a
              onClick={e => this.handleClick(j, e)}
              className="page-link"
            >{`${j}`}</a>
          </li>
        );
      } else {
        children.push(
          <li key={j} className="page-item">
            <a
              onClick={e => this.handleClick(j, e)}
              className="page-link"
            >{`${j}`}</a>
          </li>
        );
      }
    }
    parent.push(
      <ul key={"list"} className="pagination justify-content-center">
        {children}
      </ul>
    );

    return parent;
  }

  handleClick(i, e) {
    e.preventDefault();
    this.setState({
      currPage: i
    });
  }

  //     <tr key={i}>
  //     <td>{data.PartitionKey}</td>
  //     <td>{data.RowKey}</td>
  //     <td>{data.Environment}</td>
  //     <td>{data.EmailId}</td>
  //     <td>{data.AADClientDescription}</td>
  //     <td><a onClick={(e) => this.handleApproveClick(data.PartitionKey, data.RowKey, data.Environment, data.EmailId, data.AADClientDescription, e)} className="btn">Approve</a></td>
  // </tr>

  // render() {
  //     return (
  //         <div>
  //             <NavBarAnother/>
  //             <table className="responstable">
  //                 <thead>
  //                     <tr>
  //                         <th>Service Name</th>
  //                         <th data-th="Driver details"><span>Client Id</span></th>
  //                         <th>Environment</th>
  //                         <th>Requested By</th>
  //                         <th>Client Description</th>
  //                         <th>Approve</th>
  //                     </tr>
  //                 </thead>
  //                 <tbody>

  //                     {this.renderRow()}
  //                 </tbody>
  //             </table>
  //             {this.loading()}
  //             {this.createPagination(this.state.currPage, this.state.totalPages)}
  //         </div>
  //     )
  // }

  // <tr>
  //                             <td>Abc</td>
  //                             <td>Abc</td>
  //                             <td>Abc</td>
  //                             <td>Abc</td>
  //                             <td>Abc</td>
  //                             <td>
  //                                 <button className="buttonstyle btn">
  //                                     Approve
  //                             </button>
  //                             </td>
  //                         </tr>

  render() {
    return (
      <div>
        <NavBarAnother />
        <div className="container">
          <Table responsive className="approveTableBody">
            <thead>
              <tr>
                <th>Service Name</th>
                <th>Client Id</th>
                <th>Environment</th>
                <th>Requested By</th>
                <th>Client Desc</th>
                <th>Approve</th>
              </tr>
            </thead>
            <tbody>{this.renderRow()}</tbody>
          </Table>
        </div>
        {this.loading()}
        {this.createPagination(this.state.currPage, this.state.totalPages)}
      </div>
    );
  }
}

Users.propTypes = {
  history: PropTypes.object
};

export default Users;
