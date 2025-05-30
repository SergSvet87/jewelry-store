import { create } from 'zustand';

import { ICertificateItem } from '../types/';
import { certificates } from '@/mock/certificates';

interface CertificateState {
  certificates: ICertificateItem[];
  loading: boolean;
  error: string | null;

  setCertificates: (certificates: ICertificateItem[]) => void;
  getCertificateById: (id: number) => ICertificateItem | undefined,
}

export const useCertificateStore = create<CertificateState>((set, get) => ({
  certificates: certificates,
  loading: false,
  error: null,

  setCertificates: (certificates) => set((state) => {
    const isSame =
      state.certificates.length === certificates.length &&
      state.certificates.every((c, i) => c.id === certificates[i].id);

      return isSame ? {} : { certificates };
  }),

  getCertificateById: (id) => get().certificates.find((item) => item.id === id),
}))