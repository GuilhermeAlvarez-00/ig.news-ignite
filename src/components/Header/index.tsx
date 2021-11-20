import Link from 'next/link'
import { SignInButton } from '../SignInButton'
import styles from './styles.module.scss'

export function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <img src="/images/logo.svg" alt="Logo ignews" />
        <nav>
          <Link href="/">
            <a className={styles.active}>Home</a>
          </Link>
          <Link href="/" prefetch>
            <a>Posts</a>
          </Link>
        </nav>
        
        <SignInButton />
      </div>
    </header>
  )
}