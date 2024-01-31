import { ClerkProvider } from '@clerk/nextjs'
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
            <title>Angel Trading Co.</title>
        </head>
        <body>{children}</body>
      </html>
    </ClerkProvider>
  )
}
