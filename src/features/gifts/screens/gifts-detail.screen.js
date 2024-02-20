import React, { useContext, useState } from "react";
import { ScrollView } from "react-native";
import { giftInfoCard } from "../components/gift-info-card.component";
import { List } from "react-native-paper";

import { standardcolors } from "../../../infrastructure/theme/colors";

export const giftDetailScreen = ({ route }) => {
  const { gift } = route.params;
  const [breakfastExpanded, setBreakfastExpanded] = useState(false);
  const [lunchExpanded, setLunchExpanded] = useState(false);
  const [dinnerExpanded, setDinnerExpanded] = useState(false);
  const [drinkExpanded, setDrinkExpanded] = useState(false);

  //console.log(route);
  return (<><giftInfoCard gift={gift} showButtons={false} />
    <ScrollView>

      <List.Section title="Menu">
        <List.Accordion
          title="Breakfast"
          expanded={breakfastExpanded}
          onPress={() => { setBreakfastExpanded(!breakfastExpanded); setLunchExpanded(false); setDinnerExpanded(false); setDrinkExpanded(false); }}
          left={props => <List.Icon {...props} icon="bread-slice" />}>
          <List.Item title="First item" style={{ marginLeft: 40 }} descriptionStyle={{ color: standardcolors.violetblue }} description="Item description" right={props => <List.Icon {...props} icon="folder" />} />
          <List.Item title="Second item" style={{ marginLeft: 40 }} descriptionStyle={{ color: standardcolors.violetblue }} description="Item description" right={props => <List.Icon {...props} icon="folder" />} />
        </List.Accordion>

        <List.Accordion
          title="Lunch"
          expanded={lunchExpanded}
          onPress={() => { setBreakfastExpanded(false); setLunchExpanded(!lunchExpanded); setDinnerExpanded(false); setDrinkExpanded(false); }}
          left={props => <List.Icon {...props} icon="hamburger" />}>
          <List.Item title="First item" />
          <List.Item title="Second item" />
        </List.Accordion>

        <List.Accordion
          title="Dinner"
          expanded={dinnerExpanded}
          onPress={() => { setBreakfastExpanded(false); setLunchExpanded(false); setDinnerExpanded(!dinnerExpanded); setDrinkExpanded(false); }}
          left={props => <List.Icon {...props} icon="food-variant" />}>
          <List.Item title="First item" />
          <List.Item title="Second item" />
        </List.Accordion>

        <List.Accordion
          title="Drink"
          expanded={drinkExpanded}
          onPress={() => { setBreakfastExpanded(false); setLunchExpanded(false); setDinnerExpanded(false); setDrinkExpanded(!drinkExpanded); }}
          left={props => <List.Icon {...props} icon="cup" />}>
          <List.Item title="First item" />
          <List.Item title="Second item" />
        </List.Accordion>
      </List.Section>
    </ScrollView>
  </>)
};
