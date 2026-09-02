import type { SiteContent } from '@/types/content';

export const personalInfo = {
  name: 'Keylor Zúñiga Jiménez',
  title: 'Estudiante de Ingeniería en Sistemas',
  cedula: '1-1941-0035',
  phone: '+506 8563-3772',
  email: 'zunigakeylor@gmail.com',
  location: 'Pérez Zeledón, San José, Costa Rica',
  availability: 'Disponibilidad inmediata',
  summary:
    'Estudiante de Ingeniería en Sistemas con conocimientos en tecnología, desarrollo web, bases de datos, soporte técnico, gestión administrativa e inteligencia artificial. Experiencia práctica en creación de aplicaciones y automatización de tareas con herramientas de IA como ChatGPT, Claude, Gemini, Copilot y OpenCode. Cuento con experiencia en atención al cliente, manejo de inventarios, organización de información y trabajo en equipo. Me caracterizo por mi capacidad de aprendizaje, responsabilidad, organización, atención al detalle y adaptación a diferentes entornos laborales.',
  goal:
    'Busco una oportunidad profesional que me permita aplicar y desarrollar mis conocimientos en áreas como soporte técnico, QA, asistencia administrativa, gestión de información, atención al usuario, desarrollo de software y tecnología.',
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
      'Desarrollo de una aplicación web para la visualización y gestión de productos, utilizando tecnologías como HTML, CSS, JavaScript y Node.js.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Node.js'],
  },
  {
    title: 'API REST con Node.js y MongoDB',
    description:
      'Desarrollo de una API REST con operaciones CRUD para la gestión y almacenamiento de información mediante MongoDB.',
    tags: ['Node.js', 'MongoDB', 'API REST'],
  },
  {
    title: 'Sistema de Base de Datos',
    description:
      'Diseño e implementación de bases de datos y consultas SQL utilizando MySQL para la gestión de información.',
    tags: ['MySQL', 'SQL', 'Modelado de datos'],
  },
];

export const experience = [
  {
    company: 'El Corral',
    role: 'Ayudante de Cocina',
    period: 'Octubre 2025 – Actualidad',
    tasks: [
      'Apoyo en la preparación y elaboración de alimentos.',
      'Organización y limpieza del área de trabajo.',
      'Trabajo en equipo en ambientes de alta demanda.',
      'Cumplimiento de normas de higiene, seguridad y organización.',
      'Apoyo en diferentes tareas operativas según las necesidades del establecimiento.',
    ],
  },
  {
    company: 'La Estañonera',
    role: 'Atención al Cliente e Inventarios',
    period: 'Enero 2024 – Agosto 2025',
    tasks: [
      'Atención y asesoría a clientes.',
      'Organización y control de inventarios.',
      'Gestión y organización de productos.',
      'Apoyo en diferentes actividades operativas del establecimiento.',
      'Resolución de consultas y atención de las necesidades de los clientes.',
      'Mantenimiento del orden y control de la mercadería.',
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
