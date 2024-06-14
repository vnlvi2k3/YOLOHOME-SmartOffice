type User = {
    displayName: string | null,
    email: string | null,
    photoURL: string | null,
    uid: string
}

type fanState = {
    state: boolean,
    velocity: number,
}



type NumberState = {
    temperature: number,
    moisture: number,
    soilmoisture: number,
    light: number,
}

type StateRecord = {
    id: string,
    data: DocumentData
};
