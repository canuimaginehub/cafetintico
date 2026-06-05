import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Sparkles, RefreshCw, ShoppingBag, Mail, User } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { getLocalRecommendation, QuizAnswers } from "@/lib/recommendation";
import { supabase } from "@/lib/supabase";
import { Product } from "@/data/products";
import { toast } from "sonner";

interface Question {
  id: keyof QuizAnswers;
  question: string;
  description: string;
  options: { value: string; label: string; desc: string }[];
}

const QUESTIONS: Question[] = [
  {
    id: "brew_method",
    question: "¿Cómo preparás tu café?",
    description: "El método determina la molienda y el perfil de extracción ideal.",
    options: [
      { value: "Espresso", label: "Espresso", desc: "Presión y cuerpo intenso. Cafetera espresso o Italiana Moka." },
      { value: "Pour-over", label: "Filtrado", desc: "Claridad y notas delicadas. V60, Chemex o cafetera de goteo." },
      { value: "French Press", label: "Prensa Francesa", desc: "Cuerpo pesado, infusión larga y textura oleosa." },
      { value: "Drip", label: "AeroPress / Otros", desc: "Versatilidad e infusión rápida para tazas limpias." }
    ]
  },
  {
    id: "flavor_profile",
    question: "¿Qué notas de sabor preferís?",
    description: "Cada origen colombiano ofrece un perfil sensorial único.",
    options: [
      { value: "Chocolatey / Nutty", label: "Achocolatado & Dulce", desc: "Notas clásicas a cacao, caramelo y frutos secos tostados." },
      { value: "Fruity / Bright", label: "Frutal & Floral", desc: "Notas ácidas y jugosas a mandarina, durazno y flores blancas." },
      { value: "Balanced", label: "Balanceado", desc: "Taza equilibrada entre dulzor sutil y acidez balanceada." }
    ]
  },
  {
    id: "intensity",
    question: "¿Qué intensidad de tueste te gusta?",
    description: "El nivel de tueste resalta el origen o el cuerpo del grano.",
    options: [
      { value: "Light", label: "Tueste Claro", desc: "Alta acidez y notas florales nativas del grano." },
      { value: "Medium", label: "Tueste Medio", desc: "Balance óptimo entre notas frutales y dulzor caramelizado." },
      { value: "Strong", label: "Tueste Oscuro", desc: "Baja acidez, cuerpo denso y notas a chocolate amargo." }
    ]
  },
  {
    id: "frequency",
    question: "¿Con qué frecuencia tomás café?",
    description: "Nos ayuda a determinar si te conviene un microlote de edición limitada.",
    options: [
      { value: "Daily", label: "Todos los días", desc: "Tomo varias tazas diarias. Una suscripción fresca es ideal." },
      { value: "Weekly", label: "Semanal / Ocasional", desc: "Disfruto de tazas especiales los fines de semana o de vez en cuando." }
    ]
  }
];

const Quiz = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<QuizAnswers>>({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<Product | null>(null);

  const handleSelectOption = (value: string) => {
    const currentQuestion = QUESTIONS[step];
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: value }));
  };

  const handleNext = () => {
    const currentQuestion = QUESTIONS[step];
    if (!answers[currentQuestion.id]) {
      toast.error("Por favor, selecciona una opción para continuar.");
      return;
    }
    setStep(prev => prev + 1);
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      toast.error("Por favor, completa tu nombre y correo electrónico.");
      return;
    }

    setLoading(true);
    const completeAnswers = answers as QuizAnswers;

    // 1. Calculate recommendation locally
    const recommendedProduct = getLocalRecommendation(completeAnswers);
    setRecommendation(recommendedProduct);

    try {
      // 2. Insert Lead into Supabase
      const { data: user, error: userError } = await supabase
        .from("users")
        .select("id")
        .eq("email", email)
        .maybeSingle();

      let userId = user?.id;

      if (!userId) {
        const { data: newUser, error: insertError } = await supabase
          .from("users")
          .insert([{ email, name, source: "quiz" }])
          .select("id")
          .single();
        
        if (!insertError && newUser) {
          userId = newUser.id;
        }
      }

      if (userId) {
        // 3. Insert Quiz responses
        await supabase.from("quiz_responses").insert([{
          user_id: userId,
          brew_method: completeAnswers.brew_method,
          flavor_profile: completeAnswers.flavor_profile,
          intensity: completeAnswers.intensity,
          frequency: completeAnswers.frequency
        }]);

        // 4. Insert Recommendation record
        await supabase.from("recommendations").insert([{
          user_id: userId,
          recommended_product: recommendedProduct.name,
          tier: recommendedProduct.badge === "Edición limitada" ? "rare" : (recommendedProduct.badge === "Best Seller" ? "premium" : "standard")
        }]);
      }

      // 5. Send Webhook payload to n8n if configured
      const n8nWebhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL;
      if (n8nWebhookUrl) {
        await fetch(n8nWebhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name,
            email,
            ...completeAnswers,
            recommended_product: recommendedProduct.name,
            timestamp: new Date().toISOString()
          })
        });
      }
    } catch (err) {
      console.error("Fallo la sincronización con los servicios en la nube:", err);
      // We don't block the user, the local recommendation is already successfully set!
    } finally {
      setLoading(false);
      setStep(QUESTIONS.length + 1); // Move to the results view
    }
  };

  const handleRestart = () => {
    setStep(0);
    setAnswers({});
    setName("");
    setEmail("");
    setRecommendation(null);
  };

  const totalSteps = QUESTIONS.length + 1; // Includes Lead capture form step
  const progressPercent = Math.min((step / totalSteps) * 100, 100);

  return (
    <SiteLayout transparentHeader={false}>
      <div className="min-h-[75vh] flex items-center justify-center py-20 bg-background relative overflow-hidden grain-overlay">
        {/* Decorative backdrop shapes */}
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

        <div className="container max-w-2xl px-6 relative z-10">
          {step <= QUESTIONS.length && (
            <div className="mb-12">
              <div className="flex justify-between items-center text-xs uppercase tracking-widest text-muted-foreground mb-4">
                <span>Coffee Finder Quiz</span>
                <span>Paso {step + 1} de {totalSteps}</span>
              </div>
              <div className="w-full bg-border/40 h-[2px] rounded-full overflow-hidden">
                <motion.div
                  className="bg-accent h-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                />
              </div>
            </div>
          )}

          <AnimatePresence mode="wait">
            {step < QUESTIONS.length ? (
              // Quiz Question Step
              <motion.div
                key={`question-${step}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-8"
              >
                <div className="space-y-3">
                  <span className="eyebrow text-accent">Paso {step + 1}</span>
                  <h1 className="font-serif text-3xl md:text-4xl font-light leading-tight">
                    {QUESTIONS[step].question}
                  </h1>
                  <p className="text-muted-foreground text-sm">
                    {QUESTIONS[step].description}
                  </p>
                </div>

                <div className="grid gap-4">
                  {QUESTIONS[step].options.map(option => {
                    const isSelected = answers[QUESTIONS[step].id] === option.value;
                    return (
                      <button
                        key={option.value}
                        onClick={() => handleSelectOption(option.value)}
                        className={`text-left p-6 border transition-all duration-300 relative group flex items-start justify-between ${
                          isSelected
                            ? "border-accent bg-accent/5 shadow-card"
                            : "border-border/60 bg-card hover:border-accent/50 hover:bg-accent/[0.01]"
                        }`}
                      >
                        <div className="space-y-1 pr-6">
                          <p className="font-medium text-sm md:text-base">{option.label}</p>
                          <p className="text-xs text-muted-foreground leading-relaxed">{option.desc}</p>
                        </div>
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 transition-all ${
                            isSelected
                              ? "border-accent bg-accent text-background"
                              : "border-border/80 group-hover:border-accent"
                          }`}
                        >
                          {isSelected && <Check className="h-3.5 w-3.5" />}
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="flex justify-between items-center pt-6">
                  <button
                    onClick={handleBack}
                    disabled={step === 0}
                    className={`flex items-center gap-2 text-xs uppercase tracking-widest transition-all ${
                      step === 0 ? "opacity-0 pointer-events-none" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <ArrowLeft className="h-4 w-4" /> Anterior
                  </button>
                  <button
                    onClick={handleNext}
                    className="btn-luxury bg-foreground text-background hover:bg-accent group"
                  >
                    Siguiente <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </motion.div>
            ) : step === QUESTIONS.length ? (
              // Lead Capture Step
              <motion.div
                key="lead-form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-8"
              >
                <div className="space-y-3">
                  <span className="eyebrow text-accent">Paso Final</span>
                  <h1 className="font-serif text-3xl md:text-4xl font-light leading-tight">
                    ¿Dónde te enviamos tu recomendación?
                  </h1>
                  <p className="text-muted-foreground text-sm">
                    Dejanos tus datos para procesar el análisis de tu paladar y enviarte un beneficio exclusivo.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-xs uppercase tracking-wider font-medium text-muted-foreground">
                        Tu Nombre
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60" />
                        <input
                          id="name"
                          type="text"
                          required
                          value={name}
                          onChange={e => setName(e.target.value)}
                          placeholder="Juan Pérez"
                          className="w-full bg-card border border-border/80 px-11 py-4 text-sm focus:outline-none focus:border-accent transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="text-xs uppercase tracking-wider font-medium text-muted-foreground">
                        Correo Electrónico
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60" />
                        <input
                          id="email"
                          type="email"
                          required
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          placeholder="juan@ejemplo.com"
                          className="w-full bg-card border border-border/80 px-11 py-4 text-sm focus:outline-none focus:border-accent transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-6">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground"
                    >
                      <ArrowLeft className="h-4 w-4" /> Anterior
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-luxury bg-foreground text-background hover:bg-accent group flex items-center justify-center min-w-[200px]"
                    >
                      {loading ? (
                        <>
                          <RefreshCw className="h-4 w-4 animate-spin mr-2" /> Analizando...
                        </>
                      ) : (
                        <>
                          Ver Mi Café <Sparkles className="h-3.5 w-3.5 ml-1 text-gold" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </motion.div>
            ) : (
              // Recommendation Results Step
              <motion.div
                key="recommendation"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="space-y-10"
              >
                {recommendation && (
                  <div className="space-y-8">
                    <div className="text-center space-y-4">
                      <div className="inline-flex items-center justify-center p-3 rounded-full bg-accent/10 text-accent mb-2">
                        <Sparkles className="h-6 w-6 text-accent" />
                      </div>
                      <span className="eyebrow text-accent block">Tu Perfil Ideal</span>
                      <h1 className="font-serif text-4xl md:text-5xl font-light">
                        {recommendation.name}
                      </h1>
                      <p className="text-muted-foreground font-serif text-lg italic">
                        {recommendation.variety} — {recommendation.region}
                      </p>
                    </div>

                    <div className="grid md:grid-cols-12 gap-8 items-center bg-card border border-border/40 p-8 shadow-luxury relative overflow-hidden">
                      <div className="md:col-span-5 flex justify-center">
                        <img
                          src={recommendation.image}
                          alt={recommendation.name}
                          className="max-h-60 object-contain drop-shadow-luxury transform hover:scale-105 transition-transform duration-700"
                        />
                      </div>

                      <div className="md:col-span-7 space-y-6">
                        {recommendation.badge && (
                          <span className="px-3 py-1 bg-gold/10 text-gold text-[10px] uppercase tracking-wider font-semibold border border-gold/20">
                            {recommendation.badge}
                          </span>
                        )}

                        <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
                          {recommendation.description}
                        </p>

                        <div className="border-t border-border/40 pt-4 space-y-3">
                          <div className="flex justify-between items-center text-xs">
                            <span className="uppercase tracking-widest text-muted-foreground">Notas de Cata:</span>
                            <span className="font-semibold text-foreground">{recommendation.notes.flavor.join(", ")}</span>
                          </div>

                          <div className="flex justify-between items-center text-xs">
                            <span className="uppercase tracking-widest text-muted-foreground">Tueste:</span>
                            <span className="font-semibold text-foreground">{recommendation.roast}</span>
                          </div>

                          <div className="flex justify-between items-center text-xs">
                            <span className="uppercase tracking-widest text-muted-foreground">Altura:</span>
                            <span className="font-semibold text-foreground">{recommendation.altitude}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {answers.frequency === "Daily" && (
                      <div className="p-6 bg-gold/5 border border-gold/20 text-center space-y-2">
                        <p className="font-serif text-base text-gold-warm">
                          ¡Recomendamos nuestra Suscripción Mensual!
                        </p>
                        <p className="text-xs text-muted-foreground max-w-md mx-auto leading-relaxed">
                          Como disfrutas del café a diario, te sugerimos suscribirte para recibir tu {recommendation.name} fresco todas las semanas con envío gratis.
                        </p>
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                      <Link
                        to={`/producto/${recommendation.slug}`}
                        className="w-full sm:w-auto btn-luxury bg-foreground text-background hover:bg-accent group flex items-center justify-center"
                      >
                        Comprar Café <ShoppingBag className="h-4 w-4 ml-1" />
                      </Link>
                      
                      <button
                        onClick={handleRestart}
                        className="w-full sm:w-auto px-8 py-4 border border-border/80 text-[12px] uppercase tracking-[0.22em] text-muted-foreground hover:text-foreground hover:border-foreground transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        <RefreshCw className="h-3.5 w-3.5" /> Repetir Quiz
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </SiteLayout>
  );
};

export default Quiz;
