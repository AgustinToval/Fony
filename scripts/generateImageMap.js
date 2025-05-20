    const fs = require('fs');
    const path = require('path');

    // Rutas base
    const dataPath = path.join(__dirname, '../assets/data/celulares.json');
    const imagesDir = path.join(__dirname, '../assets/images');
    const outputPath = path.join(__dirname, '../utils/getImage.ts');

    const celulares = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

    let missingFiles = [];

    const lines = celulares.map((cel) => {
    const id = cel.id;
    const file = cel.idImagen.replace(/['"]/g, '');
    const imagePath = path.join(imagesDir, file);

    // Verifica si el archivo realmente existe
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

    // Advertencias
    if (missingFiles.length > 0) {
    console.warn('\n⚠️ Archivos de imagen NO encontrados:');
    missingFiles.forEach(({ id, file }) => {
        console.warn(`  - ID: ${id} → Imagen: ${file}`);
    });
    console.warn('\n🧩 Verifica que los nombres coincidan y que las imágenes estén en /assets/images/\n');
    } else {
    console.log('🟢 Todas las imágenes están presentes.');
    }



    // Comando para correr el script: node scripts/generateImageMap.js    El archivo utils/getImage.ts se sobreescribirá automáticamente cada vez que corramos este comando.


