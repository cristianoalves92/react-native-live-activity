import * as React from 'react';

import { StyleSheet, View, Text, SafeAreaView, Button } from 'react-native';
import ActivitiesList from './ActivitiesList';
import Row from './Row';
import LiveActivity from 'react-native-live-activity';

type StartLiveActivityParams = {
  status: string;
  driverName: string;
  expectedDeliveryTime: string;
};

const liveActivity = new LiveActivity<StartLiveActivityParams>();

export default function App() {
  const [status, setStatus] = React.useState<string>('Packing');
  const [driverName, setDriver] = React.useState<string>('John');
  const [expectedDeliveryTime, setExpectedDeliveryTime] =
    React.useState<string>('3pm');
  const [activities, setActivities] = React.useState<
    {
      id: string;
      data: StartLiveActivityParams;
    }[]
  >([]);
  const [activity, setActivity] = React.useState<{
    id: string;
    data: StartLiveActivityParams;
  }>();

  React.useEffect(() => {
    if (activity) {
      setDriver(activity?.data?.driverName);
      setStatus(activity?.data?.status);
      setExpectedDeliveryTime(activity?.data?.expectedDeliveryTime);
    }
  }, [activity]);

  React.useEffect(() => {
    liveActivity.listAllActivities().then(setActivities);
  }, [setActivities]);

  const onPressCreate = React.useCallback(() => {
    liveActivity
      .startActivity({
        status,
        driverName,
        expectedDeliveryTime,
      })
      .then(() => liveActivity.listAllActivities().then(setActivities));
  }, [status, driverName, expectedDeliveryTime]);

  const onPressEdit = React.useCallback(() => {
    if (!activity?.id) {
      return;
    }
    liveActivity.updateActivity(activity.id, {
      status,
      driverName,
      expectedDeliveryTime,
    });
    setActivity(undefined);
  }, [status, driverName, expectedDeliveryTime, activity]);

  const onPressEndActivity = React.useCallback(
    (item) => {
      return () => {
        liveActivity.endActivity(item.id);
        setActivities(activities.filter((value) => value.id !== item.id));
      };
    },
    [activities]
  );

  const onPressEditActivity = React.useCallback((item) => {
    return () => {
      setActivity(item);
    };
  }, []);

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
        title={activity ? 'Update activity' : 'Create activity'}
        onPress={activity ? onPressEdit : onPressCreate}
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
