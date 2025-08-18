import { JsonJoinDetails } from "@/types/user.type";
function getTextByValueDropdown(
    value: string,
    list: JsonJoinDetails[]
): string | null {
    console.log('--------------')
    console.log(`list`, list)
    console.log(`value`, value)
    console.log('--------------')

    if (!list?.length) {
        return null
    }
    if (!value) {
        return null
    }
    const found = list.find((element) => element.id === value);
    return found?.name || null
}
export default getTextByValueDropdown;
