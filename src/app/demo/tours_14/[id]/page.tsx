import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

const url = "https://www.course-api.com/react-tours-project";

type Tour = {
    id: string;
    name: string;
    info: string;
    image: string;
    price: string;
};

const fetchTour = async (id: string): Promise<Tour | undefined> => {
    const response = await fetch(url, { cache: "no-store" });

    if (!response.ok) {
        throw new Error("Failed to fetch tour details");
    }

    const tours: Tour[] = await response.json();
    return tours.find((tour) => tour.id === id);
};

const TourDetailPage_14 = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const tour = await fetchTour(id);

    if (!tour) {
        notFound();
    }

    return (
        <section className="mx-auto max-w-4xl space-y-6">
            <Link href="/tours_14" className="inline-block text-blue-500 hover:underline">
                Back to tours
            </Link>

            <div className="grid gap-6 md:grid-cols-2 md:items-start">
                <div className="relative min-h-80 overflow-hidden rounded-lg">
                    <Image
                        src={tour.image}
                        alt={tour.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                    />
                </div>

                <div className="space-y-4">
                    <h1 className="text-3xl font-bold">{tour.name}</h1>
                    <p className="text-xl font-semibold text-green-600">${tour.price}</p>
                    <p className="leading-7 text-gray-700">{tour.info}</p>
                </div>
            </div>
        </section>
    );
};

export default TourDetailPage_14;