const BASE_URL = "https://v2.exercisedb.dev/api/v1";

export const searchExercises = async (query) => {
  if (!query) return [];
  console.log("searchExercises called with query1:", query);
  try {
    const response = await fetch(
      `https://exercisedb-api.vercel.app/api/v1/exercises/search?q=${encodeURIComponent(
        query,
      )}`,
    );
    if (!response.ok) {
      const text = await response.text();
      console.error("Server Error:", response.status, text);
      return;
    }
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
        query,
      )}`,
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
      `https://v2.exercisedb.dev/api/v1/exercises/${exerciseId}`,
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
// es mushaobs
export async function getExerciseById2(exerciseId) {
  try {
    console.log("Fetching exercise with ID:", exerciseId);
    const response = await fetch(
      `https://exercisedb-api.vercel.app/api/v1/exercises/${exerciseId}`,
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
    const response = await fetch(
      `https://exercisedb-api.vercel.app/api/v1/exercises`,
    );
    const text = await response.text();
    let json;
    try {
      json = JSON.parse(text);
    } catch (parseError) {
      console.error("Non-JSON response from exercises API:", text);
      return { data: [] };
    }

    if (!response.ok) {
      console.error("Server Error:", response.status, json);
      return { data: [] };
    }

    return json;
  } catch (error) {
    console.error("Error fetching all exercises:", error);
    return { data: [] };
  }
};
