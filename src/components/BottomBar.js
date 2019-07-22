import React from "react";
import { Button, message } from "antd";
import FixedBottom from "../react-fixed-bottom";
import { CopyToClipboard } from "react-copy-to-clipboard";

function BottomBar(props) {
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

  const success = () => {
    message.success(`Copied ${props.count} hashtags`, 1);
    console.log(generateCopyText());
  };
  return (
    <FixedBottom offset={0}>
      <CopyToClipboard text={generateCopyText()} onCopy={() => success()}>
        <Button type="primary" size="large">
          Copy{" "}
          {0 > props.count || props.count > 30
            ? `${props.count}⚠`
            : `${props.count}`}{" "}
          hashtag
          {props.count !== 1 ? "s" : ""}
        </Button>
      </CopyToClipboard>
    </FixedBottom>
  );
}

export default BottomBar;
