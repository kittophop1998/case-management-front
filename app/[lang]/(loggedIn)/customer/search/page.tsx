import CardPageWrapper from "@/components/common/card-page-warpper";
import { Typography } from "@/components/common/typography";
import { SearchSection } from "./_components/search-section";

type PageProps = {
    params: { lang: 'en' | 'th' };
};
export default async function CustomerSearchPage({
    params
}: PageProps
) {
    const { lang } = await params
    return (
        <CardPageWrapper className="my-6">
            <Typography variant="h3" className="text-center">
                Search Customer ID/AEON ID
            </Typography>
            <SearchSection lang={lang} />
        </CardPageWrapper>
    );
}
