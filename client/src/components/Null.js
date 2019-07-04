import React, { useEffect } from "react";

function Null({ history }) {
  useEffect(() => {
    history.push(`/PendingApprovals`);
  }, []);

  return <></>;
}

export default Null;
