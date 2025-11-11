
export interface Referral {
  id: number;
  name: string;
  date: string;
  status: 'Pendiente' | 'Activo' | 'Avanzados';
  progress: number;
  jobTitle: string;
  imageUrl: string;
  hireDate: string;
}
