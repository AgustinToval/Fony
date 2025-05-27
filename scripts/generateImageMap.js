    const fs = require('fs');
    const path = require('path');

    // 🔧 Ruta a db.json de FONY-API
    const dataPath = path.join(__dirname, '../../FONY-API/db.json');
    const imagesDir = path.join(__dirname, '../assets/images');
    const outputPath = path.join(__dirname, '../utils/getImage.ts');

    // Cargar celulares desde db.json
    const db = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    const celulares = db.celulares;

    let missingFiles = [];

    const lines = celulares.map((cel) => {
    const id = cel.id;
    const file = cel.idImagen.replace(/['"]/g, '');
    const imagePath = path.join(imagesDir, file);

    if (!fs.existsSync(imagePath)) {
        missingFiles.push({ id, file });
    }

    return `  ${id}: require('@/assets/images/${file}'),`;
    });

    const fileContent = `// ⚠️ Archivo generado automáticamente desde generateImageMap.js

    const imageMap: Record<string, any> = {
    ${lines.join('\n')}
    };

    export const getImage = (filename: string) => {
    return imageMap[filename] ?? require('@/assets/images/default.png');
    };
    `;

    fs.writeFileSync(outputPath, fileContent, 'utf-8');
    console.log(`✅ Archivo generado: utils/getImage.ts con ${lines.length} entradas.`);

    // Verificación
    if (missingFiles.length > 0) {
    console.warn('\n⚠️ Archivos de imagen NO encontrados:');
    missingFiles.forEach(({ id, file }) => {
        console.warn(`  - ID: ${id} → Imagen: ${file}`);
    });
    console.warn('\n🧩 Verifica que los nombres coincidan y que las imágenes estén en /assets/images/\n');
    } else {
    console.log('🟢 Todas las imágenes están presentes.');
    }
