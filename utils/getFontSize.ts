/**
     * @param size 
     * @param tamanioLetra - 
     * @returns 
     */
    export const getFontSize = (
    size: 'small' | 'medium' | 'large',
    tamanioLetra: 'pequeno' | 'normal' | 'grande'
    ): number => {
    const scale = tamanioLetra === 'pequeno' ? 0.85 : tamanioLetra === 'grande' ? 1.2 : 1;
    const base = size === 'small' ? 14 : size === 'large' ? 20 : 16;

    return base * scale;
    };
