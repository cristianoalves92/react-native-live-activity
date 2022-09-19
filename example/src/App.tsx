import * as React from 'react';

import {
  StyleSheet,
  View,
  Text,
  TextInput,
  SafeAreaView,
  Button,
  FlatList,
} from 'react-native';
import {
  startActivity,
  listAllActivities,
  endActivity,
  updateActivity,
} from 'react-native-live-activity';

export default function App() {
  const [status, setStatus] = React.useState<string>('Packing');
  const [driver, setDriver] = React.useState<string>('John');
  const [deliverTime, setDeliveryTime] = React.useState<string>('3pm');
  const [activities, setActivities] = React.useState<any[]>([]);
  const [activity, setActivity] = React.useState<any>();

  React.useEffect(() => {
    if (activity) {
      setDriver(activity.driverName);
      setStatus(activity.status);
      setDeliveryTime(activity.expectingDeliveryTime);
    }
  }, [activity]);

  console.log(activities);
  React.useEffect(() => {
    listAllActivities().then(setActivities);
  }, [setActivities]);
  const onPressCreate = React.useCallback(() => {
    startActivity(status, driver, deliverTime).then(() =>
      listAllActivities().then(setActivities)
    );
  }, [status, driver, deliverTime]);

  const onPressEdit = React.useCallback(() => {
    updateActivity(activity.id, status, driver, deliverTime);
    setActivity(undefined);
  }, [status, driver, deliverTime, activity]);

  const onPressEndActivity = React.useCallback(
    (id) => {
      return () => {
        endActivity(id);
        setActivities(activities.filter((value) => value.id !== id));
      };
    },
    [activities]
  );

  const onPressEditActivity = React.useCallback(
    (item) => {
      return () => {
        setActivity(item);
      };
    },
    [activities]
  );

  const renderItem = React.useCallback(
    (item) => {
      return (
        <View style={styles.cell}>
          <Text>{item.item.id}</Text>
          <Button title="End" onPress={onPressEndActivity(item.item.id)} />
          <Button title="Edit" onPress={onPressEditActivity(item.item)} />
        </View>
      );
    },
    [activities]
  );

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text>Status</Text>
        <TextInput
          value={status}
          onChangeText={setStatus}
          style={styles.textInput}
        />
        <Text>Driver</Text>
        <TextInput
          value={driver}
          onChangeText={setDriver}
          style={styles.textInput}
        />
        <Text>Delivery Time</Text>
        <TextInput
          value={deliverTime}
          onChangeText={setDeliveryTime}
          style={styles.textInput}
        />
      </View>
      <Button
        title={!!activity ? 'Update activity' : 'Create activity'}
        onPress={!!activity ? onPressEdit : onPressCreate}
      />

      <Text>List of activities</Text>
      <FlatList data={activities} renderItem={renderItem} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  cell: { flexDirection: 'row', padding: 8, borderBottomWidth: 1 },
  textInput: { borderWidth: 1, padding: 8 },
});
