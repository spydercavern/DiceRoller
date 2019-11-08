import React, { useState, useRef } from "react";
import { StyleSheet, View, TouchableOpacity, Button } from "react-native";

import { Dice } from "./src/components/Dice";

enum PLAYERS {
  SINGLE = "SINGLE",
  DOUBLE = "DOUBLE"
}

export default function App() {
  const [mode, setMode] = useState(PLAYERS.DOUBLE);
  const dice1Ref = useRef();
  const dice2Ref = useRef();

  const rollDice = () => {
    if (dice1Ref.current) {
      dice1Ref!.current!.rollDice();
    }
    if (dice2Ref.current) {
      dice2Ref!.current!.rollDice();
    }
  };

  const selectPlayer = (player: PLAYERS) => {
    switch (player) {
      case PLAYERS.SINGLE:
        setMode(PLAYERS.SINGLE);
        return;
      case PLAYERS.DOUBLE:
        setMode(PLAYERS.DOUBLE);
        return;
      default:
        return null;
    }
  };

  const getDiceView = () => {
    return (
      <>
        <Dice ref={dice1Ref} />
        {mode === PLAYERS.DOUBLE ? <Dice ref={dice2Ref} /> : null}
      </>
    );
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity disabled={mode === PLAYERS.SINGLE}>
          <Button
            title="Single"
            disabled={mode === PLAYERS.SINGLE}
            onPress={() => selectPlayer(PLAYERS.SINGLE)}
          />
        </TouchableOpacity>
        <TouchableOpacity disabled={mode === PLAYERS.DOUBLE}>
          <Button
            title="Double"
            disabled={mode === PLAYERS.DOUBLE}
            onPress={() => selectPlayer(PLAYERS.DOUBLE)}
          />
        </TouchableOpacity>
      </View>
      <View style={{ display: "flex", flexDirection: "row" }}>
        {getDiceView()}
      </View>
      <TouchableOpacity>
        <Button title="Roll" onPress={rollDice} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4C724",
    alignItems: "center",
    justifyContent: "center"
  }
});


/**
 * Here the parent component calls the rollDice method in the child component. Might be an anti pattern. 
 * 
 * more details on - https://reactjs.org/docs/hooks-reference.html#useimperativehandle 
 */