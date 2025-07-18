export default async function DashboardPage ({
  params
}: Readonly<{
  params: Promise<{ lang: 'en' | 'th' }>
}>) {
  const { lang } = await params

  return (
    <div className='text-white'>
      <h1>Dashboard - Language: {lang}</h1>
    </div>
  )
}
