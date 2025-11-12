import { StyleSheet, View } from "react-native";
import { ThemedText } from "./themed-text";

interface EmptyStateProps {
  title?: string;
  message?: string;
}

export function EmptyState({
  title = "No Tasks Found",
  message = "Tap the + button to create new task",
}: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        {title}
      </ThemedText>
      <ThemedText style={styles.message}>{message}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
    paddingHorizontal: 32,
  },
  title: {
    marginBottom: 8,
    textAlign: "center",
  },
  message: {
    opacity: 0.7,
    textAlign: "center",
  },
});
