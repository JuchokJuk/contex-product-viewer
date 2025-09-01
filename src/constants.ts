import type { ProductsData } from "./types";

import map from "./assets/map.jpg?url";
import normal from "./assets/normal.jpg?url";
import studioHdr from "./assets/studio_small_03_1k.hdr?url";

export const PRODUCTS: ProductsData = {
  common: {
    clearcoatNormal: normal,
    environment: studioHdr,
  },
  entries: [
  {
    id: "you-and-me-orgasmic",
    name: "Contex You&Me Orgasmic",
    description: "Резиновые изделия с матовым рельефом для разнообразия ощущений.",
    specs: ["Рельефные", "Стимулирующие", "Для него и неё"],
    textures: {
      normal,
      map,
    },
    color: "#E91E63", // Vibrant Pink
  },
  {
    id: "strong",
    name: "Contex Strong",
    description: "Особо прочные презервативы для максимальной защиты и уверенности.",
    specs: ["Особо прочные", "Толщина 0.08 мм", "Повышенная надежность"],
    textures: {
      normal,
      map,
    },
    color: "#212121", // Dark Grey
  },
  {
    id: "lights",
    name: "Contex Lights",
    description: "Ультратонкие презервативы для максимальной чувствительности.",
    specs: ["Ультратонкие", "Толщина 0.05 мм", "Максимум ощущений"],
    textures: {
      normal,
      map,
    },
    color: "#03A9F4", // Light Blue
  },
  {
    id: "wave",
    name: "Contex Wave",
    description: "Презервативы с ребристой и точечной структурой для дополнительной стимуляции.",
    specs: ["Ребристые", "С точками", "Волнующая текстура"],
    textures: {
      normal,
      map,
    },
    color: "#009688", // Teal
  },
  {
    id: "classic",
    name: "Contex Classic",
    description: "Классические презервативы с гелем-смазкой для комфорта и надежности.",
    specs: ["Классическая форма", "Силиконовая смазка", "Проверено временем"],
    textures: {
      normal,
      map,
    },
    color: "#3F51B5", // Indigo
  },
  ],
};
