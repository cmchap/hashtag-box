import React from "react";

import Set from "./Set.js";

function SetList(props) {
  return (
    <div className="setList">
      {Object.keys(props.hashtagSets).map(function(setName) {
        return (
          <Set
            key={setName}
            name={props.hashtagSets[setName].name}
            hashtags={props.hashtagSets[setName].hashtags}
            selectedHashtagSetNames={props.selectedHashtagSetNames}
            isEditing={props.isEditing}
            handleSetSelectionChange={props.handleSetSelectionChange}
            deleteHashtagSet={props.deleteHashtagSet}
          />
        );
      })}
    </div>
  );
}

export default SetList;
