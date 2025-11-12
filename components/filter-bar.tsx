import { TaskPriority, TaskStatus } from "@/types";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTasks } from "../contexts/tasks-context";
import { ThemedText } from "./themed-text";

export function FilterBar() {
  const { setFilter, filter } = useTasks();

  const handleFilterByStatus = (status: TaskStatus | null) => {
    setFilter({ status });
  };

  const handleFilterByPriority = (priority: TaskPriority | null) => {
    setFilter({ priority });
  };

  return (
    <View style={styles.container}>
      {/* Status Filter */}
      <View style={styles.filterSection}>
        <ThemedText style={styles.label}>Status:</ThemedText>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.scrollView}
        >
          <FilterButton
            label="All"
            active={filter.status === null}
            onPress={() => handleFilterByStatus(null)}
          />
          <FilterButton
            label="Pending"
            active={filter.status === "pending"}
            onPress={() => handleFilterByStatus("pending")}
          />
          <FilterButton
            label="In Progress"
            active={filter.status === "in-progress"}
            onPress={() => handleFilterByStatus("in-progress")}
          />
          <FilterButton
            label="Completed"
            active={filter.status === "completed"}
            onPress={() => handleFilterByStatus("completed")}
          />
        </ScrollView>
      </View>

      {/* Priority Filter */}
      <View style={styles.filterSection}>
        <ThemedText style={styles.label}>Priority:</ThemedText>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.scrollView}
        >
          <FilterButton
            label="All"
            active={filter.priority === null}
            onPress={() => handleFilterByPriority(null)}
          />
          <FilterButton
            label="High"
            active={filter.priority === "high"}
            onPress={() => handleFilterByPriority("high")}
            color="#FF5252"
          />
          <FilterButton
            label="Medium"
            active={filter.priority === "medium"}
            onPress={() => handleFilterByPriority("medium")}
            color="#FFC107"
          />
          <FilterButton
            label="Low"
            active={filter.priority === "low"}
            onPress={() => handleFilterByPriority("low")}
            color="#4CAF50"
          />
        </ScrollView>
      </View>
    </View>
  );
}

interface FilterButtonProps {
  label: string;
  active: boolean;
  onPress: () => void;
  color?: string;
}

function FilterButton({ label, active, onPress, color }: FilterButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.filterButton,
        active && styles.filterButtonActive,
        active && color && { backgroundColor: color },
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.filterButtonText,
          active && styles.filterButtonTextActive,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
  },
  filterSection: {
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },
  scrollView: {
    flexDirection: "row",
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#e0e0e0",
    marginRight: 8,
  },
  filterButtonActive: {
    backgroundColor: "#6200EE",
  },
  filterButtonText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#333",
  },
  filterButtonTextActive: {
    color: "#fff",
  },
});
