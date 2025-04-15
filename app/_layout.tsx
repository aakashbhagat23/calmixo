import { Stack, Slot, useRouter } from "expo-router";
import { useColorScheme, StatusBar } from "react-native";
import { useEffect, useState } from "react";
import type { TextStyle } from "react-native";
import Colors from "@/constants/Colors";
import * as SystemUI from "expo-system-ui";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function RootLayout() {
  const theme = useColorScheme() || "light";
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    SystemUI.setBackgroundColorAsync(Colors[theme].headerBackground);

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        router.replace("/"); // Go to home inside tabs
      } else {
        setIsAuthenticated(false);
        router.replace("/welcome"); // Unauthenticated
      }
    });

    return unsubscribe;
  }, [theme]);

  const barStyle = theme === "dark" ? "light-content" : "dark-content";

  const commonHeaderStyle = {
    headerStyle: {
      backgroundColor: Colors[theme].headerBackground,
    },
    headerTintColor: Colors[theme].text,
    headerTitleStyle: {
      fontWeight: "600" as TextStyle["fontWeight"],
      fontSize: 18,
    },
  };

  // While checking auth status
  if (isAuthenticated === null) return null;

  return (
    <>
      <StatusBar
        backgroundColor={Colors[theme].headerBackground}
        barStyle={barStyle}
      />
      {/* Stack Navigator only shown when not authenticated */}
      {!isAuthenticated ? (
        <Stack screenOptions={commonHeaderStyle}>
          <Stack.Screen name="welcome" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" options={{ title: "Oops Go Back!" }} />
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen name="register" options={{ headerShown: false }} />
        </Stack>
      ) : (
        // Authenticated, render Tab layout
        <Slot />
      )}
    </>
  );
}
