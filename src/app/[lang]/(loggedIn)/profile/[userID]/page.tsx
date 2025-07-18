export default async function UserProfile ({
  params
}: Readonly<{
  params: Promise<{ lang: 'en' | 'th' }>
}>) {
  const { lang } = await params

  return (
    <div className='text-white'>
      <h1>UserProfile - Language: {lang}</h1>
    </div>
  )
}
