import React from "react";


class Null extends React.Component {
  componentDidMount() {
    this.props.history.push(`/user`);
  }

  render() {
    return <div>redirecting</div>;
  }
}

export default Null;
