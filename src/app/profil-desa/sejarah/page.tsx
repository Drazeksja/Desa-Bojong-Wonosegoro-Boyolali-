import Image from "next/image";
import { Users } from "lucide-react";

export default function SejarahDesa() {
  return (
    <main className="pb-5 bg-white min-vh-100 pt-5">

      {/* =====================================================
          ANIMATION STYLE
      ===================================================== */}
      <style>{`

        /* ===============================
           ANIMASI UMUM
        =============================== */

        .history-header {
          opacity: 0;
          transform: translateY(-25px);
          animation: headerReveal 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes headerReveal {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }


        /* ===============================
           SECTION REVEAL
        =============================== */

        .history-section {
          opacity: 0;
          transform: translateY(35px);
          animation: sectionReveal 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .history-section.delay-1 {
          animation-delay: 0.15s;
        }

        .history-section.delay-2 {
          animation-delay: 0.3s;
        }

        .history-section.delay-3 {
          animation-delay: 0.45s;
        }

        @keyframes sectionReveal {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }


        /* ===============================
           FOTO ARSIP
        =============================== */

        .archive-image {
          overflow: hidden;
          opacity: 0;
          transform: scale(0.96);
          animation: archiveReveal 1s cubic-bezier(0.16, 1, 0.3, 1) 0.25s forwards;
        }

        .archive-image img {
          transition:
            transform 0.7s cubic-bezier(0.16, 1, 0.3, 1),
            filter 0.7s ease;
        }

        .archive-image:hover img {
          transform: scale(1.05);
          filter: brightness(1.05);
        }

        @keyframes archiveReveal {
          to {
            opacity: 1;
            transform: scale(1);
          }
        }


        /* ===============================
           TEKS SEJARAH
        =============================== */

        .history-text {
          opacity: 0;
          transform: translateX(25px);
          animation: textReveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .history-text:nth-child(1) {
          animation-delay: 0.25s;
        }

        .history-text:nth-child(2) {
          animation-delay: 0.4s;
        }

        .history-text:nth-child(3) {
          animation-delay: 0.55s;
        }

        @keyframes textReveal {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }


        /* ===============================
           QUOTE
        =============================== */

        .history-quote {
          opacity: 0;
          transform: translateX(-25px);
          animation: quoteReveal 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.7s forwards;
          transition:
            transform 0.35s ease,
            box-shadow 0.35s ease;
        }

        .history-quote:hover {
          transform: translateX(5px);
          box-shadow: 0 10px 25px rgba(15, 23, 42, 0.06);
        }

        @keyframes quoteReveal {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }


        /* ===============================
           TIMELINE LINE
        =============================== */

        .timeline-line {
          transform: scaleX(0);
          transform-origin: left center;
          animation: timelineLine 1.4s cubic-bezier(0.16, 1, 0.3, 1) 0.45s forwards;
        }

        @keyframes timelineLine {
          to {
            transform: scaleX(1);
          }
        }


        /* ===============================
           TIMELINE ITEM
        =============================== */

        .timeline-item {
          opacity: 0;
          transform: translateY(25px);
          animation: timelineItemReveal 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .timeline-item:nth-child(2) {
          animation-delay: 0.45s;
        }

        .timeline-item:nth-child(3) {
          animation-delay: 0.6s;
        }

        .timeline-item:nth-child(4) {
          animation-delay: 0.75s;
        }

        .timeline-item:nth-child(5) {
          animation-delay: 0.9s;
        }

        .timeline-item:nth-child(6) {
          animation-delay: 1.05s;
        }

        .timeline-item:nth-child(7) {
          animation-delay: 1.2s;
        }

        @keyframes timelineItemReveal {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }


        /* ===============================
           TIMELINE DOT
        =============================== */

        .timeline-dot {
          transition:
            transform 0.3s ease,
            box-shadow 0.3s ease,
            background-color 0.3s ease;
        }

        .timeline-item:hover .timeline-dot {
          transform: scale(1.35);
          box-shadow:
            0 0 0 7px rgba(37, 99, 235, 0.10);
        }


        /* ===============================
           TIMELINE TEXT
        =============================== */

        .timeline-year {
          transition:
            transform 0.3s ease,
            letter-spacing 0.3s ease;
        }

        .timeline-item:hover .timeline-year {
          transform: translateY(-3px);
          letter-spacing: 1px;
        }


        /* ===============================
           PERSON CARD
        =============================== */

        .person-card {
          opacity: 0;
          transform: translateY(30px) scale(0.97);
          animation: personReveal 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .person-card:nth-child(1) {
          animation-delay: 0.2s;
        }

        .person-card:nth-child(2) {
          animation-delay: 0.3s;
        }

        .person-card:nth-child(3) {
          animation-delay: 0.4s;
        }

        .person-card:nth-child(4) {
          animation-delay: 0.5s;
        }

        .person-card:nth-child(5) {
          animation-delay: 0.6s;
        }

        @keyframes personReveal {
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }


        /* ===============================
           FOTO TOKOH
        =============================== */

        .person-image {
          transition:
            transform 0.45s cubic-bezier(0.16, 1, 0.3, 1),
            box-shadow 0.45s ease;
        }

        .person-card:hover .person-image {
          transform: translateY(-8px) scale(1.02);
          box-shadow:
            0 14px 30px rgba(15, 23, 42, 0.12);
        }


        /* ===============================
           NAMA TOKOH
        =============================== */

        .person-name {
          transition:
            color 0.3s ease,
            transform 0.3s ease;
        }

        .person-card:hover .person-name {
          color: var(--accent) !important;
          transform: translateY(-2px);
        }


        /* ===============================
           ROLE TOKOH
        =============================== */

        .person-role {
          transition:
            transform 0.3s ease,
            opacity 0.3s ease;
        }

        .person-card:hover .person-role {
          transform: translateY(-2px);
        }


        /* ===============================
           SCROLLBAR TIMELINE
        =============================== */

        .timeline-scroll::-webkit-scrollbar {
          height: 5px;
        }

        .timeline-scroll::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 10px;
        }

        .timeline-scroll::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }

        .timeline-scroll::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }


        /* ===============================
           REDUCED MOTION
        =============================== */

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }


        /* ===============================
           MOBILE
        =============================== */

        @media (max-width: 767px) {

          .history-text {
            transform: translateY(20px);
          }

          .history-text {
            animation-name: mobileTextReveal;
          }

          @keyframes mobileTextReveal {
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .history-quote {
            transform: translateY(20px);
          }

          .history-quote {
            animation-name: mobileQuoteReveal;
          }

          @keyframes mobileQuoteReveal {
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

        }

      `}</style>


      {/* =====================================================
          CONTAINER
      ===================================================== */}

      <div className="container mt-5 pt-4">


        {/* ===================================================
            PAGE HEADER
        =================================================== */}

        <div className="mb-5 text-center border-bottom border-secondary border-opacity-25 pb-4 history-header">

          <h6
            className="fw-bold text-uppercase ls-2"
            style={{
              color: 'var(--accent)',
              letterSpacing: '2px'
            }}
          >
            PROFIL DESA
          </h6>

          <h1
            className="display-4 fw-bold mt-2"
            style={{
              color: 'var(--primary-dark)',
              fontFamily: 'serif'
            }}
          >
            Sejarah Desa Bojong
          </h1>

        </div>


        {/* ===================================================
            SECTION 1: ASAL USUL
        =================================================== */}

        <div className="mb-5 pb-5 border-bottom border-secondary border-opacity-25 history-section delay-1">

          <div className="row g-5 align-items-start">


            {/* FOTO ARSIP */}

            <div className="col-lg-4">

              <div
                className="position-relative w-100 bg-light border border-secondary border-opacity-50 p-2 archive-image"
                style={{
                  height: '400px'
                }}
              >

                <div
                  className="w-100 h-100 position-relative border"
                  style={{
                    borderColor: '#ced4da'
                  }}
                >

                  <Image
                    src="/placeholder.webp"
                    alt="Foto Arsip Desa"
                    fill
                    className="object-fit-cover"
                  />

                  <div
                    className="position-absolute top-50 start-50 translate-middle text-muted bg-white bg-opacity-75 px-3 py-1 rounded"
                    style={{
                      fontFamily: 'serif',
                      fontStyle: 'italic',
                      fontSize: '0.85rem'
                    }}
                  >
                    Foto Arsip Desa
                  </div>

                </div>

              </div>

            </div>


            {/* TEKS SEJARAH */}

            <div className="col-lg-8">

              <div
                style={{
                  lineHeight: 1.8,
                  fontSize: '1.1rem',
                  color: '#1e293b'
                }}
              >


                {/* PARAGRAF 1 */}

                <p
                  className="text-justify history-text"
                  style={{
                    textAlign: 'justify'
                  }}
                >

                  <span
                    style={{
                      float: 'left',
                      fontSize: '4.8rem',
                      lineHeight: '0.7',
                      paddingRight: '12px',
                      paddingTop: '10px',
                      fontFamily: 'serif',
                      fontWeight: 'bold',
                      color: 'var(--primary-dark)'
                    }}
                  >
                    M
                  </span>

                  engingat Sejarah Desa{' '}

                  <span
                    style={{
                      fontFamily: 'serif',
                      fontStyle: 'italic',
                      fontWeight: 'bold',
                      fontSize: '1.2rem'
                    }}
                  >
                    Bojong
                  </span>{' '}

                  yang kami dengar dari beberapa Tokoh Masyarakat,
                  pada zaman dahulu hiduplah seorang pengembara
                  bersama istrinya yang singgah di hutan{' '}

                  <span
                    style={{
                      fontFamily: 'serif',
                      fontStyle: 'italic',
                      fontWeight: 'bold',
                      fontSize: '1.2rem'
                    }}
                  >
                    Jonggol
                  </span>.

                </p>


                {/* PARAGRAF 2 */}

                <p
                  className="text-justify mt-3 history-text"
                  style={{
                    textAlign: 'justify'
                  }}
                >

                  Di sana, istri tersebut sedang hamil tua.
                  Pada waktu melahirkan, anaknya meninggal dunia
                  (dalam bahasa Jawa disebut{' '}

                  <span
                    style={{
                      fontFamily: 'serif',
                      fontStyle: 'italic',
                      fontWeight: 'bold',
                      fontSize: '1.2rem'
                    }}
                  >
                    Bajang
                  </span>{' '}

                  ) dan dikubur di tengah hutan
                  (yang sekarang dikenal dengan pemakaman
                  Punden Jonggol).

                </p>


                {/* PARAGRAF 3 */}

                <p
                  className="text-justify mt-3 history-text"
                  style={{
                    textAlign: 'justify'
                  }}
                >

                  Sejak peristiwa tersebut, daerah itu mulai
                  dikenal dengan sebutan{' '}

                  <span
                    style={{
                      fontFamily: 'serif',
                      fontStyle: 'italic',
                      fontWeight: 'bold',
                      fontSize: '1.2rem'
                    }}
                  >
                    Bojong
                  </span>{' '}

                  yang berasal dari kata{' '}

                  <span
                    style={{
                      fontFamily: 'serif',
                      fontStyle: 'italic',
                      fontWeight: 'bold',
                      fontSize: '1.2rem'
                    }}
                  >
                    Bajang
                  </span>.

                </p>


                {/* QUOTE */}

                <blockquote
                  className="mt-5 p-4 fs-5 history-quote"
                  style={{
                    borderLeft: '4px solid var(--primary-dark)',
                    backgroundColor: '#f8fafc',
                    fontFamily: 'serif'
                  }}
                >

                  "Nama desa ini menyimpan sejarah yang sangat erat
                  dengan leluhur kita yang pernah singgah di hutan Jonggol."

                  <br />

                  <span
                    className="fw-bold mt-3 d-inline-block text-dark fs-6"
                    style={{
                      fontFamily: 'var(--font-inter), sans-serif'
                    }}
                  >
                    — Tokoh Masyarakat Bojong
                  </span>

                </blockquote>

              </div>

            </div>

          </div>

        </div>


        {/* ===================================================
            SECTION 2: GARIS WAKTU
        =================================================== */}

        <div className="mb-5 pb-5 border-bottom border-secondary border-opacity-25 history-section delay-2">

          <div className="text-center mb-5">

            <h3
              className="fw-bold mb-3"
              style={{
                color: 'var(--primary-dark)',
                letterSpacing: '1px',
                fontFamily: 'serif'
              }}
            >
              GARIS WAKTU KEPEMIMPINAN
            </h3>

          </div>


          <div
            className="d-flex overflow-auto pb-4 pt-2 position-relative timeline-scroll"
            style={{
              scrollbarWidth: 'thin'
            }}
          >

            {/* GARIS TIMELINE */}

            <div
              className="position-absolute bg-secondary opacity-25 timeline-line"
              style={{
                height: '2px',
                width: '100%',
                top: '15px',
                left: '0'
              }}
            >
            </div>


            {[
              {
                year: "Masa Silam",
                event: "Pengembara singgah di hutan Jonggol."
              },
              {
                year: "19.. - 19..",
                event: "Masa kepemimpinan Wiro Supartono."
              },
              {
                year: "19.. - 19..",
                event: "Masa kepemimpinan Kusnudin."
              },
              {
                year: "2001 - 2007",
                event: "Masa kepemimpinan Djaenal."
              },
              {
                year: "2007 - 2019",
                event: "Masa kepemimpinan Suparno (2 Periode)."
              },
              {
                year: "2019 - Skrg",
                event: "Masa kepemimpinan Gatot Madiyo."
              }
            ].map((item, i) => (

              <div
                key={i}
                className="position-relative text-center px-3 timeline-item"
                style={{
                  minWidth: '200px',
                  flex: '1'
                }}
              >

                {/* DOT */}

                <div
                  className="position-relative z-1 mb-3 d-flex justify-content-center"
                  style={{
                    marginTop: '8px'
                  }}
                >

                  <div
                    className="bg-white border border-dark rounded-circle d-flex align-items-center justify-content-center timeline-dot"
                    style={{
                      width: '16px',
                      height: '16px'
                    }}
                  >

                    <div
                      className="bg-dark rounded-circle"
                      style={{
                        width: '6px',
                        height: '6px'
                      }}
                    >
                    </div>

                  </div>

                </div>


                {/* YEAR */}

                <h5
                  className="fw-bold mb-2 timeline-year"
                  style={{
                    color: 'var(--accent)',
                    fontFamily: 'serif'
                  }}
                >
                  {item.year}
                </h5>


                {/* EVENT */}

                <p
                  className="text-muted small mb-0 mx-auto"
                  style={{
                    maxWidth: '160px'
                  }}
                >
                  {item.event}
                </p>

              </div>

            ))}

          </div>

        </div>


        {/* ===================================================
            SECTION 3: TOKOH & KEPALA DESA
        =================================================== */}

        <div className="mb-5 history-section delay-3">

          <div className="text-center mb-5">

            <h3
              className="fw-bold mb-3"
              style={{
                color: 'var(--primary-dark)',
                letterSpacing: '1px',
                fontFamily: 'serif'
              }}
            >
              TOKOH & KEPALA DESA
            </h3>

          </div>


          <div className="row g-4 justify-content-center">

            {[
              {
                name: "Wiro Supartono",
                role: "19.. - 19.."
              },
              {
                name: "Kusnudin",
                role: "19.. - 19.."
              },
              {
                name: "Djaenal",
                role: "2001 - 2007"
              },
              {
                name: "Suparno",
                role: "2007 - 2019"
              },
              {
                name: "Gatot Madiyo",
                role: "2019 - Sekarang",
                current: true
              }
            ].map((tokoh, i) => (

              <div
                className="col-6 col-md-4 col-lg-2 person-card"
                key={i}
              >

                <div className="text-center">


                  {/* FOTO TOKOH */}

                  <div
                    className="border border-secondary border-opacity-50 p-1 mb-3 mx-auto person-image"
                    style={{
                      width: '130px',
                      height: '160px',
                      backgroundColor: '#f8fafc'
                    }}
                  >

                    <div
                      className="w-100 h-100 d-flex align-items-center justify-content-center border"
                      style={{
                        borderColor: '#e2e8f0',
                        backgroundColor: '#e9ecef'
                      }}
                    >

                      <Users
                        size={32}
                        className="text-muted opacity-25"
                      />

                    </div>

                  </div>


                  {/* NAMA */}

                  <h6
                    className="fw-bold mb-1 person-name"
                    style={{
                      color: 'var(--text-main)',
                      fontSize: '1rem',
                      fontFamily: 'serif'
                    }}
                  >
                    {tokoh.name}
                  </h6>


                  {/* PERIODE */}

                  <p
                    className={`mb-0 small person-role ${
                      tokoh.current
                        ? 'text-primary fw-bold'
                        : 'text-muted'
                    }`}
                    style={{
                      fontSize: '0.85rem'
                    }}
                  >
                    {tokoh.role}
                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>


      </div>

    </main>
  );
}