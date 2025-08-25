import CardPageWrapper from "@/components/common/card-page-warpper";
import { Typography } from "@/components/common/typography";
import { SearchSection } from "./_components/search-section";

type PageProps = {
    params: Promise<{ lang: 'en' | 'th' }>;
};
export default async function CustomerSearchPage({
    params
}: PageProps
) {
    const { lang } = await params
    return (
        <CardPageWrapper className="my-6">
            <Typography variant="h6" className="text-center mt-12">
                Search Customer ID/AEON ID
            </Typography>
            <SearchSection lang={lang} />
        </CardPageWrapper>
    );
}


