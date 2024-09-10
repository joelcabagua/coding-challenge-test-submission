import { Address } from '@/types';
import { useState } from 'react';

const useFetchAddresses = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<undefined | string>(undefined);

  const fetchAddresses = async (postCode: string, houseNumber: string) => {
    setError(undefined);
    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/getAddresses?postcode=${postCode}&streetnumber=${houseNumber}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch addresses');
      }

      const data = await response.json();
      const transformedAddresses = data.map((address: Address) => ({
        ...address,
        houseNumber
      }));
      debugger;
      return transformedAddresses;
    } catch (error) {
      setError('Error fetching addresses');
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, fetchAddresses };
};

export default useFetchAddresses;
