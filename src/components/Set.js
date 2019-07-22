import React, { useState } from "react";
import { Tag } from "antd";

function Set(props) {
  const [isUnchecked, setIsUnchecked] = useState(
    props.selectedHashtagSetNames.includes(props.name)
  );
  const [hashtagCount] = useState(countHashtags(props.hashtags));

  const handleChangeEvent = () => {
    if (isUnchecked) {
      props.handleSetSelectionChange(props.name, hashtagCount, "-");
    } else {
      props.handleSetSelectionChange(props.name, hashtagCount, "+");
    }
    setIsUnchecked(!isUnchecked);
  };

  const handleEditClick = () => {
    console.log(`Clicked ${props.name} while editing.`);
  };

  const handleClose = () => {
    props.deleteHashtagSet(props.name);
  };

  if (props.isEditing) {
    return (
      <Tag
        className="editTag"
        onClick={handleEditClick}
        closable
        onClose={handleClose}
        color={"geekblue"}
      >
        {props.name} | {hashtagCount}
      </Tag>
    );
  } else {
    return (
      <Tag.CheckableTag
        className={`checkableTag ${
          isUnchecked ? "isUnchecked" : "isUnchecked"
        }`}
        checked={isUnchecked}
        onChange={handleChangeEvent}
        color={"blue"}
      >
        {props.name} | {hashtagCount}
      </Tag.CheckableTag>
    );
  }
}

function countHashtags(str) {
  const re = /(?:#)([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\.(?!\.))){0,28}(?:[A-Za-z0-9_]))?)/g;
  return ((str || "").match(re) || []).length;
}

export default Set;
