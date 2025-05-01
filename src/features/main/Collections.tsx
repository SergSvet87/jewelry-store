import { ColHeart } from '../../assets';
import { Card, CardContent } from '../../components/Card';
import { collections } from '../../mock/collections';

export const Collections = () => {
  return (
    <section className="relative w-full h-[918px] mb-40">
      <div className="max-w-[1440px] mx-auto relative h-full">
        <h2 className="font-heading-3 text-[54px] text-brown-dark text-center tracking-[var(--heading-3-letter-spacing)] leading-[var(--heading-3-line-height)] [font-style:var(--heading-3-font-style)] font-[number:var(--heading-3-font-weight)] left-[349px]">
          Наші неповторні колекції
        </h2>

        <Card className="absolute w-[650px] h-[790px] top-32 left-[60px] bg-main overflow-hidden rounded-none">
              <img className="absolute w-full h-full object-cover" src={ColHeart} alt="Heart Image" />

          <CardContent className="w-full h-full p-0">
            <div className="w-[649px] h-[790px] relative bg-cover bg-[50%_50%] left-px">
              <div className="absolute h-[104px] top-[666px] left-[182px] font-HEADING-1 font-[number:var(--HEADING-1-font-weight)] text-main text-[length:var(--HEADING-1-font-size)] tracking-[var(--HEADING-1-letter-spacing)] leading-[var(--HEADING-1-line-height)] whitespace-nowrap [font-style:var(--HEADING-1-font-style)]">
                HEART
              </div>
            </div>
          </CardContent>
        </Card>

        {collections.map((collection) => {
          const id = collection.id;
          return (
            <Card
              key={collection.id}
              className={`absolute w-[315px] h-[385px] bg-cover bg-[50%_50%] rounded-none overflow-hidden`}
              style={{
                top: collection?.position.top,
                left: collection?.position.left,
              }}
            >
              <img className="absolute w-full h-full object-cover" src={collection?.image.link} alt={collection.name} />

              <CardContent className="w-full h-full p-0 relative">
                <div
                  className="absolute h-[68px] top-[296px] left-[67px] font-HEADING-2 font-[number:var(--HEADING-2-font-weight)] text-main text-[length:var(--HEADING-2-font-size)] tracking-[var(--HEADING-2-letter-spacing)] leading-[var(--HEADING-2-line-height)] [font-style:var(--HEADING-2-font-style)]"
                  style={{
                    left:
                      id === "glow"
                        ? "74px"
                        : id === "moon"
                          ? "70px"
                          : id === "spark"
                            ? "67px"
                            : id === "ocean"
                              ? "63px"
                              : "67px",
                  }}
                >
                  {collection?.name}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  )
}
