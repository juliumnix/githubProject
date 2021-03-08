import React from "react";
import { Image, Text, StyleSheet } from "react-native";

const Octocat = () => {
  return (
    <>
      <Image
        style={styles.imgGithub}
        source={require("../../res/Octocat.png")}
      />
      <Text style={styles.colorText}>Está meio vazio por aqui!</Text>
      <Text style={styles.colorText}>Busque por um usuário</Text>
    </>
  );
};

const styles = StyleSheet.create({
  imgGithub: {
    height: 200,
    width: 200,
  },

  colorText: {
    color: "#C7BEBE",
  },
});

export default Octocat;
