/**
 * Task Status Types
 */
export type TaskStatus = "pending" | "in-progress" | "completed";

/**
 * Task Priority Types
 */
export type TaskPriority = "low" | "medium" | "high";

/**
 * Task Interface
 * Represents a single task in the task manager
 */
export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Task Filter Interface
 * Used for filtering and searching tasks
 */
export interface TaskFilter {
  status: TaskStatus | null;
  priority: TaskPriority | null;
  searchTerm: string;
}

/**
 * Task Sort Options
 */
export type TaskSortBy = "priority" | "createdAt" | "title";
export type TaskSortOrder = "asc" | "desc";

export interface TaskSort {
  sortBy: TaskSortBy;
  order: TaskSortOrder;
}

/**
 * Task Form Data
 * Used for creating and editing tasks
 * Note: This will be refined with Zod schema inference
 */
export interface TaskFormData {
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
}

/**
 * Redux State Interfaces
 */
export interface TaskState {
  tasks: Task[];
  filter: TaskFilter;
  sort: TaskSort;
  loading: boolean;
  error: string | null;
}

/**
 * Navigation Types
 * For React Navigation type safety
 */
export type RootStackParamList = {
  Home: undefined;
  TaskDetail: { taskId: string };
  CreateTask: undefined;
  EditTask: { taskId: string };
};

/**
 * Utility Types
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
