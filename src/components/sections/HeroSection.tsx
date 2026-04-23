import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import heroImg from "@/assets/hero-coffee.jpg";

export const HeroSection = () => (
  <section className="relative h-screen min-h-[680px] w-full overflow-hidden bg-espresso text-cream">
    <motion.div
      initial={{ scale: 1.08, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
      className="absolute inset-0"
    >
      <img
        src={heroImg}
        alt="Espresso recién extraído con crema dorada"
        width={1920}
        height={1280}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-espresso via-espresso/60 to-espresso/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-espresso via-transparent to-espresso/40" />
    </motion.div>

    <div className="absolute inset-0 grain-overlay" />

    <div className="container-editorial relative z-10 h-full flex flex-col justify-end pb-20 md:pb-32">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="eyebrow text-cream-muted mb-6"
      >
        Microlotes · Tueste fresco · Buenos Aires
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="display-xl text-cream max-w-5xl text-balance"
      >
        Café de especialidad
        <br />
        <span className="italic font-extralight text-cream/90">de Colombia.</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 1.2 }}
        className="mt-8 max-w-xl text-lg md:text-xl font-light text-cream/80 leading-relaxed"
      >
        Microlotes seleccionados en origen. Tostados frescos cada semana. Enviados a tu casa.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 1.4 }}
        className="mt-12 flex flex-col sm:flex-row gap-4"
      >
        <Link
          to="/tienda"
          className="btn-luxury bg-cream text-espresso hover:bg-terracotta hover:text-cream group"
        >
          Comprar café
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1" />
        </Link>
        <Link
          to="/quiz"
          className="btn-luxury border border-cream/40 text-cream hover:bg-cream/10 hover:border-cream"
        >
          Descubrí tu perfil
        </Link>
      </motion.div>
    </div>

    {/* Scroll indicator */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
    >
      <span className="text-[10px] uppercase tracking-[0.28em] text-cream-muted">Descubrir</span>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="w-px h-10 bg-cream/40"
      />
    </motion.div>
  </section>
);
