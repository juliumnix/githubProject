import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  SafeAreaView,
  Image,
  FlatList,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Favorite = () => {
  const [itensFavorito, setItensFavorito] = useState([]);

  useEffect(() => {
    //TODA VEZ QUE TIVER UM GET DO ASYNC STORAGE,
    //FAZER PARSE ANTES DE SETAR NO STATE, POIS NO ASYNC É STRING
    //E A FLATLIST SÓ RECEBE OBJ
    async function recuperaValor() {
      const objDoAsync = await AsyncStorage.getItem("@favoritos");

      const variavelteste = JSON.parse(objDoAsync);

      setItensFavorito(variavelteste);
    }

    recuperaValor();
  }, [itensFavorito]);

  const refreshValores = async () => {
    const objDoAsync = await AsyncStorage.getItem("@favoritos");

    const variavelteste = JSON.parse(objDoAsync);

    setItensFavorito(variavelteste);
  };

  const deleteValue = async (item) => {
    const newItems = [...itensFavorito];
    newItems.splice(newItems.indexOf(item), 1);

    setItensFavorito(newItems);

    await AsyncStorage.setItem("@favoritos", JSON.stringify(newItems));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.containerLogo}>
        <FontAwesome name="github" size={150} color="#898383" />
      </View>
      <View style={styles.containerContent}>
        <View style={styles.textFav}>
          <Text style={styles.colorText}>Meus Favoritos</Text>
        </View>

        {itensFavorito > 0 ? (
          <View>
            <Text>oi</Text>
          </View>
        ) : (
          <View>
            <FlatList
              data={itensFavorito}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <>
                  <View style={styles.cardUser}>
                    <View style={styles.pastaLogo}>
                      <Image
                        source={{ uri: item.img }}
                        style={styles.imgUser}
                      />
                    </View>
                    <View style={styles.textNamePasta}>
                      <Text style={styles.userLogin}>{item.nome}</Text>
                    </View>
                    <TouchableOpacity onPress={() => deleteValue(item)}>
                      <View style={styles.imgTrash}>
                        <FontAwesome name="trash" size={24} color="red" />
                      </View>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Favorite;

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
    paddingBottom: 100,
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
  imgUser: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  imgTrash: {
    marginRight: 40,
  },
});

{
  /* <View style={styles.searchUser}>
          <View>
            <TextInput
              placeholder="Buscar Usuário"
              style={styles.textInputColor}
            ></TextInput>
          </View>
          <TouchableOpacity>
            <View style={styles.backgroundIconSearch}>
              <FontAwesome name="search" size={22} color="white" />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.containerIMG}>
          <Image
            style={styles.imgGithub}
            source={require("../../res/Octocat.png")}
          />
          <Text style={styles.colorText}>Está meio vazio por aqui!</Text>
          <Text style={styles.colorText}>Busque por um usuário</Text>
        </View> */
}
