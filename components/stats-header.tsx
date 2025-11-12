import { StyleSheet, View } from "react-native";
import { useTasks } from "../contexts/tasks-context";
import { ThemedText } from "./themed-text";

export function StatsHeader() {
  const { tasks } = useTasks();

  const pendingTasksCount = tasks.filter(
    (task) => task.status === "pending"
  ).length;

  const inProgressTasksCount = tasks.filter(
    (task) => task.status === "in-progress"
  ).length;

  const completedTasksCount = tasks.filter(
    (task) => task.status === "completed"
  ).length;

  return (
    <View style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        My Tasks
      </ThemedText>
      <View style={styles.statsContainer}>
        <StatItem label="Total" value={tasks.length} />
        <StatItem label="Pending" value={pendingTasksCount} />
        <StatItem label="In Progress" value={inProgressTasksCount} />
        <StatItem label="Completed" value={completedTasksCount} />
      </View>
    </View>
  );
}

interface StatItemProps {
  label: string;
  value: number;
}

function StatItem({ label, value }: StatItemProps) {
  return (
    <View style={styles.statItem}>
      <ThemedText type="defaultSemiBold" style={styles.statValue}>
        {value}
      </ThemedText>
      <ThemedText style={styles.statLabel}>{label}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingTop: 60,
  },
  title: {
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 24,
  },
  statLabel: {
    fontSize: 12,
    marginTop: 4,
    opacity: 0.7,
  },
});
