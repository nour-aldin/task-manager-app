import { EmptyState } from "@/components/empty-state";
import { FilterBar } from "@/components/filter-bar";
import { FloatingActionButton } from "@/components/floating-action-button";
import { SearchBar } from "@/components/search-bar";
import { StatsHeader } from "@/components/stats-header";
import { TaskCard } from "@/components/task-card";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useTasks } from "@/contexts/tasks-context";
import { Task } from "@/types";
import { router } from "expo-router";
import { ActivityIndicator, FlatList, StyleSheet } from "react-native";

export default function HomeScreen() {
  const { filteredTasks, loading } = useTasks();

  const handleTaskPress = (task: Task) => {
    router.push({
      pathname: "/task-detail",
      params: { taskId: task.id },
    });
  };

  const handleCreateTask = () => {
    router.push("/create-task");
  };

  if (loading) {
    return (
      <ThemedView style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
        <ThemedText style={styles.loadingText}>Loading tasks...</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <StatsHeader />
      <SearchBar />
      <FilterBar />

      <FlatList
        data={filteredTasks}
        renderItem={({ item }) => (
          <TaskCard task={item} onPress={() => handleTaskPress(item)} />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={<EmptyState />}
      />

      <FloatingActionButton onPress={handleCreateTask} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 12,
  },
  listContent: {
    padding: 16,
    paddingBottom: 80,
  },
});
