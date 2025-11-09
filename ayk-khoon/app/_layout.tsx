import { Stack } from "expo-router";
import Toast from "react-native-toast-message";
import { AuthProvider } from "../context/AuthContext";
import { ModeProvider } from "../context/ModeContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <ModeProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="splash" />
          <Stack.Screen name="onboarding" />
          <Stack.Screen name="(auth)" />
          {/* <Stack.Screen name="(user)" /> */}
          <Stack.Screen name="(bloodbank)" />
        </Stack>
        <Toast />
      </ModeProvider>
    </AuthProvider>
  );
}
