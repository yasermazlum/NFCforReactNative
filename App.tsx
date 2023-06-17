import React from 'react';
import NfcManager, {NfcTech, Ndef} from 'react-native-nfc-manager';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

function App(): JSX.Element {
  async function readNdef() {
    try {
      await NfcManager.requestTechnology(NfcTech.Ndef);
      const status = await NfcManager.ndefHandler.getNdefStatus();
      console.log('status', status);
      const tag = await NfcManager.getTag();
      console.warn('tag', tag);
      /* console.log('tagID:', tag?.id);
      console.log('tagMaxSize:', tag?.maxSize);
      console.log('tagNDEFMessage:', tag?.ndefMessage);
      //console.log('tagNDEFMessage2:', tag?.ndefMessage.payload.map((asciiCode)=>String.fromCharCode()).join(""));
      console.log('tagTechType:', tag?.techTypes);
      console.log('tagType:', tag?.type); */
    } catch (ex) {
      console.warn('Oops!', ex);
    } finally {
      NfcManager.cancelTechnologyRequest();
    }
  }

  async function writeNdef() {
    try {
      const uri = 'https://yasermazlum.com';
      const payload = uri.split('').map(char => char.charCodeAt(0));
      console.log('payload', payload);
      await NfcManager.requestTechnology(NfcTech.Ndef);
      const bytes = Ndef.encodeMessage([
        Ndef.record(1, '85', '12345', payload),
      ]);
      await NfcManager.ndefHandler.writeNdefMessage(bytes);
    } catch (ex) {
      console.error('EX', ex);
    } finally {
      NfcManager.cancelTechnologyRequest();
    }
  }
  return (
    <SafeAreaView>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.sectionContainer}>
        <View style={styles.wrapper}>
          <TouchableOpacity onPress={readNdef}>
            <Text style={styles.highlight}>ReadNdef</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={writeNdef}>
            <Text style={styles.highlight}>Write</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
    padding: 40,
  },
  highlight: {
    fontWeight: '700',
    fontSize: 45,
  },
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
