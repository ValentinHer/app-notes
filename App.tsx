import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Platform,
  Modal,
  FlatList,
  Pressable,
  SafeAreaView,
} from 'react-native';

export default function App() {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [lastText1, setLastText1] = useState('');
  const [lastText2, setLastText2] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // registros para el modal
  const [registros, setRegistros] = useState<
    { id: number; text1: string; text2: string; result: string; fecha: string }[]
  >([]);
  const [modalVisible, setModalVisible] = useState(false); // para ver registros
  const [formVisible, setFormVisible] = useState(false); // para mostrar el formulario (inputs)

  const handleSend = () => {
    if (text1.trim() === '' || text2.trim() === '') {
      setError('Ambos campos deben estar llenos');
      setResult('');
      return;
    }

    if (/\s/.test(text1) || /\s/.test(text2)) {
      setError('No se permiten espacios en los campos');
      return;
    }

    const combined = text1 + text2;
    setResult(combined);
    setError('');
    setLastText1(text1);
    setLastText2(text2);

    const fecha = new Date().toLocaleString();
    const id = Date.now();
    setRegistros((prev) => [{ id, text1, text2, result: combined, fecha }, ...prev]);

    // limpiar inputs después de enviar y cerrar formulario
    setText1('');
    setText2('');
    setFormVisible(false);

    // mensaje de éxito temporal
    setSuccessMsg('Agregado correctamente');
    setTimeout(() => setSuccessMsg(''), 2000);
  };

  const handleText1Change = (value: string) => {
    const cleaned = value.replace(/\s+/g, '');
    if (value !== cleaned) {
      setError('No se permiten espacios');
      setTimeout(() => setError(''), 1400);
    }
    setText1(cleaned);
    if (cleaned.length < lastText1.length || text2.length < lastText2.length) {
      setResult('');
    }
  };

  const handleText2Change = (value: string) => {
    const cleaned = value.replace(/\s+/g, '');
    if (value !== cleaned) {
      setError('No se permiten espacios');
      setTimeout(() => setError(''), 1400);
    }
    setText2(cleaned);
    if (text1.length < lastText1.length || cleaned.length < lastText2.length) {
      setResult('');
    }
  };

  const deleteRegistro = (id: number) => {
    setRegistros((prev) => prev.filter((r) => r.id !== id));
  };

  const renderRegistro = ({ item }: { item: any }) => (
    <View style={styles.card}>
      <View style={styles.cardRow}>
        <View style={{ flex: 1 }}>
          <Text style={styles.cardTitle}>{item.text1}</Text>
          <Text style={styles.cardText}>Nombre: {item.text1}</Text>
          <Text style={styles.cardText}>Cantidad:$ {item.text2}</Text>
          <Text style={styles.cardDate}>{item.fecha}</Text>
        </View>
        <Pressable style={styles.deleteButton} onPress={() => deleteRegistro(item.id)}>
          <Text style={styles.deleteButtonText}>Eliminar</Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {successMsg !== '' && <Text style={styles.successText}>{successMsg}</Text>}

        {/* Vista principal limpia (sin inputs) */}
        <Text style={styles.infoText}>Hola :3</Text>

        {error !== '' && <Text style={styles.errorText}>{error}</Text>}
      </View>

      {/* Footer con botones ubicados abajo */}
      <View style={styles.footer}>
        {/* Mantener el botón Agregar pero ahora abre el formulario */}
        <TouchableOpacity style={styles.button} onPress={() => setFormVisible(true)}>
          <Text style={styles.buttonText}>Agregar➕</Text>
        </TouchableOpacity>

        {/* Botón nuevo que también abre el formulario (según pedido) */}
        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          onPress={() => setFormVisible(true)}
        >
          <Text style={[styles.buttonText, styles.secondaryButtonText]}>Formulario📝</Text>
        </TouchableOpacity>

        {/* Ver registros sigue igual */}
        <TouchableOpacity
          style={[styles.button, styles.tertiaryButton]}
          onPress={() => setModalVisible(true)}
        >
          <Text style={[styles.buttonText, styles.tertiaryButtonText]}>Ver Personas👁️</Text>
        </TouchableOpacity>
      </View>

      <StatusBar style="light" />

      {/* Modal: formulario con los dos inputs */}
      <Modal visible={formVisible} animationType="slide" transparent>
        <View style={styles.modalBackdrop}>
          <View style={styles.formBox}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Formulario</Text>
              <Pressable onPress={() => setFormVisible(false)} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Cerrar</Text>
              </Pressable>
            </View>

            <TextInput
              style={styles.input}
              placeholder="Nombre"
              placeholderTextColor="#aaa"
              value={text1}
              onChangeText={handleText1Change}
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholder="Cantidad"
              placeholderTextColor="#aaa"
              value={text2}
              onChangeText={handleText2Change}
              autoCapitalize="none"
            />

            <View style={{ marginTop: 8 }}>
              <TouchableOpacity style={styles.button} onPress={handleSend}>
                <Text style={styles.buttonText}>Guardar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.secondaryButton]}
                onPress={() => {
                  setText1('');
                  setText2('');
                  setFormVisible(false);
                }}
              >
                <Text style={[styles.buttonText, styles.secondaryButtonText]}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal con lista de registros */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalBox}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Registros</Text>
              <Pressable onPress={() => setModalVisible(false)} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Cerrar</Text>
              </Pressable>
            </View>

            {registros.length === 0 ? (
              <View style={styles.emptyBox}>
                <Text style={styles.emptyText}>No hay registros aún.</Text>
              </View>
            ) : (
              <FlatList
                data={registros}
                keyExtractor={(i) => String(i.id)}
                renderItem={renderRegistro}
                contentContainerStyle={{ paddingBottom: 12 }}
              />
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#232946',
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoText: {
    color: '#eebbc3',
    fontSize: 18,
    marginBottom: 12,
  },
  successText: {
    backgroundColor: '#e6ffed',
    color: '#0a8a3f',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    marginBottom: 12,
    fontWeight: '600',
  },
  input: {
    width: '100%',
    height: 56,
    borderColor: '#eebbc3',
    borderWidth: 2,
    borderRadius: 14,
    paddingHorizontal: 18,
    fontSize: 20,
    backgroundColor: '#393d63',
    color: '#eebbc3',
    marginBottom: 12,
    shadowColor: '#eebbc3',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 4,
  },
  footer: {
    padding: 24,
    paddingBottom: Platform.OS === 'ios' ? 36 : 24,
    backgroundColor: 'transparent',
  },
  button: {
    backgroundColor: '#eebbc3',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 28,
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#eebbc3',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 6,
    elevation: 6,
  },
  secondaryButton: {
    backgroundColor: '#393d63',
  },
  tertiaryButton: {
    backgroundColor: '#6b7280',
  },
  buttonText: {
    color: '#232946',
    fontSize: 18,
    fontWeight: '700',
  },
  secondaryButtonText: {
    color: '#eebbc3',
  },
  tertiaryButtonText: {
    color: '#fff',
  },
  errorText: {
    color: '#ff5757',
    marginTop: 8,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  /* Modal styles */
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formBox: {
    width: '90%',
    backgroundColor: '#393d63',
    borderRadius: 12,
    padding: 16,
  },
  modalBox: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: '#393d63',
    borderRadius: 12,
    padding: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#eebbc3',
  },
  closeButton: {
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  closeButtonText: {
    color: '#eebbc3',
    fontWeight: '600',
  },
  emptyBox: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    color: '#eebbc3',
  },

  /* Card */
  card: {
    backgroundColor: '#eebbc3',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#393d63',
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 6,
    color: '#393d63',
  },
  cardText: {
    fontSize: 14,
    color: '#393d63',
  },
  cardDate: {
    marginTop: 8,
    fontSize: 12,
    color: '#393d63',
  },
  deleteButton: {
    backgroundColor: '#ff6b6b',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    marginLeft: 12,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});