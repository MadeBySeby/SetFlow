const BASE_URL = "https://v2.exercisedb.dev/api/v1";

export const searchExercises = async (query) => {
  if (!query) return [];
  try {
    const response = await fetch(
      `https://v2.exercisedb.dev/api/v1/exercises/search?search=${encodeURIComponent(
        query
      )}`
    );
    const json = await response.json();
    console.log("kaka response status:", json);
    return json.data || [];
  } catch (error) {
    console.error("Error fetching exercises:", error);
    return [];
  }
};
export const searchOldExercises = async (query) => {
  if (!query) return [];
  try {
    const response = await fetch(
      `https://v1.exercisedb.dev/api/v1/exercises/search?search=${encodeURIComponent(
        query
      )}`
    );
    const json = await response.json();
    console.log("kaka response status:", json);
    return json.data || [];
  } catch (error) {
    console.error("Error fetching exercises:", error);
    return [];
  }
};
// `https://exercisedb-api.vercel.app/api/v1/exercises/${exerciseId}`
export async function getExerciseById(exerciseId) {
  try {
    console.log("Fetching exercise with ID:", exerciseId);
    const response = await fetch(
      `https://v2.exercisedb.dev/api/v1/exercises/${exerciseId}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching exercise by ID:", error);
    return null;
  }
}
export async function getExerciseById2(exerciseId) {
  try {
    console.log("Fetching exercise with ID:", exerciseId);
    const response = await fetch(
      `https://exercisedb-api.vercel.app/api/v1/exercises/${exerciseId}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching exercise by ID:", error);
    return null;
  }
}

export const getAllExercises = async () => {
  try {
    const response = await fetch(`${BASE_URL}/exercises`);
    return response.json();
  } catch (error) {
    console.error("Error fetching all exercises:", error);
    return [];
  }
};
