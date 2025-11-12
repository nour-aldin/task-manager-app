import type { Task, TaskFilter, TaskFormData, TaskSort } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

const STORAGE_KEY = "@tasks";

interface TasksContextValue {
  tasks: Task[];
  filter: TaskFilter;
  sort: TaskSort;
  loading: boolean;

  // Task CRUD operations
  addTask: (taskData: TaskFormData) => Promise<void>;
  updateTask: (id: string, taskData: Partial<TaskFormData>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  getTaskById: (id: string) => Task | undefined;

  // Filter and Sort operations
  setFilter: (filter: Partial<TaskFilter>) => void;
  setSort: (sort: Partial<TaskSort>) => void;
  clearFilters: () => void;

  // Computed values
  filteredTasks: Task[];
}

const TasksContext = createContext<TasksContextValue | undefined>(undefined);

const defaultFilter: TaskFilter = {
  status: null,
  priority: null,
  searchTerm: "",
};

const defaultSort: TaskSort = {
  order: "asc",
};

export function TasksProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilterState] = useState<TaskFilter>(defaultFilter);
  const [sort, setSortState] = useState<TaskSort>(defaultSort);
  const [loading, setLoading] = useState(true);

  // Load tasks from AsyncStorage on mount
  useEffect(() => {
    loadTasks();
  }, []);

  // Save tasks to AsyncStorage whenever they change
  useEffect(() => {
    if (!loading) {
      saveTasks();
    }
  }, [tasks, loading]);

  const loadTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedTasks) {
        const parsedTasks = JSON.parse(storedTasks);
        // Convert date strings back to Date objects
        const tasksWithDates = parsedTasks.map((task: any) => ({
          ...task,
          createdAt: new Date(task.createdAt),
          updatedAt: new Date(task.updatedAt),
        }));
        setTasks(tasksWithDates);
      }
    } catch (error) {
      console.error("Error loading tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  const saveTasks = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error("Error saving tasks:", error);
    }
  };

  const addTask = useCallback(async (taskData: TaskFormData) => {
    const newTask: Task = {
      id: uuidv4(),
      ...taskData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setTasks((prev) => [...prev, newTask]);
  }, []);

  const updateTask = useCallback(
    async (id: string, taskData: Partial<TaskFormData>) => {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === id
            ? { ...task, ...taskData, updatedAt: new Date() }
            : task
        )
      );
    },
    []
  );

  const deleteTask = useCallback(async (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }, []);

  const getTaskById = useCallback(
    (id: string) => {
      return tasks.find((task) => task.id === id);
    },
    [tasks]
  );

  const setFilter = useCallback((newFilter: Partial<TaskFilter>) => {
    setFilterState((prev) => ({ ...prev, ...newFilter }));
  }, []);

  const setSort = useCallback((newSort: Partial<TaskSort>) => {
    setSortState((prev) => ({ ...prev, ...newSort }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilterState(defaultFilter);
  }, []);

  // Filter and sort tasks
  const filteredTasks = React.useMemo(() => {
    let result = [...tasks];

    // Apply filters
    if (filter.status) {
      result = result.filter((task) => task.status === filter.status);
    }
    if (filter.priority) {
      result = result.filter((task) => task.priority === filter.priority);
    }
    if (filter.searchTerm) {
      const searchLower = filter.searchTerm.toLowerCase();
      result = result.filter(
        (task) =>
          task.title.toLowerCase().includes(searchLower) ||
          task.description.toLowerCase().includes(searchLower)
      );
    }

    // Apply sorting
    result.sort((a, b) => {
      let comparison = 0;

      switch (sort.sortBy) {
        case "createdAt":
          comparison = a.createdAt.getTime() - b.createdAt.getTime();
          break;
        case "title":
          comparison = a.title.localeCompare(b.title);
          break;
        case "priority":
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          comparison = priorityOrder[a.priority] - priorityOrder[b.priority];
          break;
      }

      return sort.order === "asc" ? comparison : -comparison;
    });

    return result;
  }, [tasks, filter, sort]);

  const value: TasksContextValue = {
    tasks,
    filter,
    sort,
    loading,
    addTask,
    updateTask,
    deleteTask,
    getTaskById,
    setFilter,
    setSort,
    clearFilters,
    filteredTasks,
  };

  return (
    <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TasksContext);
  if (context === undefined) {
    throw new Error("useTasks must be used within a TasksProvider");
  }
  return context;
}
