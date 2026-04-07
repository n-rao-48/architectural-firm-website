export type ProjectCategory = 'Residential' | 'Commercial' | 'Interior';
export type ProjectCity = 'pune' | 'nashik' | 'ahilyanagar' | 'sambhajinagar';
export type ProjectStatus = 'completed' | 'ongoing';

export interface Project {
  id: string | number;
  title: string;
  category: ProjectCategory;
  city: ProjectCity;
  status?: ProjectStatus;
  location: string;
  year: string;
  area: string;
  mapsQuery?: string;
  image: string;
  description: string;
}

const eetamaxCoverImage = new URL('../assets/nR1.png', import.meta.url).href;
const alligoOfficeImage = new URL('../assets/Alligo Horizon.jpeg', import.meta.url).href;

export const projects: Project[] = [
  // Pune
  {
    id: 1,
    title: 'Kothrud Bungalow',
    category: 'Residential',
    city: 'pune',
    location: 'Kothrud, Pune',
    year: '2024',
    area: '3,800 sq ft',
    image: 'https://images.unsplash.com/photo-1696743297474-d674b8e3d82a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjBhcmNoaXRlY3R1cmUlMjBmYWNhZGV8ZW58MXx8fHwxNzcxMzQ1MTgxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'A contemporary family bungalow in Kothrud that integrates indoor and outdoor living spaces through careful landscaping and open-plan design, featuring natural materials and abundant natural light throughout.',
  },
  {
    id: 2,
    title: 'Baner Commercial Hub',
    category: 'Commercial',
    city: 'pune',
    location: 'Baner, Pune',
    year: '2023',
    area: '6,200 sq ft',
    image: 'https://images.unsplash.com/photo-1651342489820-7d824299445e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcmNoaXRlY3R1cmUlMjBpbnRlcmlvciUyMGNvbmNyZXRlfGVufDF8fHx8MTc3MTM0NTE4MXww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'A minimalist commercial space in Baner designed with exposed concrete and large glass panels, creating open, collaborative work environments with excellent natural light and flexible floor plans.',
  },
  {
    id: 3,
    title: 'Aundh Apartment Interiors',
    category: 'Interior',
    city: 'pune',
    location: 'Aundh, Pune',
    year: '2024',
    area: '1,650 sq ft',
    image: 'https://images.unsplash.com/photo-1592401526914-7e5d94a8d6fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBpbnRlcmlvciUyMGxpdmluZyUyMHJvb218ZW58MXx8fHwxNzcxMzIwNjM5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'A sophisticated apartment interior in Aundh curated with understated luxury — precise material selection, warm textures, and a restrained palette that balances comfort with contemporary aesthetics.',
  },
  // Nashik
  {
    id: 4,
    title: 'Gangapur Road Villa',
    category: 'Residential',
    city: 'nashik',
    location: 'Gangapur Road, Nashik',
    year: '2024',
    area: '5,200 sq ft',
    image: 'https://images.unsplash.com/photo-1617788587804-10346bac2ac3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcmNoaXRlY3R1cmUlMjBidWlsZGluZyUyMGV4dGVyaW9yfGVufDF8fHx8MTc3MTMyMzg0OXww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'A striking villa on Gangapur Road designed around panoramic views of the surrounding hills. The design integrates terraced landscaping, shaded courtyards, and passive cooling strategies.',
  },
  {
    id: 5,
    title: 'Satpur Office Complex',
    category: 'Commercial',
    city: 'nashik',
    location: 'Satpur, Nashik',
    year: '2023',
    area: '9,500 sq ft',
    image: 'https://images.unsplash.com/photo-1769366529552-cc8ac4f46549?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tZXJjaWFsJTIwYnVpbGRpbmclMjBmYWNhZGUlMjBtaW5pbWFsfGVufDF8fHx8MTc3MTM0OTYyMnww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'A purpose-designed office complex in Satpur MIDC featuring clean architectural lines, flexible open-plan floors, and a facade that balances transparency with privacy for a modern work environment.',
  },
  {
    id: 6,
    title: 'Cidco Heritage Residence',
    category: 'Residential',
    city: 'nashik',
    location: 'Cidco, Nashik',
    year: '2022',
    area: '2,900 sq ft',
    image: 'https://images.unsplash.com/photo-1768321902385-65fd2113d46b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmNoaXRlY3R1cmFsJTIwcmVub3ZhdGlvbiUyMHByb2plY3R8ZW58MXx8fHwxNzcxMzQ5NjIzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'A thoughtful restoration and modernisation of an established residential property in Cidco, honouring the original structural character while introducing contemporary interiors and upgraded building systems.',
  },
  // Ahilyanagar
  {
    id: 7,
    title: 'Civil Lines Bungalow',
    category: 'Residential',
    city: 'ahilyanagar',
    location: 'Civil Lines, Ahilyanagar',
    year: '2023',
    area: '4,100 sq ft',
    image: 'https://images.unsplash.com/photo-1564703048291-bcf7f001d83d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtb2Rlcm4lMjBob3VzZSUyMGFyY2hpdGVjdHVyZXxlbnwxfHx8fDE3NzEyNjIyODB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'A refined bungalow in the established Civil Lines neighbourhood, combining generous interior proportions with a disciplined exterior composition that respects the character of the surrounding area.',
  },
  {
    id: 8,
    title: 'Station Road Renovation',
    category: 'Interior',
    city: 'ahilyanagar',
    location: 'Station Road, Ahilyanagar',
    year: '2024',
    area: '3,200 sq ft',
    image: 'https://images.unsplash.com/photo-1658737229058-cf22ac7ee8ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwYXJjaGl0ZWN0dXJhbCUyMHNwYWNlfGVufDF8fHx8MTc3MTM0NTE4Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'A comprehensive interior renovation of a commercial premises on Station Road, transforming an underutilised space into an elegant, functional environment through careful spatial planning and material upgrades.',
  },
  // Chhatrapati Sambhaji Nagar
  {
    id: 9,
    title: 'Cantonment Residence',
    category: 'Residential',
    city: 'sambhajinagar',
    location: 'Cantonment, Chhatrapati Sambhaji Nagar',
    year: '2024',
    area: '4,800 sq ft',
    image: 'https://images.unsplash.com/photo-1706808849777-96e0d7be3bb7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjBob3VzZSUyMGV4dGVyaW9yfGVufDF8fHx8MTc3MTM0OTYyM3ww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'A meticulously designed residence in the Cantonment area, featuring strong geometric forms, shaded verandas, and interiors that draw on the architectural heritage of the region.',
  },
  {
    id: 10,
    title: 'Waluj Business Centre',
    category: 'Commercial',
    city: 'sambhajinagar',
    location: 'Waluj MIDC, Chhatrapati Sambhaji Nagar',
    year: '2023',
    area: '11,000 sq ft',
    image: 'https://images.unsplash.com/photo-1770816307909-de85ea3b54a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwb2ZmaWNlJTIwaW50ZXJpb3IlMjBkZXNpZ258ZW58MXx8fHwxNzcxMzAyOTE2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: "A purpose-built business centre in the Waluj industrial corridor, offering flexible commercial floor plates and a refined architectural language serving the region's growing professional community.",
  },
  // Ongoing (also featured in dedicated ongoing page)
  {
    id: 11,
    title: 'Eetamax',
    category: 'Commercial',
    city: 'ahilyanagar',
    status: 'ongoing',
    location: 'Ahilyanagar, Maharashtra',
    year: '2026',
    area: 'Proposed industrial plan',
    mapsQuery: 'Ahilyanagar, Maharashtra',
    image: eetamaxCoverImage,
    description:
      'Proposed industrial development plan prepared for Eetamax, focused on efficient planning, scalable workflow, and practical movement across the site.',
  },
  {
    id: 12,
    title: 'M/s Alligo Horizon Pvt. Ltd.',
    category: 'Commercial',
    city: 'nashik',
    status: 'ongoing',
    location: 'Waghere, Igatpuri, Nashik',
    year: '2026',
    area: 'Factory office (ongoing)',
    mapsQuery: 'Waghere, Igatpuri, Nashik, Maharashtra',
    image: alligoOfficeImage,
    description:
      'Ongoing factory office project for M/s Alligo Horizon Pvt. Ltd., combining industrial functionality with a clear, organized office environment for daily operations.',
  },
];
