export default async function Profiles ({
  params
}: Readonly<{
  params: Promise<{ lang: 'en' | 'th' }>
}>) {
  const { lang } = await params

  return (
    <div className='text-white'>
      <h1>Profiles - Language: {lang}</h1>
    </div>
  )
}
