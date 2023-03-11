
export interface Vehicle {
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
    id?: number,
    date: Date,
    cost: number,
    VehicleId: number,
    createdAt: Date,
    updatedAt?: Date,
    description: string
}


