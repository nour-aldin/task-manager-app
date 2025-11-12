import { getPriorityColor } from "@/components/task-card";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useTasks } from "@/contexts/tasks-context";
import { TaskStatus } from "@/types";
import { useTheme } from "@react-navigation/native";
import { router, useLocalSearchParams } from "expo-router";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function TaskDetailScreen() {
  const { dark } = useTheme();
  const { taskId } = useLocalSearchParams<{ taskId: string }>();
  const { tasks, deleteTask, updateTask } = useTasks();

  const task = tasks.find((t) => t.id === taskId);
  if (!task) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText type="title">Task not found</ThemedText>
      </ThemedView>
    );
  }

  const handleEdit = () => {
    router.push({
      pathname: "/edit-task",
      params: { taskId: task.id },
    });
  };

  const handleDelete = () => {
    Alert.alert(
      "Delete Task",
      "Are you sure you want to delete this task?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            deleteTask(task.id);
            router.back();
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.statusButtons}>
          {task.status !== "pending" && (
            <TouchableOpacity
              style={[styles.button]}
              onPress={() =>
                updateTask(task.id, { ...task, status: "pending" })
              }
            >
              <Text
                style={[
                  styles.deleteButtonText,
                  { color: dark ? "#fff" : "#000" },
                ]}
              >
                Mark as In Pending
              </Text>
            </TouchableOpacity>
          )}
          {task.status !== "in-progress" && (
            <TouchableOpacity
              style={[styles.button]}
              onPress={() =>
                updateTask(task.id, { ...task, status: "in-progress" })
              }
            >
              <Text
                style={[
                  styles.deleteButtonText,
                  { color: dark ? "#fff" : "#000" },
                ]}
              >
                Mark as In Progress
              </Text>
            </TouchableOpacity>
          )}
          {task.status !== "completed" && (
            <TouchableOpacity
              style={[styles.button]}
              onPress={() =>
                updateTask(task.id, { ...task, status: "completed" })
              }
            >
              <Text
                style={[
                  styles.deleteButtonText,
                  { color: dark ? "#fff" : "#000" },
                ]}
              >
                Mark as Completed
              </Text>
            </TouchableOpacity>
          )}
        </View>
        {/* Header */}
        <View style={styles.header}>
          <ThemedText type="title" style={styles.title}>
            {task.title}
          </ThemedText>
          <View style={styles.badges}>
            <View
              style={[styles.priorityBadge, getPriorityColor(task.priority)]}
            >
              <Text style={styles.badgeText}>{task.priority}</Text>
            </View>
            <View style={[styles.statusBadge, getStatusColor(task.status)]}>
              <Text style={styles.badgeText}>{task.status}</Text>
            </View>
          </View>
        </View>

        {/* Details */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Description</ThemedText>
          <ThemedText style={styles.description}>{task.description}</ThemedText>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Created</ThemedText>
          <ThemedText style={styles.date}>
            {new Date(task.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </ThemedText>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Last Updated</ThemedText>
          <ThemedText style={styles.date}>
            {new Date(task.updatedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </ThemedText>
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={[styles.button, styles.editButton]}
          onPress={handleEdit}
        >
          <Text style={styles.editButtonText}>Edit Task</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.deleteButton]}
          onPress={handleDelete}
        >
          <Text style={styles.deleteButtonText}>Delete Task</Text>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

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
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginTop: 60,
    marginBottom: 24,
  },
  title: {
    marginBottom: 16,
  },
  badges: {
    flexDirection: "row",
    gap: 8,
  },
  priorityBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  badgeText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    textTransform: "capitalize",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    opacity: 0.7,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  date: {
    fontSize: 16,
  },
  statusButtons: {
    flexDirection: "row",
    fontSize: 4,
  },
  actionButtons: {
    flexDirection: "row",
    padding: 16,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  button: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  editButton: {
    backgroundColor: "#6200EE",
  },
  editButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  deleteButton: {
    backgroundColor: "#FF5252",
  },
  deleteButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
});
