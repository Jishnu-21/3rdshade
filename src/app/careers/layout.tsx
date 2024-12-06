export const metadata = {
  title: "3rdshade",
  description: "Join our team at 3rd Shade Digital Agency",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
