"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

interface GalleryImage {
  src: string;
  alt: string;
  title: string;
  description: string;
}

const galleryImages: GalleryImage[] = [
  {
    src: "/gallery/dashboard.png",
    alt: "Dashboard de Gestão Corporativa",
    title: "Dashboards Estratégicos",
    description: "Plataformas com indicadores em tempo real para tomada de decisão",
  },
  {
    src: "/gallery/network.png",
    alt: "Integração de Sistemas",
    title: "Integração de Dados",
    description: "Conexão inteligente entre sistemas, ERPs e bases de dados",
  },
  {
    src: "/gallery/infrastructure.png",
    alt: "Infraestrutura Corporativa",
    title: "Infraestrutura Própria",
    description: "Servidores e operação garantindo estabilidade e segurança 24/7",
  },
  {
    src: "/gallery/team.png",
    alt: "Equipe Especializada",
    title: "Equipe Especializada",
    description: "Profissionais com conhecimento técnico e operacional do negócio",
  },
  {
    src: "/gallery/saas-platform.png",
    alt: "Plataforma SaaS",
    title: "Plataformas SaaS",
    description: "Soluções escaláveis em modelo SaaS com evolução contínua",
  },
  {
    src: "/gallery/security.png",
    alt: "Segurança Digital",
    title: "Segurança e Confiabilidade",
    description: "Proteção de dados com backups, controle de acesso e criptografia",
  },
];

export default function ImageGallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setSelectedIndex(index);
  const closeLightbox = () => setSelectedIndex(null);

  const goToPrev = () => {
    if (selectedIndex === null) return;
    setSelectedIndex(
      selectedIndex === 0 ? galleryImages.length - 1 : selectedIndex - 1
    );
  };

  const goToNext = () => {
    if (selectedIndex === null) return;
    setSelectedIndex(
      selectedIndex === galleryImages.length - 1 ? 0 : selectedIndex + 1
    );
  };

  return (
    <>
      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {galleryImages.map((image, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: 0.6,
              delay: i * 0.1,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="group relative overflow-hidden rounded-xl cursor-pointer"
            onClick={() => openLightbox(i)}
          >
            {/* Image */}
            <div className="aspect-[16/10] overflow-hidden">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
            </div>

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/90 via-[#0a1628]/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-5">
              {/* Expand icon */}
              <div className="absolute top-4 right-4 w-9 h-9 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                <Maximize2 className="h-4 w-4 text-white" />
              </div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <h4
                  className="text-white font-bold text-base mb-1"
                  style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
                >
                  {image.title}
                </h4>
                <p className="text-white/70 text-sm leading-relaxed">
                  {image.description}
                </p>
              </motion.div>
            </div>

            {/* Bottom accent line */}
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cjp-accent to-cjp-accent-light scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-[#0a1628]/95 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors duration-200"
              aria-label="Fechar"
            >
              <X className="h-6 w-6 text-white" />
            </button>

            {/* Navigation */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToPrev();
              }}
              className="absolute left-4 md:left-8 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors duration-200"
              aria-label="Anterior"
            >
              <ChevronLeft className="h-6 w-6 text-white" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              className="absolute right-4 md:right-8 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors duration-200"
              aria-label="Próximo"
            >
              <ChevronRight className="h-6 w-6 text-white" />
            </button>

            {/* Image */}
            <motion.div
              key={selectedIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="max-w-5xl w-full max-h-[80vh] relative"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={galleryImages[selectedIndex].src}
                alt={galleryImages[selectedIndex].alt}
                className="w-full h-full object-contain rounded-lg"
              />

              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0a1628] to-transparent p-6 pt-16 rounded-b-lg">
                <h3
                  className="text-white font-bold text-xl mb-1"
                  style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
                >
                  {galleryImages[selectedIndex].title}
                </h3>
                <p className="text-white/60 text-sm">
                  {galleryImages[selectedIndex].description}
                </p>
              </div>
            </motion.div>

            {/* Counter */}
            <div className="absolute bottom-6 right-6 text-white/50 text-sm font-medium">
              {selectedIndex + 1} / {galleryImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
