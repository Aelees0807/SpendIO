import React from 'react';

const Footer = () => {
  return (
    <div className="footer fade-in" style={{
      textAlign: 'center',
      padding: '1rem',
      marginTop: 'auto',
      color: 'var(--text-muted)',
      fontSize: '0.9rem',
      borderTop: '1px solid var(--border)',
      background: 'var(--bg-card)'
    }}>
      <p>Designed & Built by <a href="https://www.linkedin.com/in/aelees-bhuva" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', fontWeight: '500', textDecoration: 'none' }}>Aelees Bhuva</a></p>
    </div>
  );
};

export default Footer;
