export default async function UserProfile ({
  params
}: Readonly<{
  params: Promise<{ lang: 'en' | 'th'; userID: string }>
}>) {
  const { lang, userID } = await params
  return (
    <div>
      <h1>
        UserProfile - Language: {lang} userID {userID}
      </h1>
    </div>
  )
}
