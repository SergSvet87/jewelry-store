import { ColHeart } from '../../assets';
import { Card, CardContent } from '../../components/Card';
import { collections } from '../../mock/collections';

export const Collections = () => {
  return (
    <section className="relative w-full h-[918px] mb-[var(--section-indent)]">
      <div className="max-w-[1440px] mx-auto relative h-full">
        <h2 className="text-center">
          Наші неповторні колекції
        </h2>

        <Card className="absolute w-[650px] h-[790px] top-32 left-[60px] overflow-hidden rounded-none">
          <img className="w-full h-full object-cover" src={ColHeart} alt="Heart Image" />

          <CardContent className="w-full min-h-[60px] absolute bottom-[22px] left-0 ">
            <h1 className="text-[var(--main)] text-center">
              HEART
            </h1>
          </CardContent>
        </Card>

        {collections.map((collection) => {
          const id = collection.id;
          return (
            <Card
              key={collection.id}
              className='absolute w-[315px] h-[385px] bg-cover bg-[50%_50%] rounded-none overflow-hidden'
              style={{
                top: collection?.position.top,
                left: collection?.position.left,
              }}
            >
              <img className="absolute w-full h-full object-cover" src={collection?.image.link} alt={collection.name} />

              <CardContent className="w-full min-h-[60px] absolute bottom-[22px] left-0">
                <h1
                  className="text-[var(--main)] text-center"
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
                </h1>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  )
}
