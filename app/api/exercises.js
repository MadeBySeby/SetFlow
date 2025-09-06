const BASE_URL = "https://exercisedb-api.vercel.app/api/v1";

export const searchExercises = async (query) => {
  try {
    const response = await fetch(
      `${BASE_URL}/exercises/search?q=${encodeURIComponent(query)}`
    );
    return response.json();
  } catch (error) {
    console.error("Error fetching exercises:", error);
    return [];
  }
};
export const getExerciseById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/exercises/${id}`);
    return response.json();
  } catch (error) {
    console.error("Error fetching exercise by ID:", error);
    return null;
  }
};
