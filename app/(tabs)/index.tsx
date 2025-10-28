import { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useNote } from "../context/NoteProvider";

export default function HomeScreen() {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [lastText1, setLastText1] = useState("");
  const [lastText2, setLastText2] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const { note, setNote } = useNote();

  const [registros, setRegistros] = useState<
    {
      id: number;
      text1: string;
      text2: string;
      result: string;
      fecha: string;
    }[]
  >([]);

  const handleText1Change = (value: string) => {
    // const cleaned = value.replace(/\s+/g, "");
    // if (value !== cleaned) {
    //   setError("No se permiten espacios");
    //   setTimeout(() => setError(""), 1400);
    // }
    setText1(value);
    // if (cleaned.length < lastText1.length || text2.length < lastText2.length) {
    //   setResult("");
    // }
  };

  const handleText2Change = (value: string) => {
    // const cleaned = value.replace(/\s+/g, "");
    // if (value !== cleaned) {
    //   setError("No se permiten espacios");
    //   setTimeout(() => setError(""), 1400);
    // }
    setText2(value);
    // if (text1.length < lastText1.length || cleaned.length < lastText2.length) {
    //   setResult("");
    // }
  };

  const handleSend = () => {
    if (text1.trim() === "" || text2.trim() === "") {
      setError("Ambos campos deben estar llenos");
      setResult("");
      return;
    }

    // if (/\s/.test(text1) || /\s/.test(text2)) {
    //   setError("No se permiten espacios en los campos");
    //   return;
    // }

    const combined = text1 + text2;
    setResult(combined);
    setError("");
    setLastText1(text1);
    setLastText2(text2);

    const fecha = new Date().toLocaleString();
    const id = Date.now();
    setRegistros((prev) => [
      { id, text1, text2, result: combined, fecha },
      ...prev,
    ]);

    const newNotes = [
      ...registros,
      { id, text1, text2, result: combined, fecha }
    ];

    setNote(newNotes);

    // limpiar inputs después de enviar y cerrar formulario
    setText1("");
    setText2("");

    // mensaje de éxito temporal
    setSuccessMsg("Agregado correctamente");
    setTimeout(() => setSuccessMsg(""), 2000);
  };

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.formBox}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Registrar Nota</Text>
          </View>

          <View style={{ gap: 3 }}>
            <Text style={{ fontSize: 15 }}>Título de la nota</Text>
            <TextInput
              style={styles.input}
              placeholder="Ej. Compras"
              placeholderTextColor="#aaa"
              value={text1}
              onChangeText={handleText1Change}
              autoCapitalize="none"
            />
          </View>

          <View style={{ gap: 3 }}>
            <Text style={{ fontSize: 15 }}>Escribe la nota</Text>
            <TextInput
              style={styles.input}
              placeholder="Ej. Comprar 1K de pollo"
              placeholderTextColor="#aaa"
              value={text2}
              onChangeText={handleText2Change}
              autoCapitalize="none"
            />
          </View>

          <View style={{ marginTop: 8 }}>
            <TouchableOpacity style={styles.button} onPress={handleSend}>
              <Text style={styles.buttonText}>Guardar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.secondaryButton]}
              onPress={() => {
                setText1("");
                setText2("");
              }}
            >
              <Text style={[styles.buttonText, styles.secondaryButtonText]}>
                Cancelar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View>
        {successMsg !== "" && (
          <Text style={styles.successText}>{successMsg}</Text>
        )}

        {/* Vista principal limpia (sin inputs) */}
        {/* <Text style={styles.infoText}>Hola :3</Text> */}

        {error !== "" && <Text style={styles.errorText}>{error}</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    gap: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "#ff5757",
    marginTop: 0,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  infoText: {
    color: "#eebbc3",
    fontSize: 18,
    marginBottom: 12,
  },
  successText: {
    backgroundColor: "#e6ffed",
    color: "#0a8a3f",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    marginBottom: 12,
    fontWeight: "600",
  },
  input: {
    width: "100%",
    height: 56,
    borderColor: "#3e97dbff",
    borderWidth: 2,
    borderRadius: 14,
    paddingHorizontal: 18,
    fontSize: 20,
    backgroundColor: "#fff",
    color: "#000",
    marginBottom: 12,
    shadowColor: "#3e97dbff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 4,
  },
  button: {
    backgroundColor: "#3e97dbff",
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 28,
    alignItems: "center",
    marginBottom: 10,
    shadowColor: "#3e97dbff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 6,
    elevation: 6,
  },
  secondaryButton: {
    backgroundColor: "#fff",
  },
  tertiaryButton: {
    backgroundColor: "#6b7280",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  secondaryButtonText: {
    color: "#3e97dbff",
  },
  tertiaryButtonText: {
    color: "#fff",
  },
  // modalBackdrop: {
  //   flex: 1,
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  formBox: {
    width: "90%",
    backgroundColor: "#eee",
    borderRadius: 12,
    padding: 16,
    minWidth: 320
  },
  modalBox: {
    width: "90%",
    maxHeight: "80%",
    backgroundColor: "#393d63",
    borderRadius: 12,
    padding: 16,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 25,
    fontWeight: "700",
    color: "#3e97dbff",
  },
  closeButton: {
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  closeButtonText: {
    color: "#eebbc3",
    fontWeight: "600",
  },
  emptyBox: {
    padding: 20,
    alignItems: "center",
  },
  emptyText: {
    color: "#eebbc3",
  },
});
