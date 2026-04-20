export const validateQuestion = (data: any) => {
  if (!data) throw new Error("No data");

  if (!data.question || typeof data.question !== "string") {
    throw new Error("Invalid question");
  }

  const keys = Object.keys(data.options || {});
  const expected = ["A", "B", "C", "D", "E"];

  if (JSON.stringify(keys) !== JSON.stringify(expected)) {
    throw new Error("Options must be A,B,C,D,E");
  }

  if (!expected.includes(data.answer)) {
    throw new Error("Invalid answer");
  }

  if (!data.explanation || typeof data.explanation !== "string") {
    throw new Error("Missing explanation");
  }

  return true;
};