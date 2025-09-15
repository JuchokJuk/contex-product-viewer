import type { ProductsData } from "./types";

import studioHdr from "./assets/studio_small_03_1k.hdr?url";
import classicModel from "./assets/classic.glb?url";

export const PRODUCTS_DATA: ProductsData = {
  common: {
    environment: studioHdr,
  },
  entries: [
  {
    id: "classic",
    name: "Contex Classic",
    description: "Классические презервативы с гелем-смазкой для комфорта и надежности.",
    specs: ["Классическая форма", "Силиконовая смазка", "Проверено временем"],
    model: classicModel,
  },
  {
    id: "orgasmic",
    name: "Contex Orgasmic",
    description: "Резиновые изделия с матовым рельефом для разнообразия ощущений.",
    specs: ["Рельефные", "Стимулирующие", "Для него и неё"],
    model: classicModel,
  },
  {
    id: "lights",
    name: "Contex Lights",
    description: "Ультратонкие презервативы для максимальной чувствительности.",
    specs: ["Ультратонкие", "Толщина 0.05 мм", "Максимум ощущений"],
    model: classicModel,
  },
  {
    id: "strong",
    name: "Contex Strong",
    description: "Особо прочные презервативы для максимальной защиты и уверенности.",
    specs: ["Особо прочные", "Толщина 0.08 мм", "Повышенная надежность"],
    model: classicModel,
  },
  {
    id: "wave",
    name: "Contex Wave",
    description: "Презервативы с ребристой и точечной структурой для дополнительной стимуляции.",
    specs: ["Ребристые", "С точками", "Волнующая текстура"],
    model: classicModel,
  },
  ],
};
