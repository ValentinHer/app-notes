import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { useNote } from "../context/NoteProvider";

export default function ProfileScreen() {
  const { note, setNote } = useNote();

  const deleteRegistro = (id: number) => {
    setNote((prev) => prev.filter((r) => r.id !== id));
  };

  const renderRegistro = ({ item }: { item: any }) => (
    <View style={styles.card}>
      <View style={styles.cardRow}>
        <View style={{ flex: 1 }}>
          <Text style={styles.cardTitle}>{item.text1}</Text>
          <Text style={styles.cardText}>Título: {item.text1}</Text>
          <Text style={styles.cardText}>Nota: {item.text2}</Text>
          <Text style={styles.cardDate}>{item.fecha}</Text>
        </View>
        <Pressable
          style={styles.deleteButton}
          onPress={() => deleteRegistro(item.id)}
        >
          <Text style={styles.deleteButtonText}>Eliminar</Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <View style={styles.modalBackdrop}>
      <View style={styles.modalBox}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Mis Notas</Text>
        </View>

        {note.length === 0 ? (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyText}>No hay registros aún.</Text>
          </View>
        ) : (
          <FlatList
            data={note}
            keyExtractor={(i) => String(i.id)}
            renderItem={renderRegistro}
            contentContainerStyle={{ paddingBottom: 12 }}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalBackdrop: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  formBox: {
    width: "90%",
    backgroundColor: "#eee",
    borderRadius: 12,
    padding: 16,
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
    color: "#3e97dbff",
  },

  card: {
    backgroundColor: "#3e97dbff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#3e97dbff",
    color: '#fff'
  },
  cardRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 6,
    color: "#fff",
  },
  cardText: {
    fontSize: 14,
    color: "#fff",
  },
  cardDate: {
    marginTop: 8,
    fontSize: 12,
    color: "#fff",
  },
  deleteButton: {
    backgroundColor: "#ff6b6b",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    marginLeft: 12,
  },
  deleteButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
