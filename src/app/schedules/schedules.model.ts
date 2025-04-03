export interface SchaduleModel {
    month: number;
    year: number;
    appointments: ClientAppointment[];
}

export interface ClientAppointment {
    id: number;
    day: number;
    startAt: Date;
    endAt: Date;
    clientId: number;
    clientName: string;
}

export interface SaveSchedulesModel {
    startAt?: Date;
    endAt?: Date;
    clientId?: number;
}

export interface SelectedClient {
    id: number;
    name: string;
} 