import * as React from 'react';
import { Text, TextInput, View, StyleSheet } from 'react-native';

interface RowProps {
  label: string;
  onChangeText: (value: string) => void;
  value: string;
}

const styles = StyleSheet.create({
  textInput: { borderWidth: 1, padding: 8 },
  container: {
    paddingBottom: 16,
  },
  label: { paddingBottom: 8, fontWeight: 'bold' },
});

const Row = ({ label, onChangeText, value }: RowProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        style={styles.textInput}
      />
    </View>
  );
};

export default Row;
