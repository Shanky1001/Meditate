import {useEffect, useState} from "react";
import React from "react";
import {StyleSheet} from "react-native";
import {Button, Paragraph, Dialog, Portal, Provider, TextInput} from "react-native-paper";
import {useDispatch, useSelector} from "react-redux";
import {selectActivity, updateManualEntry} from "../../redux/slices/meditationSlice";
import {MS_PER_MINUTE} from "../../utils";
import MButton from "../common/MButton";

interface Props {
  timestamp?: number;
  onDismiss: () => void;
}

const ManualEntry = ({timestamp, onDismiss}: Props) => {
  const visible = Boolean(timestamp);
  const dispatch = useDispatch();
  const activity = useSelector(selectActivity);
  const [duration, setDuration] = useState(-1);
  const [defaultValue, setDefaultValue] = useState("");

  useEffect(() => {
    if (!timestamp) {
      return;
    }

    const newDuration = activity[timestamp]?.duration || -1;
    setDuration(newDuration);
    setDefaultValue(newDuration === -1 ? "" : Math.floor(newDuration / MS_PER_MINUTE).toString());
  }, [activity, timestamp]);

  const onChangeText = (text: string) => {
    const value = Number(text);

    if (text === "" || Number.isNaN(value)) {
      setDuration(-1);
      return;
    }

    setDuration(value * MS_PER_MINUTE);
  };

  const onSubmit = () => {
    if (duration < 0) {
      return;
    }

    dispatch(
      updateManualEntry({
        timestamp: timestamp!,
        duration,
      }),
    );
    onDismiss();
  };

  return (
    <Provider>
      <Portal>
        <Dialog visible={visible} onDismiss={onDismiss}>
          <Dialog.Title>Manual Entry</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Enter how long you meditated for</Paragraph>
            <TextInput
              testID="input"
              key={defaultValue}
              autoFocus
              defaultValue={defaultValue}
              keyboardType="number-pad"
              label="Time in minutes"
              maxLength={3}
              onChangeText={onChangeText}
              onSubmitEditing={onSubmit}
              style={styles.textInput}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button testID="cancel-btn" onPress={onDismiss}>
              Cancel
            </Button>
            <MButton variant="contained" disabled={duration < 0} onPress={onSubmit}>
              Submit
            </MButton>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </Provider>
  );
};

const styles = StyleSheet.create({
  textInput: {marginTop: 10},
});

export default ManualEntry;
