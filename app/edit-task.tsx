import { TaskForm } from "@/components/task-form";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Task } from "@/types";
import { TaskFormData } from "@/utils/validation";
import { router, useLocalSearchParams } from "expo-router";
import { useTasks } from "../contexts/tasks-context";

export default function EditTaskScreen() {
  const { taskId } = useLocalSearchParams<{ taskId: string }>();
  const { tasks, updateTask } = useTasks();

  const task = tasks.find((t) => t.id === taskId);

  if (!task) {
    return (
      <ThemedView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <ThemedText type="title">Task not found</ThemedText>
      </ThemedView>
    );
  }

  const handleSubmit = (data: TaskFormData) => {
    const updatedTaskData: Task = {
      ...task,
      title: data.title,
      description: data.description,
      status: data.status,
      priority: data.priority,
      updatedAt: new Date(),
    };

    updateTask(updatedTaskData.id, updatedTaskData);
    router.back();
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <ThemedView style={{ flex: 1 }}>
      <TaskForm
        defaultValues={{
          title: task.title,
          description: task.description,
          status: task.status,
          priority: task.priority,
        }}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        submitLabel="Update Task"
      />
    </ThemedView>
  );
}
