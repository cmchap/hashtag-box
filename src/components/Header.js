import React from "react";

function Header(props) {
  return (
    <div className="header">
      <div className="header-elelement header-left">
        <span onClick={props.getHashtagSets}>Refresh</span>
      </div>
      <div className="header-elelement header-center">
        <span>#HashtagBox</span>
      </div>
      <div className="header-elelement header-right">
        <span onClick={props.handleEditToggle}>
          {props.isEditing ? "Done" : "Edit"}
        </span>
      </div>
    </div>
  );
}

export default Header;
