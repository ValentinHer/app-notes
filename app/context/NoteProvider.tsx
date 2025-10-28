import { createContext, useContext, useState } from "react";

type Note = {
  id: number;
  text1: string;
  text2: string;
  result: string;
  fecha: string;
};


type NoteContextType = {
  note: Note;
  setNote: React.Dispatch<React.SetStateAction<Note>>;
};

const NoteContext = createContext<NoteContextType | null>(null);

export function NoteProvider({ children }) {
  const [note, setNote] = useState<Note>({
    id: 0,
    text1: "",
    text2: "",
    result: "",
    fecha: "",
  });

  return (
    <NoteContext.Provider value={{ note, setNote }}>
      {children}
    </NoteContext.Provider>
  );
}

export const useNote = () => useContext(NoteContext);
