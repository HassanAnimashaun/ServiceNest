import React from 'react'

function UnauthorizedUser() {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.code}>401</div>
        <h1 style={styles.title}>Unauthorized</h1>
        <p style={styles.message}>You do not have permission to access this page.</p>
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#f8fafc',
    padding: '24px',
  },
  card: {
    textAlign: 'center',
    background: '#ffffff',
    borderRadius: '16px',
    padding: '40px 32px',
    boxShadow: '0 10px 30px rgba(15, 23, 42, 0.08)',
    maxWidth: '420px',
    width: '100%',
  },
  code: {
    fontSize: '64px',
    fontWeight: 800,
    color: '#ef4444',
    lineHeight: 1,
    marginBottom: '12px',
  },
  title: {
    fontSize: '28px',
    fontWeight: 700,
    color: '#0f172a',
    margin: '0 0 12px',
  },
  message: {
    fontSize: '16px',
    color: '#475569',
    margin: 0,
    lineHeight: 1.6,
  },
}

export default UnauthorizedUser
