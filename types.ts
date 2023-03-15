
export interface Veiculo {
    id?: number;
    plate: string;
    model: string;
}

export interface Motorista {
    id?: number;
    name: string;
    cnh?: string;
    avaliable?: boolean;
}

export interface Manutencao {
    checkout: boolean | null | undefined;
    Vehicle: {
        plate: string;
        model: string;
        id: number;
        type: string;
    };
    id?: number,
    date: Date,
    cost: number,
    VehicleId: number,
    createdAt: Date,
    updatedAt?: Date,
    description: string
}


