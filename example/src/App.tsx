import * as React from 'react';

import { StyleSheet, View, Text, SafeAreaView, Button } from 'react-native';
import {
  startActivity,
  listAllActivities,
  endActivity,
  updateActivity,
} from 'react-native-live-activity';
import ActivitiesList from './ActivitiesList';
import Row from './Row';

interface StartLiveActivityParams {
  status: string;
  driverName: string;
  expectedDeliveryTime: string;
}

export default function App() {
  const [status, setStatus] = React.useState<string>('Packing');
  const [driverName, setDriver] = React.useState<string>('John');
  const [expectedDeliveryTime, setExpectedDeliveryTime] =
    React.useState<string>('3pm');
  const [activities, setActivities] = React.useState<any[]>([]);
  const [activity, setActivity] = React.useState<any>();

  React.useEffect(() => {
    if (activity) {
      setDriver(activity.driverName);
      setStatus(activity.status);
      setExpectedDeliveryTime(activity.expectingDeliveryTime);
    }
  }, [activity]);

  React.useEffect(() => {
    listAllActivities().then(setActivities);
  }, [setActivities]);

  const onPressCreate = React.useCallback(() => {
    startActivity<StartLiveActivityParams>({
      status,
      driverName,
      expectedDeliveryTime,
    }).then(() => listAllActivities().then(setActivities));
  }, [status, driverName, expectedDeliveryTime]);

  const onPressEdit = React.useCallback(() => {
    updateActivity<StartLiveActivityParams>(activity.id, {
      status,
      driverName,
      expectedDeliveryTime,
    });
    setActivity(undefined);
  }, [status, driverName, expectedDeliveryTime, activity]);

  const onPressEndActivity = React.useCallback(
    (item) => {
      return () => {
        endActivity(item.id);
        setActivities(activities.filter((value) => value.id !== item.id));
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

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.title}>Live Activities React Native</Text>
        <Row onChangeText={setStatus} label="Status" value={status} />
        <Row onChangeText={setDriver} label="Driver" value={driverName} />
        <Row
          onChangeText={setExpectedDeliveryTime}
          label="Expected Delivery Time"
          value={expectedDeliveryTime}
        />
      </View>
      <Button
        title={!!activity ? 'Update activity' : 'Create activity'}
        onPress={!!activity ? onPressEdit : onPressCreate}
      />

      <ActivitiesList
        activities={activities}
        onPressEditActivity={onPressEditActivity}
        onPressEndActivity={onPressEndActivity}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 32, fontWeight: 'bold', paddingBottom: 16 },
  container: {
    padding: 16,
  },
  cell: { flexDirection: 'row', padding: 8, borderBottomWidth: 1 },
  textInput: { borderWidth: 1, padding: 8 },
});
