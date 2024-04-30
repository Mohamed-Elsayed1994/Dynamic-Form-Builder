export interface FieldConfig {
    priority: number;
    name: string;
    type: string;
    labelEn: string;
    labelAr: string;
    placeholderEn: string;
    placeholderAr: string;
    validations: Validation[];
    options?: Option[];
    cols: number;
}

export interface Validation {
    name: string;
    value: any;
    message: {
        en: string;
        ar: string;
    };
}

interface Option {
    id: number;
    nameEn: string;
    nameAr: string;
}
