import React from "react";
import { Stack } from "expo-router";
import { NoteProvider } from "./context/NoteProvider";

export default function RootLayout() {
  return (
    <NoteProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </NoteProvider>
  );
}
