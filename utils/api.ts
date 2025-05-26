    export const API_URL = 'https://fony-api.onrender.com';

    export const getCelulares = async () => {
    try {
        const response = await fetch(`${API_URL}/celulares`);
        if (!response.ok) throw new Error('Error al obtener celulares');
        return await response.json();
    } catch (error) {
        console.error('❌ Error al obtener celulares:', error);
        return [];
    }
    };

    export const getCelularPorId = async (id: string) => {
    try {
        const response = await fetch(`${API_URL}/celulares/${id}`);
        if (!response.ok) throw new Error('Error al obtener el celular');
        return await response.json();
    } catch (error) {
        console.error(`❌ Error al obtener celular con id ${id}:`, error);
        return null;
    }
    };
