    const fs = require('fs');
    const path = require('path');

    // Paths
    const jsonPath = path.join(__dirname, '../assets/data/celulares.json');

    // Reglas base para generar etiquetas
    const reglas = {
    fotografia: { camara: 8, edicion: 6 },
    multimedia: { video: 7, camara: 6 },
    gaming: { rendimiento: 9 },
    trabajo: { multitarea: 8, seguridad: 6 },
    educacion: { facilidad: 7 },
    comunicacion: { facilidad: 6 },
    redes: { fluidez: 8, carga: 7, notificaciones: 6 },
    basico: { facilidad: 8, bateria: 6 },
    otro: { bateria: 6 }
    };

    // Fusiona reglas múltiples
    const generarEtiquetas = (usos) => {
    const etiquetas = {};
    usos.forEach((uso) => {
        const base = reglas[uso.toLowerCase()];
        if (base) {
        for (const clave in base) {
            etiquetas[clave] = Math.max(etiquetas[clave] || 0, base[clave]);
        }
        }
    });

    // Limpia propiedades con valores undefined
    return Object.fromEntries(
        Object.entries(etiquetas).filter(([_, val]) => val !== undefined)
    );
    };

    // Cargar y procesar
    const celulares = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    const actualizados = celulares.map((cel) => {
    const nuevasEtiquetas = generarEtiquetas(cel.usoIdeal || []);
    const etiquetasFinales = cel.etiquetas || nuevasEtiquetas;

    const etiquetasLimpias = Object.fromEntries(
        Object.entries(etiquetasFinales).filter(([_, val]) => val !== undefined)
    );

    return { ...cel, etiquetas: etiquetasLimpias };
    });

    // Guardar resultado
    fs.writeFileSync(jsonPath, JSON.stringify(actualizados, null, 2), 'utf8');
    console.log(`✅ Archivo actualizado: celulares.json con ${actualizados.length} dispositivos.`);


        //node scripts/etiquetar-celulares.js  para correr el script
