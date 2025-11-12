import AsyncStorage from "@react-native-async-storage/async-storage";
import { Task } from "../types";

const TASKS_KEY = "@tasks";

/**
 * Save tasks to AsyncStorage
 * @param tasks - Array of tasks to save
 */
export const saveTasks = async (tasks: Task[]): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(tasks);
    await AsyncStorage.setItem(TASKS_KEY, jsonValue);
  } catch (error) {
    console.error("Error saving tasks:", error);
    throw error;
  }
};

/**
 * Load tasks from AsyncStorage
 * @returns Array of tasks or empty array if none found
 */
export const loadTasks = async (): Promise<Task[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem(TASKS_KEY);
    if (jsonValue != null) {
      const tasks = JSON.parse(jsonValue);
      // Convert date strings back to Date objects
      return tasks.map((task: any) => ({
        ...task,
        createdAt: new Date(task.createdAt),
        updatedAt: new Date(task.updatedAt),
      }));
    }
    return [];
  } catch (error) {
    console.error("Error loading tasks:", error);
    return [];
  }
};

/**
 * Clear all tasks from AsyncStorage
 */
export const clearTasks = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(TASKS_KEY);
  } catch (error) {
    console.error("Error clearing tasks:", error);
    throw error;
  }
};

/**
 * Get a single task by ID from AsyncStorage
 * @param taskId - ID of the task to retrieve
 */
export const getTaskById = async (taskId: string): Promise<Task | null> => {
  try {
    const tasks = await loadTasks();
    return tasks.find((task) => task.id === taskId) || null;
  } catch (error) {
    console.error("Error getting task by ID:", error);
    return null;
  }
};
