import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FlatList,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Body from "react-native-body-highlighter";
import { searchExercises } from "../api/exercises";
import SafeScreen from "../components/SafeScreen";
import styles from "../components/style";
const Workouts = () => {
  const { t, i18n } = useTranslation();
  const [query, setQuery] = useState("");
  const [highlighted, setHighlighted] = useState([]);
  const [results, setResults] = useState([]);
  useEffect(() => {
    if (query.length < 1) {
      setResults([]);
      return;
    }
    const timeout = setTimeout(async () => {
      try {
        const data = await searchExercises(query);
        setResults(data);
      } catch (e) {
        console.log("error in fetching search results", e);
      }
    }, 400);
    return () => clearTimeout(timeout);
  }, [query]);
  useEffect(() => {
    if (!query) {
      setHighlighted([]);
    }
  }, [query]);
  return (
    <SafeScreen excludeBottomSafeArea={true} style={{ ...styles.Background }}>
      <View
        style={{
          width: "90%",
          marginTop: 50,
          alignSelf: "center",
          position: "relative",
        }}>
        <TextInput
          style={{ ...styles.input, paddingRight: 36 }}
          placeholder={t("searchExercises")}
          placeholderTextColor="#999"
          value={query}
          onChangeText={setQuery}
        />
        {query?.length ? (
          <Pressable
            onPress={() => setQuery("")}
            hitSlop={10}
            style={{
              position: "absolute",
              right: 12,
              top: "50%",
              transform: [{ translateY: -5 }],
              justifyContent: "center",
              alignItems: "center",
            }}>
            <Ionicons name="close-circle" size={20} color="#999" />
          </Pressable>
        ) : null}
      </View>

      <Text style={{ ...styles.defaultText, alignSelf: "center" }}>
        {results?.length ? t("resultsFound", { count: results.length }) : ""}
      </Text>
      {results?.length < 1 && (
        <View
          style={{
            marginTop: 60,
            alignItems: "center",
            display: "flex",
            gap: 1,
            justifyContent: "center",
            flex: 1,
          }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              gap: 5,
            }}>
            <Body
              onBodyPartPress={(e) => {
                setQuery(e.slug);
                setHighlighted([{ slug: e.slug, color: "red", intensity: 1 }]);
              }}
              data={highlighted}
              style={{ width: 200, height: 200 }}
              strokeWidth={2}
              scale={1}
              border="#47b977"
              side="front"
              gender="male"
            />
            <Body
              onBodyPartPress={(e) => {
                setQuery(e.slug);
                setHighlighted([{ slug: e.slug, color: "red", intensity: 1 }]);
              }}
              data={highlighted}
              style={{ width: 200, height: 200 }}
              strokeWidth={2}
              scale={1}
              border="#47b977"
              side="back"
              gender="male"
            />
          </View>

          <Text
            style={{
              ...styles.defaultText,
              fontSize: 18,
              alignSelf: "center",
              color: "white",
              opacity: results?.length ? 0 : 1,
            }}>
            {t("clickBodyParts")}
          </Text>
        </View>
      )}
      <FlatList
        data={results || []}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => {
          let translatedName = item.name;
          // Dynamically translate some common workout names to Georgian
          if (i18n.language === "ka") {
            const dictionary = {
              "push-up": "აზიდვები",
              squat: "ჩაჯდომები",
              lunge: "ნაბიჯები წინ",
              plank: "პლანკა",
              crunch: "პრესის ვარჯიში",
              "pull-up": "აწევა ძელზე",
              row: "ამოწევა",
              curl: "მოხრა",
              press: "აწევა ზემოთ",
              extension: "გაშლა",
              fly: "განზე გაშლა",
              raise: "აწევა",
              dip: "ორძელზე აზიდვა",
              deadlift: "მკვდარი წევა",
              dumbbell: "ჰანტელით",
              barbell: "შტანგით",
              cable: "ბლოკზე",
              machine: "ტრენაჟორზე",
              bodyweight: "საკუთარი წონით",
              seated: "მჯდომარე",
              standing: "მდგომარე",
              lying: "მწოლიარე",
              incline: "დახრილზე",
              decline: "უარყოფით დახრილზე",
              "close-grip": "ვიწრო მოჭიდებით",
              "wide-grip": "ფართო მოჭიდებით",
              "reverse-grip": "უკუმოჭიდებით",
              "one arm": "ცალი ხელით",
              chest: "მკერდის",
              back: "ზურგის",
              shoulder: "მხრის",
              leg: "ფეხის",
              arm: "ხელის",
              triceps: "ტრიცეპსის",
              biceps: "ბიცეპსის",
              calf: "წვივის",
              abdominal: "პრესის",
              kneeling: "მუხლებზე მდგომი",
              "front lever": "წინა ლევერი",
              "muscle-up": "მასლაპი",
            };

            let nameLower = item.name.toLowerCase();
            for (const [eng, ka] of Object.entries(dictionary)) {
              if (nameLower.includes(eng)) {
                nameLower = nameLower.replace(new RegExp(eng, "g"), ka);
              }
            }
            translatedName =
              nameLower.charAt(0).toUpperCase() + nameLower.slice(1);
          }

          return (
            <TouchableOpacity
              onPress={() => {
                router.push({
                  pathname: "/ExerciseDetail",
                  params: {
                    exerciseId: item?.exerciseId,
                  },
                });
              }}>
              <View
                style={[
                  styles.workoutGoalButton,
                  {
                    alignSelf: "center",
                    marginVertical: 10,
                    paddingHorizontal: 15,
                    paddingVertical: 15,
                  },
                ]}>
                <Text
                  style={[styles.defaultText, { fontSize: 16 }]}
                  adjustsFontSizeToFit
                  numberOfLines={2}>
                  {translatedName}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </SafeScreen>
  );
};

export default Workouts;
