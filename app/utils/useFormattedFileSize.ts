export default (fileSizeInBytes: number) => {
    let i = -1;
    const byteUnits = [" КБ", " МБ", " ГБ", " ТБ", "ПБ", "ЭБ", "ЗБ", "ЙБ"];
    do {
        fileSizeInBytes /= 1000;
        i++;
    } while (fileSizeInBytes > 1000);

    return Math.max(fileSizeInBytes, 0.1).toFixed(1) + byteUnits[i];
};
