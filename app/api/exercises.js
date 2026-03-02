import { supabase } from "../lib/supabase";

/**
 * Perform a flexible search across the Supabase `exercises` table.
 * It searches the `name`, `body_parts`, and `target_muscles` columns.
 */
const georgianToEnglish = {
  მკერდი: "chest",
  ზურგი: "back",
  მხრები: "shoulders",
  მკლავები: "arms",
  ფეხები: "legs",
  "პრესი/კორსეტი": "core",
  კარდიო: "cardio",
  კისერი: "neck",
  წელი: "waist",
  "ქვედა კიდურები": "lower legs",
  "ზედა კიდურები": "upper legs",
  "ზედა მკლავები": "upper arms",
  "ქვედა მკლავები": "lower arms",
};

const transliterateToEnglish = (query) => {
  if (!query) return query;
  const q = query.toLowerCase().trim();
  // reverse mapping or check if string matches
  for (const [ka, en] of Object.entries(georgianToEnglish)) {
    if (q.includes(ka)) {
      return en;
    }
  }
  return q;
};

export const searchExercises = async (query) => {
  query = transliterateToEnglish(query);
  if (!query) return [];
  console.log("searchExercises (Supabase) called with:", query);

  try {
    // 1. First, try an exact match or ILIKE on the name
    // 2. Also try seeing if the query matches a body part or target muscle (as arrays)
    // Supabase allows textSearch and generic OR filters.
    // For simplicity, we can do an `ilike` on name, or see if it's in the arrays.

    // We can use a PostgREST OR filter:
    // name ilike %query% OR query = ANY(body_parts) OR query = ANY(target_muscles)
    // However, Supabase JS simplifies this.
    // Let's use `textSearch` for name if possible, or just a generic `or`.

    const { data, error } = await supabase
      .from("exercises")
      .select("*")
      .or(
        `name.ilike.%${query}%,body_parts.cs.{${query}},target_muscles.cs.{${query}}`,
      )
      .limit(50);

    if (error) {
      console.error("Supabase search error:", error);
      return [];
    }

    // Convert keys from snake_case back to camelCase for the app
    return data.map(mapExerciseObj) || [];
  } catch (error) {
    console.error("Error fetching exercises from Supabase:", error);
    return [];
  }
};

export const searchOldExercises = searchExercises; // Deprecated, pointing to same

/**
 * Fetch a single exercise by ID
 */
export async function getExerciseById(exerciseId) {
  try {
    console.log("Fetching exercise (Supabase) with ID:", exerciseId);

    const { data, error } = await supabase
      .from("exercises")
      .select("*")
      .eq("id", exerciseId)
      .single();

    if (error) {
      console.error("Supabase get by ID error:", error);
      return null;
    }

    return mapExerciseObj(data);
  } catch (error) {
    console.error("Error fetching exercise by ID:", error);
    return null;
  }
}

// Map the old function name as well
export const getExerciseById2 = getExerciseById;

/**
 * Fetch a list of exercises (was previously getting all, but limit to 100 max for performance)
 */
export const getAllExercises = async () => {
  try {
    const { data, error } = await supabase
      .from("exercises")
      .select("*")
      .limit(100);

    if (error) {
      console.error("Supabase getAll error:", error);
      return { data: [] };
    }

    return { data: data.map(mapExerciseObj) };
  } catch (error) {
    console.error("Error fetching all exercises:", error);
    return { data: [] };
  }
};

// --- Helper Functions ---

/**
 * Supabase uses snake_case columns. The React Native app expects camelCase.
 * This maps a single row to the old expected format.
 */
function mapExerciseObj(row) {
  if (!row) return row;
  return {
    id: row.id,
    exerciseId: row.id,
    name: row.name,
    gifUrl: row.gif_url,
    bodyParts: row.body_parts || [],
    targetMuscles: row.target_muscles || [],
    secondaryMuscles: row.secondary_muscles || [],
    equipments: row.equipments || [],
    instructions: row.instructions || [],
  };
}
