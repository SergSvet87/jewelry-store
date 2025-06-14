import { useParams } from 'react-router-dom';

import { AppRoute } from '@/enums';
import { BreadCrumbs } from '@/components/BreadCrumbs';
import { useCertificateStore } from '@/store/useCertificateStore';
import { Info } from '@/features/certificate/Info';
import { SimilarCertificates } from '@/features/certificate/SimilarCertificates';

export const SingleCertificate = () => {
  const { id, title } = useParams();
  const getCertificateById = useCertificateStore((state) => state.getCertificateById);

  const certificate = getCertificateById(Number(id));

  return (
    <div className="mt-[100px]">
      <div className="container mx-auto py-10">
        <BreadCrumbs
          items={[
            { label: 'Головна', href: AppRoute.ROOT },
            { label: 'Подарункові сертифікати', href: AppRoute.CERTIFICATES },
            { label: `Сертифікат ${title} грн` },
          ]}
        />
      </div>

      <div className="container mx-auto section-indent">
        <div className="flex gap-20 mb-20 w-full justify-between">
          <div className="flex flex-col max-w-[650px] shrink-0 items-start gap-5">
            <img className="w-[650px] h-[690px]" alt={certificate?.name} src={certificate?.image} />
          </div>

          {certificate && <Info certificate={certificate} />}
        </div>

        <SimilarCertificates id={Number(id)} />
      </div>
    </div>
  );
};
