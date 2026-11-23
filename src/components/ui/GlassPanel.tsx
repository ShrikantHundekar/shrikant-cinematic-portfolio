import { HTMLAttributes, PropsWithChildren } from 'react'

export function GlassPanel({ children, className = '', ...props }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  return (
    <div className={`glass-panel ${className}`} {...props}>
      {children}
    </div>
  )
}
