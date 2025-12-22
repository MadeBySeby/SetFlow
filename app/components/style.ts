import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  Background: {
    flex: 1,
    backgroundColor: "#0B1026",

    height: "100%",
    width: "100%",
  },
  workoutGoalButton: {
    width: "80%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    fontSize: 20,
    color: "white",
    borderColor: "#47b977",
    borderRadius: 10,
    borderWidth: 1,
    padding: 20,
  },
  defaultText: {
    color: "white",
    fontSize: 18,
    fontFamily: "Nunito-Regular",

    textAlign: "center",
  },
  input: {
    height: 40,
    width: "100%",
    // minWidth: "100%",
    maxWidth: 400,
    borderColor: "#4a5568",
    borderWidth: 1,
    color: "white",
    marginTop: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: "#4a5568",
    fontSize: 16,
    outline: "none",
    padding: 10,
    fontFamily: "system-ui, -apple-system, sans-serif",
  },
  TitleText: {
    color: "white",
    fontSize: 25,
    textAlign: "center",
    fontFamily: "Nunito-Bold",
  },
});

export default styles;
