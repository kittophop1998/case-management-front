import CardPageWrapper from "@/components/common/card-page-warpper";
import { Typography } from "@/components/common/typography";
import { SearchSection } from "./_components/search-section";
import { getItems } from '@/lib/getItems';


export default async function CostomerSearchPage({
    params,
    searchParams
}: Readonly<{
    params: Promise<{ lang: 'en' | 'th' }>,
    searchParams: { q?: string }
}>
) {
    const { lang } = await params
    const query = typeof searchParams.q === 'string' ? searchParams.q : ''
    // const items = await getItems(query);
    return (
        <CardPageWrapper className="my-6">
            <Typography variant="h3" className="text-center">
                Search Customer ID/AEON ID
            </Typography>
            <SearchSection query={query} lang={lang} />
        </CardPageWrapper>
    );
}
