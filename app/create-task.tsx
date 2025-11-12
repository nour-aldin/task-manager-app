import { TaskForm } from "@/components/task-form";
import { ThemedView } from "@/components/themed-view";
import { useTasks } from "@/contexts/tasks-context";
import { Task } from "@/types";
import { TaskFormData } from "@/utils/validation";
import { router } from "expo-router";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

export default function CreateTaskScreen() {
  const { addTask } = useTasks();

  const handleSubmit = (data: TaskFormData) => {
    const now = new Date();
    const newTask: Task = {
      id: uuidv4(),
      title: data.title,
      description: data.description,
      status: data.status,
      priority: data.priority,
      createdAt: now,
      updatedAt: now,
    };

    addTask(newTask);
    router.back();
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <ThemedView style={{ flex: 1 }}>
      <TaskForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        submitLabel="Create Task"
      />
    </ThemedView>
  );
}
