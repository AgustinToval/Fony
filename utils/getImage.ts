    // ⚠️ Archivo generado automáticamente desde generateImageMap.js

const imageMap: Record<string, any> = {
    s23: require('@/assets/images/s23.png'),
    iphone13: require('@/assets/images/iphone13.png'),
    motoe32: require('@/assets/images/motoe32.png'),
    redminote12: require('@/assets/images/redminote12.png'),
    a14: require('@/assets/images/a14.png'),
    xiaomi13: require('@/assets/images/xiaomi13.png'),
    pixel6a: require('@/assets/images/pixel6a.png'),
    realme11pro: require('@/assets/images/realme11pro.png'),
    nokiaG22: require('@/assets/images/nokiaG22.png'),
    honor90: require('@/assets/images/honor90.png'),
};

export const getImage = (filename: string) => {
    return imageMap[filename] ?? require('@/assets/images/default.png');
};
