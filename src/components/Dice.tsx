import React, { useState, useImperativeHandle, forwardRef } from "react";
import { StyleSheet, Image } from "react-native";
import { images } from "../dice";

export const Dice = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    rollDice() {
      const randomDisplay = setInterval(() => {
        setImageSource(images[`img${getRandomNumber()}`]);
      }, 10);
      setTimeout(() => {
        clearInterval(randomDisplay);
      }, 500);
    }
  }));

  const getRandomNumber = () => Math.floor(Math.random() * 6) + 1;
  const [imageSource, setImageSource] = useState(images.img1);

  return <Image style={styles.diceImage} source={imageSource} />;
});

const styles = StyleSheet.create({
  diceImage: {
    height: 200,
    width: 200
  }
});
