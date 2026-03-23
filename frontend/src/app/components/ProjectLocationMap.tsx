type ProjectLocationMapProps = {
  location: string;
  mapQuery?: string;
  title?: string;
};

export function ProjectLocationMap({ location, mapQuery, title = 'Project Location' }: ProjectLocationMapProps) {
  const mapSearchQuery = (mapQuery || location).trim() || location;
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(mapSearchQuery)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="border border-[#EDEDED] bg-white p-4">
      <p className="text-[#2B2B2B] mb-3" style={{ fontSize: '12px', fontWeight: 400, letterSpacing: '1px' }}>
        {title.toUpperCase()}
      </p>
      <div className="relative h-[190px] w-full overflow-hidden bg-[#F8F8F8]">
        <iframe
          src={mapSrc}
          title={`${title} - ${location}`}
          className="absolute inset-0 h-full w-full"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
      <a
        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapSearchQuery)}`}
        target="_blank"
        rel="noreferrer"
        className="inline-block mt-3 text-[#2B2B2B] hover:text-[#f3e218] transition-colors"
        style={{ fontSize: '12px', fontWeight: 400, letterSpacing: '0.6px' }}
      >
        Open in Google Maps
      </a>
    </div>
  );
}
