'use client';

import { useState } from 'react';

export interface Tab {
  title: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
}

export default function Tabs({ tabs }: TabsProps) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="w-100">
      <ul className="nav mb-4 gap-4 border-bottom border-secondary border-opacity-25 d-flex flex-nowrap overflow-auto" style={{ scrollbarWidth: 'none', paddingBottom: '0px' }}>
        {tabs.map((tab, idx) => (
          <li className="nav-item" key={idx}>
            <button
              className={`nav-link fw-bold px-3 py-3 border-0 transition-none text-nowrap rounded-0`}
              onClick={() => setActiveTab(idx)}
              style={{
                backgroundColor: 'transparent',
                color: activeTab === idx ? 'var(--primary)' : '#64748b',
                borderBottom: activeTab === idx ? '3px solid var(--primary)' : '3px solid transparent',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}
            >
              {tab.title}
            </button>
          </li>
        ))}
      </ul>
      <div className="tab-content pt-3">
        {tabs.map((tab, idx) => (
          <div
            key={idx}
            className={`tab-pane fade ${activeTab === idx ? 'show active' : ''}`}
            style={{ 
              display: activeTab === idx ? 'block' : 'none',
              animation: 'none'
            }}
          >
            {tab.content}
          </div>
        ))}
      </div>
      <style jsx>{`
        .nav-link:hover:not(.active) {
          color: var(--primary) !important;
          border-bottom: 3px solid #cbd5e1 !important;
        }
      `}</style>
    </div>
  );
}
