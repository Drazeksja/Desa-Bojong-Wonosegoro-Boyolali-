import { ArrowLeft, Construction } from "lucide-react";

export default function PlaceholderPage() {
  return (
    <main className="pb-5 bg-light min-vh-100 pt-5">
      <div className="container mt-5 pt-4">
        
        
        <div className="arsip-card p-5 text-center mt-4">
          <div className="d-inline-block p-3 arsip-icon-wrapper mb-4">
            <Construction size={48} />
          </div>
          <h6 className="fw-bold text-uppercase ls-2" style={{ color: 'var(--accent)', letterSpacing: '2px' }}>HALAMAN SEMENTARA</h6>
          <h1 className="display-5 fw-bold mb-3" style={{ color: 'var(--primary)' }}>Bantuan & FAQ</h1>
          <p className="text-muted lead mx-auto" style={{ maxWidth: '600px' }}>
            Halaman ini sedang dalam tahap pengembangan. Konten akan segera tersedia.
          </p>
        </div>
      </div>
    </main>
  );
}
