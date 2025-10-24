
const dbName = process.env.MONGO_INITDB_DATABASE || "lavadero-db"
const db = db.getSiblingDB(dbName);

// Crea colección 'servicios' con algunos documentos
db.servicios.insertMany([
  // ---- Lavados ----
  { nombre: "Lavado Basico", categoria: "lavado", descripcion: "Lavado exterior con agua y jabón, sin encerado.", costo: 15000, duracion: 20, excluye: ["Lavado Premium", "Lavado Completo"], url: 'https://i.postimg.cc/Gp3hdPvv/lavado-basico.jpg' },
  { nombre: "lavado premium", categoria: "lavado", descripcion: "Lavado exterior + secado detallado + brillo en llantas.", costo: 30000, duracion: 45, excluye: ["Lavado Basico", "Lavado Completo"], url: 'https://i.postimg.cc/L53b9Pt9/lavado-premium.jpg'},
  { nombre: "Lavado Completo", categoria: "lavado", descripcion: "Lavado exterior e interior, incluye aspirado y limpieza básica de tapicería.", costo: 40000, duracion: 60, excluye: ["Lavado Basico", "Lavado Premium", "Aspirado interior"], url: 'https://i.postimg.cc/6pgYNckR/lavado-completo.jpg'},

  // ---- Interior ----
  { nombre: "Aspirado Interior", categoria: "interior", descripcion: "Aspirado de alfombras y asientos, limpieza ligera.", costo: 10000, duracion: 15, excluye: ["Lavado Completo", "Limpieza Interior Premium"], url: 'https://i.postimg.cc/KzqbZdm2/aspirado-interior.jpg' },
  { nombre: "Limpieza Tapiceria", categoria: "interior", descripcion: "Limpieza profunda de tapicería y alfombras.", costo: 25000, duracion: 45, excluye: ["Limpieza Interior Premium"], url: 'https://i.postimg.cc/bvPSb2bV/limpieza-tapiceria.jpg'},
  { nombre: "Limpieza Interior Premium", categoria: "interior", descripcion: "Limpieza completa de interior con tapicería, plásticos y aspirado profundo.", costo: 35000, duracion: 60, excluye: ["Aspirado Interior", "Limpieza Tapiceria"], url: 'https://i.postimg.cc/52dXdFPg/limpieza-interior-premium.jpg' },

  // ---- Tratamientos especiales ----
  { nombre: "Encerado", categoria: "tratamientoEspecial", descripcion: "Aplicación de cera protectora para pintura.", costo: 20000, duracion: 30, excluye: ["Pulida"], url: 'https://i.postimg.cc/d1HFqzwx/encerado.jpg' },
  { nombre: "Pulida", categoria: "tratamientoEspecial", descripcion: "Pulido completo de la pintura, incluye encerado final.", costo: 80000, duracion: 120, excluye: ["Encerado"], url: 'https://i.postimg.cc/5NwCt3Qr/pulida.png'},
  { nombre: "Lavado Motor", categoria: "tratamientoEspecial", descripcion: "Limpieza de compartimento del motor con productos especiales.", costo: 30000, duracion: 40, url: 'https://i.postimg.cc/tR61r5kC/lavado-motor.jpg'},

  // ---- Extras ----
  { nombre: "Brillo Llantas", categoria: "extra", descripcion: "Aplicación de silicona para brillo y protección de llantas.", costo: 5000, duracion: 10, url: 'https://i.postimg.cc/SRnhjDxH/brillo-llantas.jpg'},
  { nombre: "Aromatizante", categoria: "extra", descripcion: "Perfume interior a elección del cliente.", costo: 3000, duracion: 5, url: 'https://i.postimg.cc/bJCPzKpK/aromatizante.jpg'},
  { nombre: "Lavado Debajo", categoria: "extra", descripcion: "Limpieza profunda del chasis y partes bajas del vehículo.", costo: 25000, duracion: 35, url: 'https://i.postimg.cc/prkM041S/lavado-debajo.jpg' },
  { nombre: "Secado Detallado", categoria: "extra", descripcion: "Secado con microfibra y aire comprimido para eliminar gotas.", costo: 8000, duracion: 10, url: 'https://i.postimg.cc/SRgHL8JV/secado-detallado.jpg'}
]);


