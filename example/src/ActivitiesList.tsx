import * as React from 'react';

import { StyleSheet, View, Text, Button, FlatList } from 'react-native';

interface ActivitiesListProps {
  activities: any[];
  onPressEditActivity: (activity: any) => () => void;
  onPressEndActivity: (activity: any) => () => void;
}

const styles = StyleSheet.create({
  title: { fontSize: 24, fontWeight: 'bold', paddingBottom: 16 },
  container: {
    padding: 16,
  },
  cell: { flexDirection: 'column', padding: 8, borderBottomWidth: 1 },
  row: { flexDirection: 'row' },
});

const ActivitiesList = ({
  onPressEditActivity,
  onPressEndActivity,
  activities,
}: ActivitiesListProps) => {
  const renderItem = React.useCallback(
    (item) => {
      return (
        <View style={styles.cell}>
          <Text>{item.item.id}</Text>
          <View style={styles.row}>
            <Button title="Stop" onPress={onPressEndActivity(item.item)} />
            <Button title="Edit" onPress={onPressEditActivity(item.item)} />
          </View>
        </View>
      );
    },
    [activities]
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>List of activities</Text>
      <FlatList data={activities} renderItem={renderItem} />
    </View>
  );
};

export default ActivitiesList;
