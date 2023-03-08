import { useState, useEffect } from "react";

interface Atom<AtomType> {
    get: () => AtomType;
    set: (newValue: AtomType) => void;
    subscribe: (callback: (newValue: AtomType) => void) => () => void;
}

export function atom<AtomType>(initialValue: AtomType): Atom<AtomType>{
    let value = initialValue;

    const subscribers = new Set<(newValue: AtomType) => void>();

    return {
        get: () => value,
        set: (newValue) => {
            value = newValue;
            subscribers.forEach((callback) => callback(newValue));
        },
        subscribe: (callback) => {
            subscribers.add(callback);
            return () => {
                subscribers.delete(callback);
            };
        }
    }
}

export function useAtom<AtomType>(atom: Atom<AtomType>) {
    const [value, setValue] = useState(atom.get());

    useEffect(() => {
        const unsubscribe = atom.subscribe(setValue);
        return () => {
            unsubscribe();
        };
    }, [atom]);

    return [value, atom.set];
}