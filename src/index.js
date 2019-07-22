import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import "antd/dist/antd.css";
import "./styles.css";

import SetList from "./components/SetList.js";
import BottomBar from "./components/BottomBar.js";
import SetAddPage from "./components/SetAdd.js";
import Header from "./components/Header.js";

import firebaseMock from "./firebaseMock";

import firebase from "firebase/app";
import "firebase/firestore";
import config from "./config";

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}
let db = firebase.firestore();

function App() {
  const [hashtagSets, setHashtagSets] = useState(firebaseMock);
  const [hashtagCount, setHashtagCount] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedHashtagSetNames, setSelectedHashtagSetNames] = useState([]);

  const getHashtagSets = () => {
    console.log("called getHashtags()");
    // var getOptions = { source: "cache" };
    let newState = {};
    db.collection("sets")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          newState[doc.id] = doc.data();
        });
        setHashtagSets(newState);
      })
      .catch(function(error) {
        console.log("Error getting sets: ", error);
      });
  };

  useEffect(() => {
    //load hashtags from firestore one time at first render
    getHashtagSets();
  }, []);

  const addHashtagSet = values => {
    console.log("Received values of form: ", values);
    db.collection("sets")
      .doc(values.name)
      .set(values);
    getHashtagSets();
  };

  const deleteHashtagSet = name => {
    console.log(`Trying to delete ${name}`);
    db.collection("sets")
      .doc(name)
      .delete()
      .then(function() {
        console.log(`${name} successfully deleted!`);
      })
      .catch(function(error) {
        console.error(`Error removing ${name}: `, error);
      });
  };

  const handleEditToggle = () => {
    if (isEditing) {
      setIsEditing(false);
      getHashtagSets();
    } else {
      setIsEditing(true);
    }
  };

  const handleSetSelectionChange = (name, count, type) => {
    switch (type) {
      case "+":
        console.log(
          `Adding:\n${hashtagSets[name].name} : ${hashtagSets[name].hashtags}`
        );
        setHashtagCount(hashtagCount + count);
        setSelectedHashtagSetNames(selectedHashtagSetNames.concat(name));
        break;
      case "-":
        console.log(
          `Removing:\n${hashtagSets[name].name} : ${hashtagSets[name].hashtags}`
        );
        setHashtagCount(hashtagCount - count);
        setSelectedHashtagSetNames(
          selectedHashtagSetNames.filter(el => el !== name)
        );
        break;
      default:
        console.error(
          `Invalid type for handleSetSElectionChange. Type was ${type}`
        );
        break;
    }
  };

  return (
    <div className="App">
      <Header
        getHashtagSets={getHashtagSets}
        isEditing={isEditing}
        handleEditToggle={handleEditToggle}
      />
      <SetList
        hashtagSets={hashtagSets}
        selectedHashtagSetNames={selectedHashtagSetNames}
        handleSetSelectionChange={handleSetSelectionChange}
        isEditing={isEditing}
        deleteHashtagSet={deleteHashtagSet}
      />
      <SetAddPage addHashtagSet={addHashtagSet} />
      <BottomBar
        hashtagSets={hashtagSets}
        selectedHashtagSetNames={selectedHashtagSetNames}
        count={hashtagCount}
      />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
