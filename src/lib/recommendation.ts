import { Product, products } from "@/data/products";

export interface QuizAnswers {
  brew_method: string;
  flavor_profile: string;
  intensity: string;
  frequency: string;
}

export const getLocalRecommendation = (answers: QuizAnswers): Product => {
  const { brew_method, flavor_profile, intensity } = answers;

  // Let's filter products that support the chosen method
  let candidates = products;

  // 1. Filter by brew method compatibility
  const filteredByMethod = products.filter(p => {
    if (brew_method === "Espresso") return p.methods.includes("Espresso") || p.methods.includes("Moka");
    if (brew_method === "French Press") return p.methods.includes("French Press");
    if (brew_method === "Pour-over" || brew_method === "Drip") {
      return p.methods.includes("V60") || p.methods.includes("Chemex") || p.methods.includes("Aeropress");
    }
    return true;
  });

  if (filteredByMethod.length > 0) {
    candidates = filteredByMethod;
  }

  // 2. Score candidates based on flavor profile and intensity preferences
  let bestProduct = candidates[0];
  let highestScore = -1;

  for (const product of candidates) {
    let score = 0;

    // Flavor profile matches
    if (flavor_profile === "Fruity / Bright") {
      if (product.notes.acidity >= 4) score += 3;
      if (product.notes.flavor.some(f => ["Mandarina", "Durazno blanco", "Bergamota", "Jazmín"].includes(f))) {
        score += 2;
      }
    } else if (flavor_profile === "Chocolatey / Nutty") {
      if (product.notes.acidity <= 3) score += 3;
      if (product.notes.flavor.some(f => ["Cacao", "Avellana", "Caramelo", "Chocolate negro"].includes(f))) {
        score += 2;
      }
    } else if (flavor_profile === "Balanced") {
      if (product.notes.acidity >= 3 && product.notes.acidity <= 4) score += 3;
    }

    // Intensity matches
    if (intensity === "Light" && product.roast === "Claro") score += 2;
    if (intensity === "Medium" && product.roast === "Medio") score += 2;
    if (intensity === "Strong" && product.roast === "Oscuro") score += 2;

    if (score > highestScore) {
      highestScore = score;
      bestProduct = product;
    }
  }

  return bestProduct;
};
