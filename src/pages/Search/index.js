import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Image,
  FlatList,
  KeyboardAvoidingView,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import Octocat from "../Octocat/index";

import api from "../../services/api";

const Search = () => {
  const [data, setData] = useState([]);
  const [textoImput, setTextoImput] = useState("");

  async function searchUser() {
    const response = await api.get(`search/users?q=${textoImput}`);
    const { items } = response.data;
    setData(items);
  }
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.containerLogo}>
        <FontAwesome name="github" size={150} color="#898383" />
      </View>
      <KeyboardAvoidingView style={styles.containerContent}>
        <View style={styles.searchUser}>
          <View>
            <TextInput
              onChangeText={(text) => setTextoImput(text)}
              placeholder="Buscar Usuário"
              style={styles.textInputColor}
            ></TextInput>
          </View>
          <TouchableOpacity onPress={searchUser}>
            <View style={styles.backgroundIconSearch}>
              <FontAwesome name="search" size={22} color="white" />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.containerIMG}>
          {data.length > 0 ? (
            <View style={styles.flatlistStyle}>
              <Text style={styles.textFlatlist}>Usuários encontrados</Text>
              <FlatList
                data={data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.push("Repos", {
                          nome: item.login,
                          imagem: item.avatar_url,
                          id: item.id,
                        })
                      }
                    >
                      <View style={styles.cardUser}>
                        <Image
                          source={{ uri: item.avatar_url }}
                          style={styles.imgUser}
                        />
                        <Text style={styles.userLogin}>{item.login}</Text>
                        <FontAwesome
                          name="chevron-right"
                          size={14}
                          color="#C7BEBE"
                        />
                      </View>
                    </TouchableOpacity>
                  </>
                )}
              />
            </View>
          ) : (
            <KeyboardAvoidingView style={styles.octoView}>
              <Octocat />
            </KeyboardAvoidingView>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Search;

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
  searchUser: {
    paddingTop: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  backgroundIconSearch: {
    backgroundColor: "#018AFF",
    width: 65,
    height: 40,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 20,
  },
  textInputColor: {
    color: "#C7BEBE",
    width: 200,
    height: 40,
    borderWidth: 1,
    paddingLeft: 20,
    borderRadius: 5,
    borderColor: "#C7BEBE",
  },
  imgGithub: {
    height: 200,
    width: 200,
  },
  containerIMG: {
    justifyContent: "center",
    flex: 1,
    alignItems: "center",
  },
  colorText: {
    color: "#C7BEBE",
  },
  textFlatlist: {
    right: 45,
    margin: 20,
    // backgroundColor: "#000",
    color: "#C7BEBE",
    fontSize: 20,
  },
  cardUser: {
    // backgroundColor: "green",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 20,
  },
  imgUser: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },

  userLogin: {
    color: "#C7BEBE",
    right: 20,
  },
  octoView: {
    flex: 1,
    // margin: 35,
    alignItems: "center",
    justifyContent:'center',
  },
});
