export interface Program {
  id: string;
  name: string;
  description: string;
  category: ProgramCategory;
  faculty: string;
  duration: string;
  modality: ProgramModality;
  credits: number | null;
  image_url: string | null;
  created_at: string;
  updated_at: string;
}

export type ProgramCategory = 'Pregrado' | 'Posgrado' | 'Educación Continua';

export type ProgramModality = 'Presencial' | 'Virtual' | 'Híbrido';

export const PROGRAM_CATEGORIES: ProgramCategory[] = [
  'Pregrado',
  'Posgrado',
  'Educación Continua',
];

export const PROGRAM_MODALITIES: ProgramModality[] = [
  'Presencial',
  'Virtual',
  'Híbrido',
];
