import React from "react";

function HashtagList(props) {
  function generateCopyText() {
    let copyText = "";

    props.selectedHashtagSetNames.map((setName, index) => {
      if (copyText === "") {
        copyText += props.hashtagSets[setName].hashtags;
      } else {
        copyText += " " + props.hashtagSets[setName].hashtags;
      }
      return true;
    });
    return copyText;
  }

  return <div className="hashtagList">{generateCopyText()}</div>;
}

export default HashtagList;
