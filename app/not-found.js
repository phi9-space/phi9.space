import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden'
    }}>
      <img
        src="/PHI9.SPACE.svg"
        alt="PHI9 Background"
        style={{
          maxWidth: '100%',
          maxHeight: '80%',
          objectFit: 'contain'
        }}
      />
      <p style={{
        marginTop: '2rem',
        fontSize: '1.125rem',
        fontFamily: 'Montserrat, sans-serif',
        color: 'var(--color-primary)',
        textAlign: 'center'
      }}>
        Read our manifesto <Link href="/manifesto" style={{
          color: 'var(--color-accent)',
          textDecoration: 'underline'
        }}>here</Link>.
      </p>
    </div>
  )
}
