'use client';
import { useState } from 'react';
import Link from 'next/link';

interface Tool {
  name: string;
  href: string;
  description: string;
  icon: string;
}

export default function HomeToolGrid({ tools }: { tools: Tool[] }) {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1.5rem',
        marginBottom: '3rem',
      }}
    >
      {tools.map((tool) => (
        <Link
          key={tool.href}
          href={tool.href}
          style={{
            display: 'block',
            padding: '1.5rem',
            backgroundColor: 'var(--color-bg-card)',
            border: hoveredSlug === tool.href ? '2px solid var(--color-brand)' : '2px solid var(--color-border)',
            borderRadius: 'var(--radius-lg, 0.75rem)',
            boxShadow: hoveredSlug === tool.href ? 'var(--shadow-lg)' : 'var(--shadow-card)',
            textDecoration: 'none',
            transform: hoveredSlug === tool.href ? 'translateY(-2px)' : 'translateY(0)',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={() => setHoveredSlug(tool.href)}
          onMouseLeave={() => setHoveredSlug(null)}
        >
          <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{tool.icon}</div>
          <h2
            style={{
              fontSize: '1.25rem',
              fontWeight: 700,
              color: hoveredSlug === tool.href ? 'var(--color-brand)' : 'var(--color-text-primary)',
              marginBottom: '0.5rem',
              transition: 'color 0.2s ease',
            }}
          >
            {tool.name}
          </h2>
          <p
            style={{
              color: 'var(--color-text-secondary)',
              fontSize: '0.9375rem',
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            {tool.description}
          </p>
          <span
            style={{
              display: 'inline-block',
              marginTop: '0.75rem',
              color: 'var(--color-brand)',
              fontWeight: 600,
              fontSize: '0.875rem',
            }}
          >
            Use Calculator →
          </span>
        </Link>
      ))}
    </div>
  );
}
