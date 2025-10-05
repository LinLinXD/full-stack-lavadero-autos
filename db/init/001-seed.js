
const dbName = process.env.MONGO_INITDB_DATABASE || "lavadero-db"
const db = db.getSiblingDB(dbName);

// Crea colección 'servicios' con algunos documentos
db.servicios.insertMany([
  // ---- Lavados ----
  { nombre: "lavado-basico", descripcion: "Lavado exterior con agua y jabón, sin encerado.", costo: 15000, duracion: 20, excluye: ["lavado-premium", "lavado-completo"] },
  { nombre: "lavado-premium", descripcion: "Lavado exterior + secado detallado + brillo en llantas.", costo: 30000, duracion: 45, excluye: ["lavado-basico", "lavado-completo"] },
  { nombre: "lavado-completo", descripcion: "Lavado exterior e interior, incluye aspirado y limpieza básica de tapicería.", costo: 40000, duracion: 60, excluye: ["lavado-basico", "lavado-premium", "aspirado-interior"] },

  // ---- Interior ----
  { nombre: "aspirado-interior", descripcion: "Aspirado de alfombras y asientos, limpieza ligera.", costo: 10000, duracion: 15, excluye: ["lavado-completo", "limpieza-interior-premium"] },
  { nombre: "limpieza-tapiceria", descripcion: "Limpieza profunda de tapicería y alfombras.", costo: 25000, duracion: 45, excluye: ["limpieza-interior-premium"] },
  { nombre: "limpieza-interior-premium", descripcion: "Limpieza completa de interior con tapicería, plásticos y aspirado profundo.", costo: 35000, duracion: 60, excluye: ["aspirado-interior", "limpieza-tapiceria"] },

  // ---- Tratamientos especiales ----
  { nombre: "encerado", descripcion: "Aplicación de cera protectora para pintura.", costo: 20000, duracion: 30, excluye: ["pulida"] },
  { nombre: "pulida", descripcion: "Pulido completo de la pintura, incluye encerado final.", costo: 80000, duracion: 120, excluye: ["encerado"] },
  { nombre: "lavado-motor", descripcion: "Limpieza de compartimento del motor con productos especiales.", costo: 30000, duracion: 40 },

  // ---- Extras ----
  { nombre: "brillo-llantas", descripcion: "Aplicación de silicona para brillo y protección de llantas.", costo: 5000, duracion: 10 },
  { nombre: "aromatizante", descripcion: "Perfume interior a elección del cliente.", costo: 3000, duracion: 5 },
  { nombre: "lavado-debajo", descripcion: "Limpieza profunda del chasis y partes bajas del vehículo.", costo: 25000, duracion: 35 },
  { nombre: "secado-detallado", descripcion: "Secado con microfibra y aire comprimido para eliminar gotas.", costo: 8000, duracion: 10 }
]);


