import { useState, useRef } from 'react'
import { portfolio } from '@/data/portfolio'

export function ContactForm() {
  const [copied, setCopied] = useState<'email' | 'phone' | null>(null)
  const timeoutRef = useRef<number | null>(null)

  const copy = async (kind: 'email' | 'phone') => {
    const value = kind === 'email' ? portfolio.person.email : portfolio.person.phone
    try {
      await navigator.clipboard.writeText(value)
      setCopied(kind)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      timeoutRef.current = window.setTimeout(() => setCopied(null), 2500)
    } catch (e) {
      setCopied(null)
    }
  }

  const copyEmail = () => copy('email')
  const copyPhone = () => copy('phone')

  return (
    <form aria-label="Contact options – copy an email address or phone number">
      <div className="contact-email-group">
        <input readOnly className="contact-email" value={portfolio.person.email} aria-readonly="true" />
        <button type="button" className="copy-email-button" onClick={copyEmail} aria-label={copied === 'email' ? 'Email copied' : 'Copy email address'}>
          {copied === 'email' ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <div className="contact-phone-group">
        <input readOnly className="contact-phone" value={portfolio.person.phone} aria-readonly="true" />
        <button type="button" className="copy-email-button" onClick={copyPhone} aria-label={copied === 'phone' ? 'Phone copied' : 'Copy phone number'}>
          {copied === 'phone' ? 'Copied!' : 'Copy'}
        </button>
      </div>
    </form>
  )
}