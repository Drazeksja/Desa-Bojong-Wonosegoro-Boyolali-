'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, User, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Cek jika sudah login sebelumnya
    const isAuth = localStorage.getItem('desa_admin_auth') === 'true';
    if (isAuth) {
      router.push('/berita?admin=true');
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem('desa_admin_auth', 'true');
        localStorage.setItem('desa_admin_user', username);
        router.push('/berita?admin=true');
      } else {
        setError(data.message || 'Username atau password salah.');
      }
    } catch (err) {
      // Fallback auth di client jika koneksi API terhambat
      if (username === 'admin_bojong' && password === 'BojongMaju@2026!') {
        localStorage.setItem('desa_admin_auth', 'true');
        localStorage.setItem('desa_admin_user', username);
        router.push('/berita?admin=true');
      } else {
        setError('Kredensial admin tidak valid. Silakan coba lagi.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-vh-100 d-flex align-items-center justify-content-center py-5" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' }}>
      <div className="container" style={{ maxWidth: '440px' }}>
        <div className="card border-0 shadow-lg rounded-4 overflow-hidden" style={{ background: '#ffffff' }}>
          
          {/* Header Card */}
          <div className="p-4 text-center text-white" style={{ background: 'linear-gradient(135deg, #172554 0%, #2c5282 100%)' }}>
            <div className="d-inline-flex align-items-center justify-content-center rounded-circle bg-white text-primary mb-3 shadow" style={{ width: '56px', height: '56px' }}>
              <ShieldCheck size={30} style={{ color: '#2c5282' }} />
            </div>
            <h4 className="fw-bold mb-1" style={{ fontFamily: 'serif' }}>Portal Masuk Admin</h4>
            <p className="small text-white text-opacity-75 mb-0">Pemerintah Desa Bojong</p>
          </div>

          {/* Form Login */}
          <div className="p-4 p-md-5">
            {error && (
              <div className="alert alert-danger d-flex align-items-center gap-2 py-2 px-3 small rounded-3 mb-4" role="alert">
                <AlertCircle size={18} className="flex-shrink-0" />
                <div>{error}</div>
              </div>
            )}

            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label className="form-label small fw-semibold text-muted text-uppercase" style={{ fontSize: '0.75rem', letterSpacing: '0.5px' }}>
                  Nama Pengguna / Admin
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0 text-muted">
                    <User size={17} />
                  </span>
                  <input
                    type="text"
                    className="form-control bg-light border-start-0 ps-0"
                    placeholder="Masukkan username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    autoFocus
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label small fw-semibold text-muted text-uppercase" style={{ fontSize: '0.75rem', letterSpacing: '0.5px' }}>
                  Kata Sandi
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0 text-muted">
                    <Lock size={17} />
                  </span>
                  <input
                    type="password"
                    className="form-control bg-light border-start-0 ps-0"
                    placeholder="Masukkan password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn w-100 py-2.5 fw-bold text-white rounded-3 shadow-sm d-flex align-items-center justify-content-center gap-2"
                style={{ background: '#2c5282', transition: 'all 0.25s ease' }}
              >
                {loading ? (
                  <span className="spinner-border spinner-border-sm" role="status"></span>
                ) : (
                  <>
                    <span>Masuk ke Panel Berita</span>
                    <ArrowRight size={17} />
                  </>
                )}
              </button>
            </form>

            <div className="text-center mt-4 pt-3 border-top">
              <a href="/" className="text-decoration-none small text-muted hover-primary">
                &larr; Kembali ke Beranda Desa
              </a>
            </div>
          </div>

        </div>

        <p className="text-center text-white text-opacity-50 small mt-4 mb-0">
          Sistem Pengelolaan Informasi Desa Bojong &copy; 2026
        </p>
      </div>
    </main>
  );
}
