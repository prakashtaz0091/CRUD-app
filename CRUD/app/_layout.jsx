import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Task Manager" }} />
      <Stack.Screen name="add_task" options={{ title: "Add Task" }} />
    </Stack>
  )
}
