import {FlatList, StyleSheet} from "react-native";
import React from "react";
import ScreenWrapper from "../ScreenWrapper";
import {ThemedText} from "../../theme/Themed";
import {GetMeditationData} from "../../Providers/ContextProvider";
import {Meditation, MeditationItem} from "../../constants/data/meditations";
import {StackNavigationProp} from "@react-navigation/stack";
import MCard from "../../components/common/MCard";
import {HomeParamList} from "../../../types";
import Screens from "../../constants/Screens";
import {useSelector} from "react-redux";
import {selectFavorite} from "../../redux/slices/meditationSlice";

interface HomeProps {
  navigation: StackNavigationProp<HomeParamList, "HomeScreen">;
}
export default function HomeScreen({navigation}: HomeProps) {
  const {popular, anxiety, sleep} = GetMeditationData();
  const Favorites = useSelector(selectFavorite);
  const handlePress = (item: Meditation) => {
    navigation.navigate(Screens.Root.Drawer.BottomNavigation.Home.PlayScreen, {
      id: item.id,
    });
  };
  const renderCard = ({item}: MeditationItem) => {
    const isFav = Favorites.some(fav => fav.id === item.id);
    return <MCard item={item} isFav={isFav} onPress={() => handlePress(item)} />;
  };
  return (
    <ScreenWrapper scroll>
      <ThemedText style={styles.title}>POPULAR</ThemedText>
      <FlatList
        style={styles.cards}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={popular}
        renderItem={renderCard}
        keyExtractor={({id}) => id}
      />
      <ThemedText style={styles.title}>SLEEP</ThemedText>
      <FlatList
        style={styles.cards}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={sleep}
        renderItem={renderCard}
        keyExtractor={({id}) => id}
      />
      <ThemedText style={styles.title}>ANXIETY</ThemedText>
      <FlatList
        style={styles.cards}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={anxiety}
        renderItem={renderCard}
        keyExtractor={({id}) => id}
      />
      {Favorites.length > 0 && (
        <>
          <ThemedText style={styles.title}>Favorites</ThemedText>
          <FlatList
            style={styles.cards}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={Favorites}
            renderItem={renderCard}
            keyExtractor={({id}) => id}
          />
        </>
      )}
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 19,
  },
  cards: {
    marginBottom: 20,
  },
});
