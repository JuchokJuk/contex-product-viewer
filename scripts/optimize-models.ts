import fs from "fs";
import path from "path";
import { NodeIO } from "@gltf-transform/core";
import { ALL_EXTENSIONS } from "@gltf-transform/extensions";
import { dedup, prune, draco, resample, textureCompress } from "@gltf-transform/functions";
import sharp from "sharp";
import draco3d from 'draco3dgltf'

const ASSETS_DIR = path.resolve("src/assets");
const OUT_DIR = path.resolve("src/assets/optimized");

// Ensure output folder exists
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

const io = new NodeIO().registerExtensions(ALL_EXTENSIONS).registerDependencies({
    'draco3d.decoder': await draco3d.createDecoderModule(),
    'draco3d.encoder': await draco3d.createEncoderModule(),
});

async function optimizeModel(filePath) {
  console.log(`🔄 Optimizing ${path.basename(filePath)}...`);

  // Load model
  const doc = await io.read(filePath);

  const scene = doc.getRoot();
  // 🔹 Force backface culling
  scene.listMaterials().forEach((mat) => {
    mat.setDoubleSided(false); // disables rendering backfaces
  });

  // 🔹 Apply optimizations
  await doc.transform(
    dedup(), // remove duplicate data
    prune(), // remove unused nodes/materials
    resample(), // resample animations
    draco(), // apply Draco compression
    textureCompress({
      targetFormat: "webp",
      resize: [1024, 1024], // optional resize, remove if you want original size
      encoder: sharp,
    })
  );

  // Save optimized model
  const outPath = path.join(OUT_DIR, path.basename(filePath));
  io.write(outPath, doc);

  console.log(`✅ Saved optimized model: ${outPath}`);
}

async function main() {
  const files = fs.readdirSync(ASSETS_DIR).filter((f) => f.endsWith(".glb"));

  if (files.length === 0) {
    console.log("No .glb files found in src/assets/");
    return;
  }

  for (const file of files) {
    await optimizeModel(path.join(ASSETS_DIR, file));
  }

  console.log("🎉 All models optimized!");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
