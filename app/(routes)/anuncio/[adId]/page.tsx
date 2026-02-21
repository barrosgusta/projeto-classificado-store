import { notFound } from "next/navigation"
import getListing from "@/actions/get-listing"
import { registerAccess } from "@/actions/register-access"
import { getFipePrice } from "@/actions/get-fipe-price"
import FormattedMarkdown from "@/components/formatted-markdown"
import ImageCarousel from "@/components/image-carousel"
import Info from "@/components/info"
import Container from "@/components/ui/container"
import "./styles.css"

type AdPageProps = {
  params: Promise<{
    adId: string
  }>
}

export default async function AdPage({ params }: AdPageProps) {
  const { adId } = await params
  const ad = await getListing(adId)

  if (!ad) notFound()

  await registerAccess(adId)

  let fipePrice: string | null = null
  if (ad.yearId && ad.brand?.id && ad.model?.id && ad.year?.id) {
    fipePrice = await getFipePrice(ad.brand.id, ad.model.id, ad.year.id)
  }

  return (
    <div className="relative pt-72 md:pt-96">
      <div className="absolute top-0 w-full">
        <div className="flex justify-center w-full">
          <ImageCarousel data={ad} />
        </div>
        <div
          className="hidden lg:block absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{
            height: "50%",
            background: "linear-gradient(to top, var(--background) 30%, transparent 100%)"
          }}
        />
      </div>
      <Container>
        <div>
          <div className="info-card-enter backdrop-blur-xl bg-card/80 rounded-2xl shadow-sm border border-border/50">
            <div className="p-6">
              <Info data={ad} fipePrice={fipePrice} />
              <div className="mt-5 md:px-3">
                <FormattedMarkdown markdown={ad.description} />
              </div>
            </div>
          </div>
          <hr className="my-10" />
        </div>
      </Container>
    </div>
  )
}
