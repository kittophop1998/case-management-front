export default async function UserLayout ({
  children,
  params
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ lang: 'en' | 'th' }>
}>) {
  const { lang } = await params
  return <div>{children}</div>
}
