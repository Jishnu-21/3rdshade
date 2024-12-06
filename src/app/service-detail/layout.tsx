export const metadata = {
  title: "3rdshade",
  description: "Digital services offered by 3rd Shade Agency",
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