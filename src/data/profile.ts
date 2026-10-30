import type { SiteContent } from '@/types/content';

export const personalInfo = {
  name: 'Keylor Zúñiga Jiménez',
  title: 'Ingeniero en Sistemas',
  cedula: '119410035',
  phone: '+506 8563-3772',
  email: 'zunigakeylor@gmail.com',
  location: 'Pérez Zeledón, San José, Costa Rica',
  availability: 'Disponibilidad inmediata',
  summary:
    'Ingeniero en Sistemas con conocimientos en tecnología, desarrollo web, bases de datos, soporte técnico y gestión administrativa. Cuento con experiencia utilizando herramientas informáticas, gestionando información, resolviendo problemas y trabajando en equipo.',
  goal:
    'Interesado en oportunidades relacionadas con soporte técnico, asistencia administrativa, QA, gestión de información, atención al usuario, tecnología y desarrollo de software.',
};

export const skillGroups = [
  {
    title: 'Lenguajes de programación',
    items: ['C#', 'Java', 'Python', 'JavaScript'],
  },
  {
    title: 'Desarrollo web',
    items: ['HTML', 'CSS', 'JavaScript'],
  },
  {
    title: 'Backend',
    items: ['Node.js', 'Express'],
  },
  {
    title: 'Bases de datos',
    items: ['MySQL', 'MongoDB', 'PostgreSQL', 'Supabase'],
  },
  {
    title: 'Inteligencia artificial y creación con IA',
    items: ['OpenCode', 'Claude', 'ChatGPT', 'GitHub Copilot', 'Bolt', 'Gemini'],
  },
  {
    title: 'Control de versiones',
    items: ['Git', 'GitHub'],
  },
  {
    title: 'Herramientas',
    items: ['Visual Studio Code', 'Visual Studio', 'NetBeans', 'Cisco Packet Tracer'],
  },
  {
    title: 'Ofimática',
    items: ['Microsoft Word', 'Excel', 'Google Sheets'],
  },
  {
    title: 'Otros conocimientos',
    items: ['UML', 'Fundamentos de redes', 'Ciberseguridad básica', 'Metodologías ágiles'],
  },
];

export const projects = [
  {
    title: 'Sistema Web Marketplace',
    description:
      'Catálogo web de joyería con visualización de productos e interfaz dinámica, desarrollado con HTML, CSS, JavaScript y Node.js.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Node.js'],
    url: 'https://septembersix.netlify.app/',
  },
  {
    title: 'API REST con Node.js y MongoDB',
    description:
      'Implementación de una API REST para la gestión de información mediante operaciones CRUD utilizando Node.js y MongoDB.',
    tags: ['Node.js', 'MongoDB', 'API REST'],
  },
  {
    title: 'Sistema de Base de Datos',
    description:
      'Diseño e implementación de bases de datos y consultas SQL utilizando MySQL.',
    tags: ['MySQL', 'SQL', 'Modelado de datos'],
  },
  {
    title: 'Portafolio Web',
    description:
      'Desarrollo de un portafolio web personal para presentar proyectos, habilidades y conocimientos relacionados con desarrollo de software y tecnología.',
    tags: ['React', 'TypeScript', 'Tailwind CSS'],
  },
];

export const experience = [
  {
    company: 'El Corral',
    role: 'Ayudante de Cocina',
    period: 'Octubre 2025 – Actualidad',
    tasks: [
      'Apoyo en la preparación de alimentos.',
      'Organización y limpieza del área de trabajo.',
      'Trabajo en equipo en entornos de alta demanda.',
      'Cumplimiento de normas de higiene y seguridad.',
    ],
  },
  {
    company: 'La Estañonera',
    role: 'Atención al Cliente e Inventarios',
    period: 'Enero 2024 – Agosto 2025',
    tasks: [
      'Atención y asesoría a clientes.',
      'Organización y control de inventarios.',
    ],
  },
];

export const education = [
  {
    institution: 'Universidad San Isidro Labrador',
    degree: 'Bachillerato en Ingeniería en Sistemas',
    period: '2024 – 2026',
  },
  {
    institution: 'Liceo UNESCO',
    degree: 'Bachillerato en Educación Media',
    period: '2018 – 2022',
  },
];

export const softSkills = [
  'Organización y gestión del tiempo',
  'Resolución de problemas',
  'Comunicación efectiva',
  'Atención al detalle',
  'Aprendizaje rápido',
  'Trabajo en equipo',
  'Responsabilidad y compromiso',
  'Pensamiento crítico',
  'Adaptación a diferentes funciones',
  'Licencia de conducir B1',
];

export const languages = [
  { name: 'Español', level: 'Nativo', percent: 100 },
  { name: 'Inglés', level: 'Básico, actualmente en formación', percent: 35 },
];

export const defaultContent: SiteContent = {
  personalInfo,
  skillGroups,
  projects,
  experience,
  education,
  softSkills,
  languages,
  socialLinks: [
    {
      id: 'linkedin',
      platform: 'linkedin',
      url: 'https://www.linkedin.com/in/keylor-zu%C3%B1iga-jimenez-b35915348/',
    },
    {
      id: 'instagram',
      platform: 'instagram',
      url: 'https://www.instagram.com/keylor_zj/?hl=es-la',
    },
    {
      id: 'facebook',
      platform: 'facebook',
      url: 'https://www.facebook.com/keylor.zuniga.92?locale=es_LA',
    },
    {
      id: 'github',
      platform: 'github',
      url: 'https://github.com/keylorZ',
    },
  ],
  photoUrl: null,
};
