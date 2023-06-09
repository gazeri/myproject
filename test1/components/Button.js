import { StyleSheet, View, Pressable, Text } from 'react-native';
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function Button({ label, theme,onPress }) {
    if (theme === "primary") {
      return (
        <View
        style={[styles.buttonContainer, { borderWidth: 4, borderColor: "#ffd33d", borderRadius: 18 }]}
        >
          <Pressable
            style={[styles.button, { backgroundColor: "#0ff" }]}
            onPress={onPress}
          >
            <FontAwesome
              name="picture-o"
              size={18}
              color="#25292e"
              style={styles.buttonIcon}
            />
            <Text style={[styles.buttonLabel, { color: "#25292e" }]}>{label}</Text>
          </Pressable>
      </View>
      );
    }
    if (theme === "mystyle") {
      return (
        <View style={styles.buttonContainer2}>
          <Pressable
            style={[styles.button, { backgroundColor: "#00f"}]}
            onPress={onPress}
            >
            <Text style={[styles.buttonLabel2]}>{label}</Text>
          </Pressable>
      </View>
      );
    }
  
    return (
      <View style={styles.buttonContainer}>
          <Pressable style={styles.button} onPress={() => alert('You pressed a button.')}>
            <Text style={styles.buttonLabel}>{label}</Text>
          </Pressable>
        </View>
    );
  }

const styles = StyleSheet.create({
  buttonContainer: {
    width: 320,
    height: 68,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
  },
    buttonContainer2: {
      width: 100,
      height: 40,
      marginHorizontal: 10,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 1,
  
  },
  button: {
    borderRadius: 10,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonIcon: {
    paddingRight: 8,
  },
  buttonLabel: {
    color: '#f0f',
    fontSize: 18,
    backgroundColor: "#0ff",
  },
  buttonLabel2: {
    color: '#fff',
    fontSize: 14,
    backgroundColor: "#00f",
  },
});





