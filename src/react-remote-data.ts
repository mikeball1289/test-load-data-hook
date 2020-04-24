import { useState, useEffect } from "react";

interface PLoaded<T> {
    data: T;
    loaded: true;
    error: undefined;
}

interface PError {
    data: undefined;
    loaded: true;
    error: any;
}

interface PLoading {
    data: undefined;
    loaded: false;
    error: undefined;
}

function PLoading(): PLoading {
    return { data: undefined, loaded: false, error: undefined };
}

function PError(error: any): PError {
    return { data: undefined, loaded: true, error };
}

function PLoaded<T>(data: T): PLoaded<T> {
    return { data, loaded: true, error: undefined };
}

export type PLoadState<T> = PLoaded<T> | PError | PLoading;

export function useRemoteData<T>(loader: () => Promise<T>): PLoadState<T> {
    const [loadState, setLoadState] = useState<PLoadState<T>>(PLoading());

    useEffect(() => {
        loader()
            .then(data => setLoadState(PLoaded(data)))
            .catch(err => setLoadState(PError(err)))
        }, []);

    return loadState;
}