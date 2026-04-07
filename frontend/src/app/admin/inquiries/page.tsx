import { useEffect, useMemo, useState } from 'react';
import {
    fetchCareerInquiries,
    fetchClientInquiries,
    type CareerInquiryRecord,
    type ClientInquiryRecord,
} from '../../lib/api';

function formatDate(dateValue?: string) {
  if (!dateValue) return '-';
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return '-';
  return date.toLocaleString();
}

export default function AdminInquiriesPage() {
  const pageSize = 8;
  const [clientInquiries, setClientInquiries] = useState<ClientInquiryRecord[]>([]);
  const [careerInquiries, setCareerInquiries] = useState<CareerInquiryRecord[]>([]);
  const [clientSearch, setClientSearch] = useState('');
  const [careerSearch, setCareerSearch] = useState('');
  const [clientPage, setClientPage] = useState(1);
  const [careerPage, setCareerPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    Promise.all([fetchClientInquiries(), fetchCareerInquiries()])
      .then(([clients, careers]) => {
        if (!active) return;
        setClientInquiries(clients);
        setCareerInquiries(careers);
      })
      .catch((err) => {
        if (!active) return;
        setError(err instanceof Error ? err.message : 'Failed to load inquiries');
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  const filteredClientInquiries = useMemo(() => {
    const query = clientSearch.trim().toLowerCase();
    if (!query) return clientInquiries;

    return clientInquiries.filter((inquiry) =>
      [inquiry.name, inquiry.email, inquiry.phone || '', inquiry.projectType || '', inquiry.message || '']
        .join(' ')
        .toLowerCase()
        .includes(query),
    );
  }, [clientInquiries, clientSearch]);

  const filteredCareerInquiries = useMemo(() => {
    const query = careerSearch.trim().toLowerCase();
    if (!query) return careerInquiries;

    return careerInquiries.filter((inquiry) =>
      [
        inquiry.name,
        inquiry.email,
        inquiry.gender || '',
        inquiry.state || '',
        inquiry.skills?.join(' ') || '',
      ]
        .join(' ')
        .toLowerCase()
        .includes(query),
    );
  }, [careerInquiries, careerSearch]);

  const clientTotalPages = Math.max(1, Math.ceil(filteredClientInquiries.length / pageSize));
  const careerTotalPages = Math.max(1, Math.ceil(filteredCareerInquiries.length / pageSize));

  const paginatedClientInquiries = useMemo(() => {
    const start = (clientPage - 1) * pageSize;
    return filteredClientInquiries.slice(start, start + pageSize);
  }, [filteredClientInquiries, clientPage]);

  const paginatedCareerInquiries = useMemo(() => {
    const start = (careerPage - 1) * pageSize;
    return filteredCareerInquiries.slice(start, start + pageSize);
  }, [filteredCareerInquiries, careerPage]);

  useEffect(() => {
    setClientPage(1);
  }, [clientSearch]);

  useEffect(() => {
    setCareerPage(1);
  }, [careerSearch]);

  useEffect(() => {
    if (clientPage > clientTotalPages) {
      setClientPage(clientTotalPages);
    }
  }, [clientPage, clientTotalPages]);

  useEffect(() => {
    if (careerPage > careerTotalPages) {
      setCareerPage(careerTotalPages);
    }
  }, [careerPage, careerTotalPages]);

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-[#2B2B2B]" style={{ fontSize: '2rem', fontWeight: 400 }}>
          Inquiries
        </h2>
        <p className="text-[#2B2B2B]/70 mt-2" style={{ fontSize: '0.95rem', fontWeight: 400 }}>
          Review client and career inquiries submitted from the website.
        </p>
      </section>

      {error && (
        <p className="text-red-600" style={{ fontSize: '0.875rem', fontWeight: 400 }}>
          {error}
        </p>
      )}

      <section className="space-y-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <h3 className="text-[#2B2B2B]" style={{ fontSize: '1.4rem', fontWeight: 400 }}>
            Client Inquiries
          </h3>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <input
              type="text"
              value={clientSearch}
              onChange={(event) => setClientSearch(event.target.value)}
              placeholder="Search name, email, type, phone"
              className="w-full sm:w-80 px-3 py-2 border border-[#EDEDED] bg-white"
              style={{ fontSize: '0.875rem', fontWeight: 400 }}
            />
            <p className="text-[#2B2B2B]/70" style={{ fontSize: '0.85rem', fontWeight: 400 }}>
              {filteredClientInquiries.length} result{filteredClientInquiries.length === 1 ? '' : 's'}
            </p>
          </div>
        </div>
        <div className="bg-white border border-[#EDEDED] overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#EDEDED] text-left">
                <th className="px-4 py-3" style={{ fontSize: '0.875rem', fontWeight: 400 }}>Name</th>
                <th className="px-4 py-3" style={{ fontSize: '0.875rem', fontWeight: 400 }}>Email</th>
                <th className="px-4 py-3" style={{ fontSize: '0.875rem', fontWeight: 400 }}>Phone</th>
                <th className="px-4 py-3" style={{ fontSize: '0.875rem', fontWeight: 400 }}>Project Type</th>
                <th className="px-4 py-3" style={{ fontSize: '0.875rem', fontWeight: 400 }}>Message</th>
                <th className="px-4 py-3" style={{ fontSize: '0.875rem', fontWeight: 400 }}>Created At</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-4 py-6" style={{ fontSize: '0.95rem', fontWeight: 400 }}>
                    Loading inquiries...
                  </td>
                </tr>
              ) : filteredClientInquiries.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-6" style={{ fontSize: '0.95rem', fontWeight: 400 }}>
                    No client inquiries found for this search.
                  </td>
                </tr>
              ) : (
                paginatedClientInquiries.map((inquiry) => (
                  <tr key={inquiry._id} className="border-b border-[#F5F5F5] align-top">
                    <td className="px-4 py-3" style={{ fontSize: '0.9rem', fontWeight: 400 }}>{inquiry.name}</td>
                    <td className="px-4 py-3" style={{ fontSize: '0.9rem', fontWeight: 400 }}>{inquiry.email}</td>
                    <td className="px-4 py-3" style={{ fontSize: '0.9rem', fontWeight: 400 }}>{inquiry.phone || '-'}</td>
                    <td className="px-4 py-3" style={{ fontSize: '0.9rem', fontWeight: 400 }}>{inquiry.projectType || '-'}</td>
                    <td className="px-4 py-3 max-w-sm" style={{ fontSize: '0.9rem', fontWeight: 400 }}>{inquiry.message || '-'}</td>
                    <td className="px-4 py-3 whitespace-nowrap" style={{ fontSize: '0.9rem', fontWeight: 400 }}>
                      {formatDate(inquiry.createdAt)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {!loading && filteredClientInquiries.length > 0 && (
          <div className="flex items-center justify-between">
            <p className="text-[#2B2B2B]/70" style={{ fontSize: '0.85rem', fontWeight: 400 }}>
              Page {clientPage} of {clientTotalPages}
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setClientPage((page) => Math.max(1, page - 1))}
                disabled={clientPage === 1}
                className="px-3 py-2 border border-[#EDEDED] bg-white disabled:opacity-50"
                style={{ fontSize: '0.85rem', fontWeight: 400 }}
              >
                Previous
              </button>
              <button
                type="button"
                onClick={() => setClientPage((page) => Math.min(clientTotalPages, page + 1))}
                disabled={clientPage === clientTotalPages}
                className="px-3 py-2 border border-[#EDEDED] bg-white disabled:opacity-50"
                style={{ fontSize: '0.85rem', fontWeight: 400 }}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </section>

      <section className="space-y-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <h3 className="text-[#2B2B2B]" style={{ fontSize: '1.4rem', fontWeight: 400 }}>
            Career Inquiries
          </h3>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <input
              type="text"
              value={careerSearch}
              onChange={(event) => setCareerSearch(event.target.value)}
              placeholder="Search name, email, state, skills"
              className="w-full sm:w-80 px-3 py-2 border border-[#EDEDED] bg-white"
              style={{ fontSize: '0.875rem', fontWeight: 400 }}
            />
            <p className="text-[#2B2B2B]/70" style={{ fontSize: '0.85rem', fontWeight: 400 }}>
              {filteredCareerInquiries.length} result{filteredCareerInquiries.length === 1 ? '' : 's'}
            </p>
          </div>
        </div>
        <div className="bg-white border border-[#EDEDED] overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#EDEDED] text-left">
                <th className="px-4 py-3" style={{ fontSize: '0.875rem', fontWeight: 400 }}>Name</th>
                <th className="px-4 py-3" style={{ fontSize: '0.875rem', fontWeight: 400 }}>Email</th>
                <th className="px-4 py-3" style={{ fontSize: '0.875rem', fontWeight: 400 }}>Gender</th>
                <th className="px-4 py-3" style={{ fontSize: '0.875rem', fontWeight: 400 }}>Age</th>
                <th className="px-4 py-3" style={{ fontSize: '0.875rem', fontWeight: 400 }}>DOB</th>
                <th className="px-4 py-3" style={{ fontSize: '0.875rem', fontWeight: 400 }}>State</th>
                <th className="px-4 py-3" style={{ fontSize: '0.875rem', fontWeight: 400 }}>Skills</th>
                <th className="px-4 py-3" style={{ fontSize: '0.875rem', fontWeight: 400 }}>Created At</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={8} className="px-4 py-6" style={{ fontSize: '0.95rem', fontWeight: 400 }}>
                    Loading inquiries...
                  </td>
                </tr>
              ) : filteredCareerInquiries.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-6" style={{ fontSize: '0.95rem', fontWeight: 400 }}>
                    No career inquiries found for this search.
                  </td>
                </tr>
              ) : (
                paginatedCareerInquiries.map((inquiry) => (
                  <tr key={inquiry._id} className="border-b border-[#F5F5F5] align-top">
                    <td className="px-4 py-3" style={{ fontSize: '0.9rem', fontWeight: 400 }}>{inquiry.name}</td>
                    <td className="px-4 py-3" style={{ fontSize: '0.9rem', fontWeight: 400 }}>{inquiry.email}</td>
                    <td className="px-4 py-3" style={{ fontSize: '0.9rem', fontWeight: 400 }}>{inquiry.gender || '-'}</td>
                    <td className="px-4 py-3" style={{ fontSize: '0.9rem', fontWeight: 400 }}>{inquiry.age ?? '-'}</td>
                    <td className="px-4 py-3 whitespace-nowrap" style={{ fontSize: '0.9rem', fontWeight: 400 }}>
                      {formatDate(inquiry.dob)}
                    </td>
                    <td className="px-4 py-3" style={{ fontSize: '0.9rem', fontWeight: 400 }}>{inquiry.state || '-'}</td>
                    <td className="px-4 py-3 max-w-sm" style={{ fontSize: '0.9rem', fontWeight: 400 }}>
                      {inquiry.skills && inquiry.skills.length > 0 ? inquiry.skills.join(', ') : '-'}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap" style={{ fontSize: '0.9rem', fontWeight: 400 }}>
                      {formatDate(inquiry.createdAt)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {!loading && filteredCareerInquiries.length > 0 && (
          <div className="flex items-center justify-between">
            <p className="text-[#2B2B2B]/70" style={{ fontSize: '0.85rem', fontWeight: 400 }}>
              Page {careerPage} of {careerTotalPages}
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setCareerPage((page) => Math.max(1, page - 1))}
                disabled={careerPage === 1}
                className="px-3 py-2 border border-[#EDEDED] bg-white disabled:opacity-50"
                style={{ fontSize: '0.85rem', fontWeight: 400 }}
              >
                Previous
              </button>
              <button
                type="button"
                onClick={() => setCareerPage((page) => Math.min(careerTotalPages, page + 1))}
                disabled={careerPage === careerTotalPages}
                className="px-3 py-2 border border-[#EDEDED] bg-white disabled:opacity-50"
                style={{ fontSize: '0.85rem', fontWeight: 400 }}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
