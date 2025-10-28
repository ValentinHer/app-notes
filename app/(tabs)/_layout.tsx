import { Tabs } from "expo-router";
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: "Crear nota", tabBarIcon: ({color, size}) => <SimpleLineIcons name="note" size={size} color={color} /> }} />
      <Tabs.Screen name="notes" options={{ title: "Notas", tabBarIcon: ({color, size}) => <MaterialIcons name="notes" size={size} color={color} /> }} />
    </Tabs>
  );
}
