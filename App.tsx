import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import Svg, { Defs, Path, Text, TextPath } from 'react-native-svg';

// Two arcs between the same two points: one bends up, the other down.
const ARCS = ['M 30 150 Q 170 20 310 150', 'M 30 150 Q 170 280 310 150'];

export default function App() {
  const [arcIndex, setArcIndex] = useState(0);
  const d = ARCS[arcIndex];
  return (
    <View style={styles.container}>
      <Svg width={340} height={300}>
        <Defs>
          <Path id="arc" d={d} />
        </Defs>
        {/* The same arc, drawn, to show where the text belongs. */}
        <Path d={d} stroke="#999" strokeWidth={2} fill="none" />
        <Text fontSize={20} textAnchor="middle" fill="#000">
          <TextPath href="#arc" startOffset="50%">
            This text runs along the arc
          </TextPath>
        </Text>
      </Svg>
      <Button title="Bend the arc the other way" onPress={() => setArcIndex(1 - arcIndex)} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
