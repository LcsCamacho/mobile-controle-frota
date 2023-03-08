import { useState } from "react";

export const useListAll = () => {
    const [loading, setLoading] = useState(true);

    const listAll = async () => {
        try {
            const [veiculos, motoristas, manutencao] = await Promise.all([
                fetch('http://localhost:3000/veiculos'),
                fetch('http://localhost:3000/motoristas'),
                fetch('http://localhost:3000/manutencao')
            ]);
            const [veiculosJson, motoristasJson, manutencaoJson] = await Promise.all([
                veiculos.json(),
                motoristas.json(),
                manutencao.json()
            ]);
            setLoading(false);
            return {veiculosJson, motoristasJson, manutencaoJson};
        } catch (error) {
            console.log(error);
        }
    };

    return { listAll, loading };
}