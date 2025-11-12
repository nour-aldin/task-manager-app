import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { TasksProvider } from "@/contexts/tasks-context";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <TasksProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen
            name="create-task"
            options={{
              title: "Create Task",
              headerShown: true,
              presentation: "modal",
            }}
          />
          <Stack.Screen
            name="task-detail"
            options={{
              title: "Task Details",
              headerShown: true,
            }}
          />
          <Stack.Screen
            name="edit-task"
            options={{
              title: "Edit Task",
              headerShown: true,
              presentation: "modal",
            }}
          />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </TasksProvider>
  );
}
