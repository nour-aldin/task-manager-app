import { TaskPriority, TaskStatus } from "@/types";
import { TaskFormData, taskSchema } from "@/utils/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { ThemedText } from "./themed-text";

interface TaskFormProps {
  defaultValues?: Partial<TaskFormData>;
  onSubmit: (data: TaskFormData) => void;
  onCancel: () => void;
  submitLabel?: string;
}

export function TaskForm({
  defaultValues,
  onSubmit,
  onCancel,
  submitLabel = "Create Task",
}: TaskFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: defaultValues || {
      title: "",
      description: "",
      status: "pending",
      priority: "medium",
    },
    mode: "onChange",
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formContainer}>
        {/* Title Field */}
        <View style={styles.fieldContainer}>
          <ThemedText style={styles.label}>Title *</ThemedText>
          <Controller
            control={control}
            name="title"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[styles.input, errors.title && styles.inputError]}
                placeholder="Enter task title"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            )}
          />
          {errors.title && (
            <Text style={styles.errorText}>{errors.title.message}</Text>
          )}
        </View>

        {/* Description Field */}
        <View style={styles.fieldContainer}>
          <ThemedText style={styles.label}>Description *</ThemedText>
          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[
                  styles.input,
                  styles.textArea,
                  errors.description && styles.inputError,
                ]}
                placeholder="Enter task description"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                multiline
                numberOfLines={4}
              />
            )}
          />
          {errors.description && (
            <Text style={styles.errorText}>{errors.description.message}</Text>
          )}
        </View>

        {/* Status Field */}
        <View style={styles.fieldContainer}>
          <ThemedText style={styles.label}>Status *</ThemedText>
          <Controller
            control={control}
            name="status"
            render={({ field: { onChange, value } }) => (
              <View style={styles.optionGroup}>
                <StatusButton
                  label="Pending"
                  value="pending"
                  selected={value === "pending"}
                  onPress={() => onChange("pending")}
                />
                <StatusButton
                  label="In Progress"
                  value="in-progress"
                  selected={value === "in-progress"}
                  onPress={() => onChange("in-progress")}
                />
                <StatusButton
                  label="Completed"
                  value="completed"
                  selected={value === "completed"}
                  onPress={() => onChange("completed")}
                />
              </View>
            )}
          />
          {errors.status && (
            <Text style={styles.errorText}>{errors.status.message}</Text>
          )}
        </View>

        {/* Priority Field */}
        <View style={styles.fieldContainer}>
          <ThemedText style={styles.label}>Priority *</ThemedText>
          <Controller
            control={control}
            name="priority"
            render={({ field: { onChange, value } }) => (
              <View style={styles.optionGroup}>
                <PriorityButton
                  label="Low"
                  value="low"
                  selected={value === "low"}
                  onPress={() => onChange("low")}
                />
                <PriorityButton
                  label="Medium"
                  value="medium"
                  selected={value === "medium"}
                  onPress={() => onChange("medium")}
                />
                <PriorityButton
                  label="High"
                  value="high"
                  selected={value === "high"}
                  onPress={() => onChange("high")}
                />
              </View>
            )}
          />
          {errors.priority && (
            <Text style={styles.errorText}>{errors.priority.message}</Text>
          )}
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={onCancel}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              styles.submitButton,
              !isValid && styles.submitButtonDisabled,
            ]}
            onPress={handleSubmit(onSubmit)}
            disabled={!isValid}
          >
            <Text style={styles.submitButtonText}>{submitLabel}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

// Helper Components
interface StatusButtonProps {
  label: string;
  value: TaskStatus;
  selected: boolean;
  onPress: () => void;
}

function StatusButton({ label, value, selected, onPress }: StatusButtonProps) {
  const getColor = () => {
    switch (value) {
      case "pending":
        return "#9E9E9E";
      case "in-progress":
        return "#2196F3";
      case "completed":
        return "#4CAF50";
    }
  };

  return (
    <TouchableOpacity
      style={[styles.optionButton, selected && { backgroundColor: getColor() }]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.optionButtonText,
          selected && styles.optionButtonTextSelected,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

interface PriorityButtonProps {
  label: string;
  value: TaskPriority;
  selected: boolean;
  onPress: () => void;
}

function PriorityButton({
  label,
  value,
  selected,
  onPress,
}: PriorityButtonProps) {
  const getColor = () => {
    switch (value) {
      case "low":
        return "#4CAF50";
      case "medium":
        return "#FFC107";
      case "high":
        return "#FF5252";
    }
  };

  return (
    <TouchableOpacity
      style={[styles.optionButton, selected && { backgroundColor: getColor() }]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.optionButtonText,
          selected && styles.optionButtonTextSelected,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    padding: 16,
  },
  fieldContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  inputError: {
    borderColor: "#FF5252",
  },
  textArea: {
    height: 120,
    paddingTop: 12,
    textAlignVertical: "top",
  },
  errorText: {
    color: "#FF5252",
    fontSize: 12,
    marginTop: 4,
  },
  helperText: {
    color: "#666",
    fontSize: 12,
    marginTop: 4,
  },
  optionGroup: {
    flexDirection: "row",
    gap: 8,
  },
  optionButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "#e0e0e0",
    alignItems: "center",
  },
  optionButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  optionButtonTextSelected: {
    color: "#fff",
  },
  dateButton: {
    justifyContent: "center",
  },
  dateText: {
    fontSize: 16,
    color: "#333",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
    marginTop: 32,
  },
  button: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#e0e0e0",
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  submitButton: {
    backgroundColor: "#6200EE",
  },
  submitButtonDisabled: {
    backgroundColor: "#9E9E9E",
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
});
