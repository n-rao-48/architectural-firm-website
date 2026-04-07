import { useEffect, useState } from 'react';

type AreaUnit = 'sq. ft.' | 'sq. mts.';

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
  onSubmit: (values: ProjectFormValues, imageFiles: File[]) => Promise<void>;
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

function normalizeAreaUnit(rawUnit: string): AreaUnit {
  const normalized = rawUnit.trim().toLowerCase().replaceAll(' ', '');

  if (normalized === 'sq.mts.' || normalized === 'sq.mts' || normalized === 'sq.mt' || normalized === 'sqm') {
    return 'sq. mts.';
  }

  return 'sq. ft.';
}

function parseArea(area: string): { value: string; unit: AreaUnit } {
  const raw = area.trim();
  if (!raw || raw.toLowerCase() === 'n/a') {
    return { value: '', unit: 'sq. ft.' };
  }

  const match = raw.match(/^([0-9]+(?:\.[0-9]+)?)\s*(sq\.?\s*(?:ft|mts?|mt)|sqft|sqm|sq\.\s*ft\.|sq\.\s*mts\.)?$/i);
  if (!match) {
    return { value: '', unit: 'sq. ft.' };
  }

  const numericValue = match[1] || '';
  const parsedUnit = match[2] ? normalizeAreaUnit(match[2]) : 'sq. ft.';

  return { value: numericValue, unit: parsedUnit };
}

export function ProjectForm({ initialValues, submitLabel, loading = false, onSubmit }: ProjectFormProps) {
  const [values, setValues] = useState<ProjectFormValues>(initialValues || defaultValues);
  const initialArea = parseArea(initialValues?.area || defaultValues.area);
  const [areaValue, setAreaValue] = useState(initialArea.value);
  const [areaUnit, setAreaUnit] = useState<AreaUnit>(initialArea.unit);
  const [imageSlots, setImageSlots] = useState<Array<File | null>>([null]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialValues) {
      setValues(initialValues);
      const parsedArea = parseArea(initialValues.area || 'N/A');
      setAreaValue(parsedArea.value);
      setAreaUnit(parsedArea.unit);
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
      const formattedArea = areaValue.trim() ? `${areaValue.trim()} ${areaUnit}` : 'N/A';
      const selectedFiles = imageSlots.filter((file): file is File => Boolean(file));
      await onSubmit({ ...values, area: formattedArea }, selectedFiles);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to submit form');
    }
  };

  const handleImageSlotChange = (index: number, file: File | null) => {
    setImageSlots((previous) => previous.map((slot, slotIndex) => (slotIndex === index ? file : slot)));
  };

  const addImageSlot = () => {
    setImageSlots((previous) => [...previous, null]);
  };

  const removeImageSlot = (index: number) => {
    setImageSlots((previous) => {
      if (previous.length === 1) {
        return [null];
      }

      const next = previous.filter((_, slotIndex) => slotIndex !== index);
      return next.length ? next : [null];
    });
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
          <div className="grid grid-cols-[2fr_1fr] gap-3">
            <input
              type="number"
              min="0"
              step="0.01"
              value={areaValue}
              onChange={(e) => setAreaValue(e.target.value)}
              className="w-full px-0 py-3 bg-transparent border-0 border-b border-[#EDEDED] text-[#2B2B2B] focus:outline-none focus:border-[#f3e218]"
              placeholder="Enter area"
            />
            <select
              value={areaUnit}
              onChange={(e) => setAreaUnit(e.target.value as AreaUnit)}
              className="w-full px-0 py-3 bg-transparent border-0 border-b border-[#EDEDED] text-[#2B2B2B] focus:outline-none focus:border-[#f3e218]"
            >
              <option value="sq. mts.">sq. mts.</option>
              <option value="sq. ft.">sq. ft.</option>
            </select>
          </div>
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

      <div className="block">
        <span className="block mb-2 text-[#2B2B2B]" style={{ fontSize: '0.875rem', fontWeight: 400 }}>
          Image Uploads
        </span>

        <div className="space-y-3">
          {imageSlots.map((file, index) => (
            <div key={`image-slot-${index}`} className="border border-[#EDEDED] p-3">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <input
                  type="file"
                  accept=".png,.jpeg,.jpg,.pneg,image/*"
                  onChange={(event) => handleImageSlotChange(index, event.target.files?.[0] || null)}
                  className="w-full text-[#2B2B2B]"
                />
                <button
                  type="button"
                  onClick={() => removeImageSlot(index)}
                  className="px-3 py-1 border border-[#EDEDED] text-[#2B2B2B] hover:bg-[#F5F5F5]"
                  style={{ fontSize: '0.8rem', fontWeight: 400 }}
                >
                  Remove
                </button>
              </div>
              <p className="mt-2 text-[#2B2B2B]/70" style={{ fontSize: '0.8rem', fontWeight: 400 }}>
                {file ? file.name : `No file selected for box ${index + 1}`}
              </p>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addImageSlot}
          className="mt-3 px-4 py-2 border border-[#2B2B2B] text-[#2B2B2B] hover:bg-[#2B2B2B] hover:text-white transition-colors"
          style={{ fontSize: '0.85rem', fontWeight: 400 }}
        >
          Add Another Image Box
        </button>

        <span className="mt-2 block text-[#2B2B2B]/70" style={{ fontSize: '0.8rem', fontWeight: 400 }}>
          Supported extensions: .png, .jpeg, .jpg, .pneg
        </span>
        <span className="mt-2 block text-[#2B2B2B]/70" style={{ fontSize: '0.8rem', fontWeight: 400 }}>
          {imageSlots.filter(Boolean).length} file(s) selected across {imageSlots.length} box(es)
        </span>
      </div>

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
