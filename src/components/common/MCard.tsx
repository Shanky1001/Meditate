import {Pressable, StyleSheet} from "react-native";
import React from "react";
import {ThemedText, useThemeColor} from "../../theme/Themed";
import {Card, MD3Elevation, Paragraph} from "react-native-paper";
import {Meditation} from "../../constants/data/meditations";
import MIcon from "./MIcon";
import {useDispatch} from "react-redux";
import {updateFavorites} from "../../redux/slices/meditationSlice";

interface MCardProps {
  item: Meditation;
  elevation?: MD3Elevation;
  onPress: () => void;
  isFav?: boolean;
}
const MCard = ({item, isFav, elevation, onPress}: MCardProps) => {
  const textColor = useThemeColor({}, "text");
  const bgColor = useThemeColor({}, "background");
  const dispatch = useDispatch();
  const handleFav = () => {
    dispatch(updateFavorites(item));
  };
  return (
    <Card elevation={elevation} style={[styles.card, {backgroundColor: bgColor}]} onPress={onPress}>
      <Card.Cover style={[styles.cardImage, styles.popularImage]} source={item.image} />
      <Card.Title
        titleStyle={[styles.cardTitle, {color: textColor}]}
        subtitleStyle={styles.cardSubtitle}
        title={<ThemedText>{item.title}</ThemedText>}
        subtitle={<ThemedText>{item.subtitle}</ThemedText>}
      />
      <Card.Content style={styles.cardContent}>
        <Paragraph style={styles.cardParagraph}>
          <ThemedText>{item.time} minutes</ThemedText>
        </Paragraph>
        <Pressable onPress={handleFav}>
          <MIcon family="FontAwesome" name={isFav ? "heart" : "heart-o"} size={20} color={isFav ? "red" : textColor} />
        </Pressable>
      </Card.Content>
    </Card>
  );
};

export default MCard;

const styles = StyleSheet.create({
  card: {
    width: 250,
    marginRight: 10,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
  },
  cardImage: {
    height: 135,
  },
  popularImage: {
    height: 250,
  },
  cardContent: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  cardSubtitle: {
    // color: Colors.light.gray800,
    fontSize: 14,
  },
  cardParagraph: {
    // color: Colors.light.purple900,
    fontWeight: "600",
  },
});
