import getAd from "@/actions/get-ad";
import FormattedMarkdown from "@/components/formatted-markdown";
import ImageCarousel from "@/components/image-carousel";
import Info from "@/components/info";
import Container from "@/components/ui/container";
import "./styles.css"
// import axios from "axios";


type AdPageProps = {
    params: {
        adId: string;
    }
}

export default async function AdPage({ params }: AdPageProps) {
    const accessRevalidate = 10; // 10 seconds
    const fipeRevalidate = 86400 * 15; // 15 days
    const ad = await getAd(params.adId);
    
    try {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL!}/anuncios/${params.adId}/access`, { method: "PUT", next : { revalidate: accessRevalidate } });
        // await axios.put(`${process.env.NEXT_PUBLIC_API_URL!}/anuncios/${params.adId}/access`, "", { next: { revalidate: 3600 } });
    } catch (error) {
        console.log(error);
    }

    let fipePrice = -1;
    if (ad.yearId) {
        const fipePriceResponse = await fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${ad.brand?.id}/modelos/${ad.model?.id}/anos/${ad.year?.id}`, { method: "GET", next : { revalidate: fipeRevalidate } });
        const fipePriceData = await fipePriceResponse.json();
        fipePrice = fipePriceData.Valor;
    }

    return (
        <div className="relative pt-72 md:pt-96">
            <div className="absolute top-0 w-full">
                <div className="flex justify-center w-full">
                    <ImageCarousel data={ad} />
                </div>
                <div className="hidden lg:block gradient-blur top-0 translate-y-36 h-[500px]">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                {/* <Gallery images={ad.images}/> */}
            </div>
            <Container>
                <div>
                    <div className="backdrop-blur-xl bg-white/80 dark:bg-black/80 rounded-xl shadow-lg border">
                        <div className="p-6">
                            <Info data={ad} fipePrice={fipePrice}/>
                            <div className="mt-5 md:px-3">
                                <FormattedMarkdown markdown={ad.description} />
                            </div>
                        </div>
                    </div>
                    <hr className="my-10" />
                    {/* <ProductList title="Produtos relacionados" items={suggestedProducts} /> */}
                </div> 
            </Container>
        </div>
    )
}