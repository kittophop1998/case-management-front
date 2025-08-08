'use client';

export function snakeToCamel(s: string): string {
    return s.replace(/(_\w)/g, (m) => m[1].toUpperCase());
}

export function convertKeysToCamelCase(obj: any): any {
    if (Array.isArray(obj)) {
        return obj.map(convertKeysToCamelCase);
    } else if (obj !== null && typeof obj === 'object') {
        return Object.entries(obj).reduce((acc, [key, value]) => {
            const camelKey = snakeToCamel(key);
            acc[camelKey] = convertKeysToCamelCase(value);
            return acc;
        }, {} as Record<string, any>);
    }
    return obj;
}

export function toSnakeCase(str: string): string {
    return str.replace(/([A-Z])/g, '_$1').toLowerCase();
}


