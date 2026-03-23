import { useEffect, useState } from 'react';

export interface ProjectFormValues {
  name: string;
  type: string;
  status: 'completed' | 'ongoing';
  city: 'pune' | 'nashik' | 'ahilyanagar' | 'sambhajinagar';
  location: string;
  mapsQuery: string;
  area: string;
  projectYear: string;
  description: string;
}

interface ProjectFormProps {
  initialValues?: ProjectFormValues;
  submitLabel: string;
  loading?: boolean;
  onSubmit: (values: ProjectFormValues, imageFile: File | null) => Promise<void>;
}

const defaultValues: ProjectFormValues = {
  name: '',
  type: 'Residential',
  status: 'completed',
  city: 'pune',
  location: '',
  mapsQuery: '',
  area: 'N/A',
  projectYear: String(new Date().getFullYear()),
  description: '',
};

export function ProjectForm({ initialValues, submitLabel, loading = false, onSubmit }: ProjectFormProps) {
  const [values, setValues] = useState<ProjectFormValues>(initialValues || defaultValues);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialValues) {
      setValues(initialValues);
    }
  }, [initialValues]);

  const handleChange = (field: keyof ProjectFormValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!values.name.trim() || !values.type.trim() || !values.location.trim() || !values.description.trim()) {
      setError('Please fill in all required fields.');
      return;
    }

    try {
      await onSubmit(values, imageFile);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to submit form');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white border border-[#EDEDED] p-6 lg:p-8">
      <div className="grid md:grid-cols-2 gap-6">
        <label className="block">
          <span className="block mb-2 text-[#2B2B2B]" style={{ fontSize: '0.875rem', fontWeight: 400 }}>
            Project Name
          </span>
          <input
            value={values.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className="w-full px-0 py-3 bg-transparent border-0 border-b border-[#EDEDED] text-[#2B2B2B] focus:outline-none focus:border-[#f3e218]"
            placeholder="Enter project name"
          />
        </label>

        <label className="block">
          <span className="block mb-2 text-[#2B2B2B]" style={{ fontSize: '0.875rem', fontWeight: 400 }}>
            Category
          </span>
          <select
            value={values.type}
            onChange={(e) => handleChange('type', e.target.value)}
            className="w-full px-0 py-3 bg-transparent border-0 border-b border-[#EDEDED] text-[#2B2B2B] focus:outline-none focus:border-[#f3e218]"
          >
            <option value="Residential">Residential</option>
            <option value="Commercial">Commercial</option>
            <option value="Interior">Interior</option>
          </select>
        </label>

        <label className="block">
          <span className="block mb-2 text-[#2B2B2B]" style={{ fontSize: '0.875rem', fontWeight: 400 }}>
            Status
          </span>
          <select
            value={values.status}
            onChange={(e) => handleChange('status', e.target.value as ProjectFormValues['status'])}
            className="w-full px-0 py-3 bg-transparent border-0 border-b border-[#EDEDED] text-[#2B2B2B] focus:outline-none focus:border-[#f3e218]"
          >
            <option value="completed">Completed (Previous)</option>
            <option value="ongoing">Ongoing</option>
          </select>
        </label>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <label className="block">
          <span className="block mb-2 text-[#2B2B2B]" style={{ fontSize: '0.875rem', fontWeight: 400 }}>
            City
          </span>
          <select
            value={values.city}
            onChange={(e) => handleChange('city', e.target.value as ProjectFormValues['city'])}
            className="w-full px-0 py-3 bg-transparent border-0 border-b border-[#EDEDED] text-[#2B2B2B] focus:outline-none focus:border-[#f3e218]"
          >
            <option value="pune">Pune</option>
            <option value="nashik">Nashik</option>
            <option value="ahilyanagar">Ahilyanagar</option>
            <option value="sambhajinagar">Chhatrapati Sambhaji Nagar</option>
          </select>
        </label>

        <label className="block">
          <span className="block mb-2 text-[#2B2B2B]" style={{ fontSize: '0.875rem', fontWeight: 400 }}>
            Area
          </span>
          <input
            value={values.area}
            onChange={(e) => handleChange('area', e.target.value)}
            className="w-full px-0 py-3 bg-transparent border-0 border-b border-[#EDEDED] text-[#2B2B2B] focus:outline-none focus:border-[#f3e218]"
            placeholder="e.g. 4,000 sq ft"
          />
        </label>

        <label className="block">
          <span className="block mb-2 text-[#2B2B2B]" style={{ fontSize: '0.875rem', fontWeight: 400 }}>
            Project Year
          </span>
          <input
            value={values.projectYear}
            onChange={(e) => handleChange('projectYear', e.target.value)}
            className="w-full px-0 py-3 bg-transparent border-0 border-b border-[#EDEDED] text-[#2B2B2B] focus:outline-none focus:border-[#f3e218]"
            placeholder="e.g. 2026"
          />
        </label>
      </div>

      <label className="block">
        <span className="block mb-2 text-[#2B2B2B]" style={{ fontSize: '0.875rem', fontWeight: 400 }}>
          Location
        </span>
        <input
          value={values.location}
          onChange={(e) => handleChange('location', e.target.value)}
          className="w-full px-0 py-3 bg-transparent border-0 border-b border-[#EDEDED] text-[#2B2B2B] focus:outline-none focus:border-[#f3e218]"
          placeholder="e.g. Baner, Pune"
        />
      </label>

      <label className="block">
        <span className="block mb-2 text-[#2B2B2B]" style={{ fontSize: '0.875rem', fontWeight: 400 }}>
          Google Maps Query (Optional)
        </span>
        <input
          value={values.mapsQuery}
          onChange={(e) => handleChange('mapsQuery', e.target.value)}
          className="w-full px-0 py-3 bg-transparent border-0 border-b border-[#EDEDED] text-[#2B2B2B] focus:outline-none focus:border-[#f3e218]"
          placeholder="Exact address or maps query for pin"
        />
      </label>

      <label className="block">
        <span className="block mb-2 text-[#2B2B2B]" style={{ fontSize: '0.875rem', fontWeight: 400 }}>
          Description
        </span>
        <textarea
          value={values.description}
          onChange={(e) => handleChange('description', e.target.value)}
          className="w-full min-h-32 px-0 py-3 bg-transparent border-0 border-b border-[#EDEDED] text-[#2B2B2B] focus:outline-none focus:border-[#f3e218]"
          placeholder="Project overview"
        />
      </label>

      <label className="block">
        <span className="block mb-2 text-[#2B2B2B]" style={{ fontSize: '0.875rem', fontWeight: 400 }}>
          Image Upload
        </span>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files?.[0] || null)}
          className="w-full px-4 py-3 border border-[#EDEDED] text-[#2B2B2B]"
        />
      </label>

      {error && (
        <p className="text-red-600" style={{ fontSize: '0.875rem', fontWeight: 400 }}>
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="px-10 py-3 bg-[#2B2B2B] text-white hover:bg-[#f3e218] hover:text-[#2B2B2B] transition-colors disabled:opacity-60"
        style={{ fontSize: '14px', fontWeight: 400, letterSpacing: '0.5px' }}
      >
        {loading ? 'Please wait...' : submitLabel}
      </button>
    </form>
  );
}
