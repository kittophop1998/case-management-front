import sleep from "@/lib/utils/sleep";

export default async function ItemsDelay({ time = 2000 }: { time?: number }) {
    await sleep(time);
    return (
        <div>
            {[1, 2, 3, 4].map((item) => (
                <div className="p-3 border-b text-black bg-green-500" key={item}>Item {item}</div>
            ))}
        </div>
    );
}
