import { signIn, useSession } from 'next-auth/client'
import styles from './styles.module.scss'

interface SubscribeButtonProps {
  priceId: string;
}

export function SubscribeButton({priceId}: SubscribeButtonProps) {
  const [session] = useSession()

  function handleSubscribe() {
    if(!session) {
      signIn()
      return
    }
  }

  return (
    <button
      type="button"
      className={styles.subcribeButton}
    >
      Subscribe now
    </button>
  )
}
