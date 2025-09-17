import classicModel from "./optimized/classic.glb?url";
import lightsModel from "./optimized/lights.glb?url";
import strongModel from "./optimized/strong.glb?url";
import waveModel from "./optimized/wave.glb?url";
import orgasmicModel from "./optimized/orgasmic.glb?url";


export const products = [
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
    model: orgasmicModel,
  },
  {
    id: "lights",
    name: "Contex Lights",
    description: "Ультратонкие презервативы для максимальной чувствительности.",
    specs: ["Ультратонкие", "Толщина 0.05 мм", "Максимум ощущений"],
    model: lightsModel,
  },
  {
    id: "strong",
    name: "Contex Strong",
    description: "Особо прочные презервативы для максимальной защиты и уверенности.",
    specs: ["Особо прочные", "Толщина 0.08 мм", "Повышенная надежность"],
    model: strongModel,
  },
  {
    id: "wave",
    name: "Contex Wave",
    description: "Презервативы с ребристой и точечной структурой для дополнительной стимуляции.",
    specs: ["Ребристые", "С точками", "Волнующая текстура"],
    model: waveModel,
  },
];

export type Product = typeof products[number];