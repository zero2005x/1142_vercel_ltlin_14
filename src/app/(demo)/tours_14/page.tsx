import Link from "next/link";
import Image from "next/image";

export const dynamic = "force-dynamic";

const url = 'https://www.course-api.com/react-tours-project';

type Tour = {
    id: string;
    name: string;
    info: string;
    image: string;
    price: string;
}

const fetchTours = async (): Promise<Tour[]> => {
    const response = await fetch(url, { cache: 'no-store' });

    if (!response.ok) {
        throw new Error('Failed to fetch tours.');
    }

    return response.json();
}

const ToursPage = async () => {
    const tours = await fetchTours();

    return (
        <section>
            <h1 className="text-3xl mb-4">ToursPage_14</h1>
            <div className="grid md:grid-cols-2 gap-x-8">
                {tours.map((tour) => (
                    <div key={tour.id} className="border p-4 mb-4">
                        <Link href={`/tours_14/${tour.id}`} className="text-blue-500 hover:underline">
                            <div className="relative mb-2 h-48">
                                <Image
                                    src={tour.image}
                                    alt={tour.name}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width:1200px) 50vw, 33vw"
                                    priority
                                    className="object-cover rounded"
                                />
                            </div>
                        </Link>
                        <h2 className="text-xl mt-2">{tour.name}</h2>
                        <p className="text-gray-600">{tour.info}</p>
                        <p className="text-green-500 font-bold">{tour.price}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default ToursPage;