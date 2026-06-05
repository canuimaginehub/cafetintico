import { describe, it, expect } from "vitest";
import { getLocalRecommendation, QuizAnswers } from "@/lib/recommendation";

describe("getLocalRecommendation", () => {
  it("recommends a fruity/bright, light roast coffee for pour-over lovers", () => {
    const answers: QuizAnswers = {
      brew_method: "Pour-over",
      flavor_profile: "Fruity / Bright",
      intensity: "Light",
      frequency: "Weekly",
    };
    const result = getLocalRecommendation(answers);
    // Huila Geisha: light roast, high acidity, floral notes, V60/Chemex
    expect(result.slug).toBe("huila-geisha");
  });

  it("recommends a chocolatey, strong espresso coffee", () => {
    const answers: QuizAnswers = {
      brew_method: "Espresso",
      flavor_profile: "Chocolatey / Nutty",
      intensity: "Strong",
      frequency: "Daily",
    };
    const result = getLocalRecommendation(answers);
    // Antioquia Caturra: dark roast, low acidity, cacao/hazelnut, espresso/moka
    expect(result.slug).toBe("antioquia-caturra");
  });

  it("recommends a balanced, medium roast for French Press", () => {
    const answers: QuizAnswers = {
      brew_method: "French Press",
      flavor_profile: "Balanced",
      intensity: "Medium",
      frequency: "Daily",
    };
    const result = getLocalRecommendation(answers);
    // Nariño Castillo: medium roast, acidity 3, French Press compatible
    expect(result.slug).toBe("narino-castillo");
  });

  it("always returns a valid product regardless of input", () => {
    const answers: QuizAnswers = {
      brew_method: "Unknown",
      flavor_profile: "Unknown",
      intensity: "Unknown",
      frequency: "Unknown",
    };
    const result = getLocalRecommendation(answers);
    expect(result).toBeDefined();
    expect(result.slug).toBeTruthy();
    expect(result.name).toBeTruthy();
  });
});
