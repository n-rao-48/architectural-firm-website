import { AdminLayoutShell } from '../components/admin/AdminLayoutShell';
import { ProtectedRoute } from '../components/admin/ProtectedRoute';

export default function AdminLayout() {
  return (
    <ProtectedRoute>
      <AdminLayoutShell />
    </ProtectedRoute>
  );
}
