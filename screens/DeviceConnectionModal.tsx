import React, { FC, useCallback } from "react";
import {
  FlatList,
  SafeAreaView,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  View,
} from "react-native";
import { Device } from "react-native-ble-plx";

type DeviceModalProps = {
  devices: Device[];
  visible: boolean;
  connectToPeripheral: (device: Device) => void;
  closeModal: () => void;
};

const DeviceModal: FC<DeviceModalProps> = (props) => {
  const { devices, visible, connectToPeripheral, closeModal } = props;

  const connectAndCloseModal = useCallback(
    (item: Device) => {
      connectToPeripheral(item);
      closeModal();
    },
    [closeModal, connectToPeripheral]
  );

  const renderDeviceModalListItem = useCallback(
    ({ item }: { item: Device }) => (
      <TouchableOpacity
        onPress={() => connectAndCloseModal(item)}
        style={modalStyle.ctaButton}
      >
        <Text style={modalStyle.ctaButtonText}>Stress Sensor</Text>
      </TouchableOpacity>
    ),
    [connectAndCloseModal]
  );

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={closeModal}
    >
      <SafeAreaView style={modalStyle.modalContainer}>
        <View style={modalStyle.modalTitle}>
          <Text style={modalStyle.modalTitleText}>
            Tap on a device to connect
          </Text>
          <FlatList
            contentContainerStyle={modalStyle.modalFlatlistContainer}
            data={devices}
            renderItem={renderDeviceModalListItem}
            keyExtractor={(item) => item.id} // Provide a unique key extractor
          />
        </View>
        <TouchableOpacity style={modalStyle.closeButton} onPress={closeModal}>
          <Text style={modalStyle.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </Modal>
  );
};

const modalStyle = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  modalFlatlistContainer: {
    flex: 1,
    justifyContent: "center",
  },
  modalCellOutline: {
    borderWidth: 1,
    borderColor: "black",
    alignItems: "center",
    marginHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 8,
  },
  modalTitle: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  modalTitleText: {
    marginTop: 40,
    fontSize: 30,
    fontWeight: "bold",
    marginHorizontal: 20,
    textAlign: "center",
  },
  ctaButton: {
    backgroundColor: "#FF6060",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    marginHorizontal: 20,
    marginBottom: 5,
    borderRadius: 8,
  },
  ctaButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  closeButton: {
    backgroundColor: "#7c9fb4",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 8,
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});

export default DeviceModal;
