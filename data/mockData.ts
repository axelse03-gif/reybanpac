import { Referral } from '../types';

export const MOCK_REFERRALS: Referral[] = [
    { id: 1, name: 'Carlos López', date: 'Pendiente desde el 17/11/2025', status: 'Pendiente', progress: 10, jobTitle: 'Operario', imageUrl: '', hireDate: '' },
    { id: 2, name: 'Jonathan Alcaraz', date: 'Referido el 15/05/2024', status: 'Activo', progress: 66, jobTitle: 'Supervisor de Campo', imageUrl: '', hireDate: '' },
    { id: 3, name: 'Axel Serrudo', date: 'Referido el 15/05/2024', status: 'Activo', progress: 75, jobTitle: 'Trabajador Agrícola', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA7cpbTlBMevBR68iqmANwwSRxOgFZ4QcUkQigRA36URSAlRhEtJTP6ar1iKDxW4sSo8zNyPqchlkp3RZfX6W-rzSlIIp6fqLv0d-dzq674IHtIOs5p_Gup6XLSTQLPLfg-6ZINKQntygF-s8iOCvFFZbEOuI6K-YjraQcxSWaSzKXn3R8vnigJv83b_r4ec5wqY-QrKifrMcwuq88K4WxfwWL0CintFUfBcmXtQ6TTF3WCYp9Azjo0LWokhubUhj9DMU2_JgQqJuDI', hireDate: 'Contratado el 15/06/2024' },
    { id: 4, name: 'Rocio Barrios Paez', date: 'Avanzados hace más de un año', status: 'Avanzados', progress: 100, jobTitle: 'Analista de Calidad', imageUrl: '', hireDate: '' },
    { id: 5, name: 'Maximiliano Loza', date: 'Avanzados hace más de un año', status: 'Avanzados', progress: 100, jobTitle: 'Jefe de Finca', imageUrl: '', hireDate: '' },
];