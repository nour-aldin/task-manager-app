import { useMemo, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { useTasks } from "../contexts/tasks-context";

interface SearchBarProps {
  placeholder?: string;
  debounceMs?: number;
}

export function SearchBar({
  placeholder = "Search tasks...",
  debounceMs = 300,
}: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const { setFilter } = useTasks();
  // Debounce the search
  const debouncedSearch = useMemo(() => {
    let timeoutId: number;
    return (text: string) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setFilter({ searchTerm: text });
      }, debounceMs);
    };
  }, [debounceMs]);

  const handleSearch = (text: string) => {
    setSearchTerm(text);
    debouncedSearch(text);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={searchTerm}
        onChangeText={handleSearch}
        placeholderTextColor="#999"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  input: {
    height: 48,
    borderRadius: 8,
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 16,
    fontSize: 16,
  },
});
