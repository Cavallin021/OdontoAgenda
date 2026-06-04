export interface UserNickname {
  nickname: string;
}

export interface Appointment {
  id: number;
  patientName: string;
  service: string;
  room: string;
  status: string;
  start: string | Date;
  end: string | Date;
  userId: number;
  user?: UserNickname;
}
