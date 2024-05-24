import AlbumHeader from "@/components/AlbumHeader";

export default async function AlbumPage({
    params,
}: {
    params: { id: string };
}) {
    const { id } = params;
    // wait for the data to be fetched

    return (
        <div className="py-2 bg-primary flex-grow overflow-hidden hover:overflow-y-auto">
            <AlbumHeader id={id} />
        </div>
    );
}
