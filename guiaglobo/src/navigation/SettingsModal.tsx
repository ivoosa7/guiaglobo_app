import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { useTheme } from '../context/AppContext';

export default function SettingsModal({ visible, onClose }: { visible: boolean, onClose: () => void }) {
  const { toggleTheme } = useTheme();

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Configurações</Text>
          
          <TouchableOpacity onPress={toggleTheme} style={styles.btn}>
            <Text style={styles.btnText}>Alternar Tema (Claro/Escuro)</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={onClose} style={styles.btnClose}>
            <Text style={styles.btnCloseText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)', // Fundo escuro semi-transparente
  },
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  btn: {
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  btnText: {
    color: 'white',
    fontWeight: '600',
  },
  btnClose: {
    marginTop: 10,
    padding: 10,
  },
  btnCloseText: {
    color: 'gray',
  }
});