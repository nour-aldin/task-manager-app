import { Task, TaskPriority, TaskStatus } from "@/types";
import { useTheme } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ThemedText } from "./themed-text";

interface TaskCardProps {
  task: Task;
  onPress?: () => void;
}

export function TaskCard({ task, onPress }: TaskCardProps) {
  const { dark } = useTheme();
  console.log({ dark });
  return (
    <TouchableOpacity
      style={[
        styles.taskCard,
        { backgroundColor: dark ? "#222222ff" : "#ffffff" },
      ]}
      onPress={onPress}
    >
      <View style={styles.taskHeader}>
        <ThemedText type="defaultSemiBold" style={styles.taskTitle}>
          {task.title}
        </ThemedText>
        <View style={[styles.priorityBadge, getPriorityColor(task.priority)]}>
          <Text style={styles.priorityText}>{task.priority}</Text>
        </View>
      </View>
      <ThemedText style={styles.taskDescription} numberOfLines={2}>
        {task.description}
      </ThemedText>
      <View style={styles.taskFooter}>
        <View style={[styles.statusBadge, getStatusColor(task.status)]}>
          <Text style={styles.statusText}>{task.status}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

// Helper functions for styling
export const getPriorityColor = (priority: TaskPriority) => {
  switch (priority) {
    case "high":
      return { backgroundColor: "#FF5252" };
    case "medium":
      return { backgroundColor: "#FFC107" };
    case "low":
      return { backgroundColor: "#4CAF50" };
  }
};

const getStatusColor = (status: TaskStatus) => {
  switch (status) {
    case "pending":
      return { backgroundColor: "#9E9E9E" };
    case "in-progress":
      return { backgroundColor: "#2196F3" };
    case "completed":
      return { backgroundColor: "#4CAF50" };
  }
};

const styles = StyleSheet.create({
  taskCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  taskHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  taskTitle: {
    fontSize: 18,
    flex: 1,
    marginRight: 8,
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  priorityText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
    textTransform: "capitalize",
  },
  taskDescription: {
    fontSize: 14,
    marginBottom: 12,
    opacity: 0.8,
  },
  taskFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
    textTransform: "capitalize",
  },
});
