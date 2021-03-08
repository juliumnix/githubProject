import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  SafeAreaView,
  FlatList,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import api from "../../services/api";

const Repos = ({ route }) => {
  const [repositorios, setRepositorios] = useState([]);

  useEffect(() => {
    async function searchUser() {
      const response = await api.get(`users/${route.params?.nome}/repos`);
      setRepositorios(response.data);
    }
    searchUser();
  }, []);

  const obj = {
    nome: `${route.params?.nome}`,
    img: `${route.params?.imagem}`,
    id: `${route.params?.id}`,
  };

  const favoritado = async () => {
    try {
      let valoresFavoritos = await AsyncStorage.getItem("@favoritos");
      if (!!valoresFavoritos) {
        const novosValoresJson = JSON.parse(valoresFavoritos);
        const novosValores = [...novosValoresJson, obj];

        await AsyncStorage.setItem("@favoritos", JSON.stringify(novosValores));
      } else {
        let objJson = JSON.stringify([obj]);

        await AsyncStorage.setItem("@favoritos", objJson);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.containerLogo}>
        <FontAwesome name="github" size={150} color="#898383" />
      </View>
      <View style={styles.containerContent}>
        <View style={styles.textFav}>
          <Text style={styles.colorText}>Favoritar {route.params?.nome}?</Text>
          <TouchableOpacity onPress={favoritado}>
            <View style={styles.buttomHeart}>
              <FontAwesome name="heart" size={20} color="#C46683" />
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <FlatList
            data={repositorios}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <>
                <View style={styles.cardUser}>
                  <View style={styles.pastaLogo}>
                    <FontAwesome name="folder" size={50} color="#7EB6FF" />
                  </View>
                  <View style={styles.textNamePasta}>
                    <Text style={styles.userLogin}>{item.name}</Text>
                    <Text style={styles.userDescription}>
                      Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet
                    </Text>
                  </View>
                </View>
              </>
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Repos;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#040404",
  },
  containerLogo: {
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 20,
    paddingTop: 20,
  },
  containerContent: {
    backgroundColor: "#fff",
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  colorText: {
    color: "#C7BEBE",
    fontSize: 20,
  },
  textFav: {
    paddingTop: 50,
    flexDirection: "row",
    paddingLeft: 50,
    justifyContent: "space-between",
  },
  buttomHeart: {
    backgroundColor: "#E0E2E3",
    marginRight: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    width: 36,
    height: 36,
  },
  cardUser: {
    // backgroundColor: "green",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 20,
    paddingTop: 20,
  },
  userLogin: {
    color: "#C7BEBE",
    fontSize: 13,
    marginRight: 20,
  },
  pastaLogo: {
    marginLeft: 50,
  },
  textNamePasta: {
    marginRight: 40,
    fontSize: 10,
  },
  userDescription: {
    color: "#C7BEBE",
    fontSize: 8,
  },
});
