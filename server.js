const express = require("express");
const multer = require("multer");
const app = express();

// Configurar Multer con las opciones de validación
const storage = multer.diskStorage({
  destination: "uploads/",
  fileFilter: (req, file, cb) => {
    // Validar el tipo de archivo
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true); // Permitir la carga del archivo
    } else {
      cb(new Error("Tipo de archivo no válido"), false); // Rechazar el archivo
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 5, // Tamaño máximo del archivo (5 MB)
  },
});

const upload = multer({ storage });

app.post("/upload", upload.array("files[]"), (req, res) => {
  const fileInfos = req.files.map((file) => {
    return {
      filename: file.filename,
      originalname: file.originalname,
      size: file.size,
      mimetype: file.mimetype,
    };
  });

  res.set("Content-Type", "application/json");
  res.send(JSON.stringify(fileInfos));
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.listen(3000, () => {
  console.log("Servidor escuchando en el puerto 3000");
});
