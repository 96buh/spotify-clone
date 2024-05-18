import { RoundCardsSkeleton } from "@/components/Skeletons";

export default function SearchPage() {
    return (
        <div className="px-2 py-2 bg-primary flex-grow overflow-hidden hover:overflow-y-auto">
            <RoundCardsSkeleton />
        </div>
    );
}
