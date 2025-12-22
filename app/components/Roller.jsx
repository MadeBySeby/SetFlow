// import React, { useState } from "react";
// import { View, Text, StyleSheet } from "react-native";
// import Slider from "@react-native-community/slider";

// export default function RadioSlider() {
//   const [value, setValue] = useState(2);

//   return (
//     <View style={{ padding: 40 }}>
//       <Text style={{ fontSize: 24, marginBottom: 20 }}>Selected: {value}</Text>

//       <Slider
//         minimumValue={1}
//         maximumValue={200}
//         step={1} // acts like discrete radio buttons
//         value={value}
//         onValueChange={setValue}
//         minimumTrackTintColor="#4CAF50"
//         maximumTrackTintColor="#ccc"
//         thumbTintColor="#4CAF50"
//       />

//       <View style={styles.trackPoints}>
//         {[1, 2, 3, 4, 5].map((n) => (
//         //   <View
//             key={n}
//             style={[
//               styles.point,
//               { backgroundColor: n === value ? "#4CAF50" : "#ccc" },
//             ]}
//           />
//         ))}
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   trackPoints: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 10,
//     paddingHorizontal: 10,
//   },
//   point: {
//     width: 15,
//     height: 15,
//     borderRadius: 7.5,
//   },
// });
