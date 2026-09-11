import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { RootNavigator } from "./src/navigation/RootNavigator";
import { SettingsProvider } from "./src/settings/SettingsContext";

export default function App() {
  return (
    <SafeAreaProvider>
      <SettingsProvider>
        <StatusBar style="light" />
        <RootNavigator />
      </SettingsProvider>
    </SafeAreaProvider>
  );
}
