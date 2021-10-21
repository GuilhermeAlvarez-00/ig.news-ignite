import { AxiosPromise, AxiosRequestConfig } from 'axios'
import { signIn, useSession } from 'next-auth/client'
import { api } from '../../services/api'
import { getStripeJs } from '../../services/stripe-js'
import styles from './styles.module.scss'

interface SubscribeButtonProps {
  priceId: string;
}

interface PostProps {
  sessionId: string
}

export function SubscribeButton({priceId}: SubscribeButtonProps) {
  const [session] = useSession()

  async function handleSubscribe() {
    if(!session) {
      signIn()
      return
    }

    try {
      const response = await api.post<PostProps>('subscribe')

      let sessionId = null
      const { data } = response
      sessionId = data.sessionId
      console.log(sessionId)

      const stripe = await getStripeJs()

      await stripe.redirectToCheckout({
        sessionId
      })
    } catch(err) {
      alert(err.message)
    }
  }

  return (
    <button
      type="button"
      className={styles.subcribeButton}
      onClick={handleSubscribe}
    >
      Subscribe now
    </button>
  )
}
