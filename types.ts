
export interface Veiculo {
    type: string;
    avaliable: boolean;
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

export interface Viagem {
    checkOut?: Date;
    id?: number;
    date: Date;
    VehicleId: number;
    DriverId: number;
    Vehicle: Veiculo;
    Driver: Motorista;
    createdAt: Date;
    updatedAt?: Date;
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


