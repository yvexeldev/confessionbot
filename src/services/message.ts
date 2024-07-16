export function formatNumber(num: number): string {
    if (num > 99999) {
        return num.toString();
    }
    return num.toString().padStart(5, '0');
}
