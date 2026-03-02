import { supabase } from "../lib/supabase";

export async function fetchPresetPlan(level, equipment, goal) {
  const equipmentKey = (equipment || "").toString().split(" ").join("");

  const { data, error } = await supabase
    .from("preset_plans")
    .select("week, day, exercises")
    .eq("level", level)
    .eq("equipment", equipmentKey)
    .eq("goal", goal)
    .order("week", { ascending: true })
    .order("day", { ascending: true });

  if (error) {
    console.error("Supabase fetchPresetPlan error:", error.message);
    throw error;
  }

  if (!data || data.length === 0) return [];

  const weekMap = {};
  for (const row of data) {
    const wi = row.week - 1;
    if (!weekMap[wi]) weekMap[wi] = {};
    weekMap[wi][row.day] = row.exercises;
  }

  const maxWeek = Math.max(...Object.keys(weekMap).map(Number));
  const plan = [];
  for (let wi = 0; wi <= maxWeek; wi++) {
    plan.push(weekMap[wi] || {});
  }
  return plan;
}
