import React, { useState } from 'react';

import Address from '@/components/Address/Address';
import AddressBook from '@/components/AddressBook/AddressBook';
import Radio from '@/components/Radio/Radio';
import Section from '@/components/Section/Section';
import useAddressBook from '@/hooks/useAddressBook';

import styles from './App.module.css';
import { Address as AddressType } from './types';
import Form from '@/components/Form/Form';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import { generateId } from './utils/generateId';
import useFormFields from '@/hooks/useFormFields';
import ClearButton from '@/components/ClearButton/ClearButton';

interface formState {
  postCode: string;
  houseNumber: string;
  firstName: string;
  lastName: string;
  selectedAddress: string;
}

function App() {
  const { handleFieldChange, fields, reset } = useFormFields<formState>({
    firstName: '',
    houseNumber: '',
    lastName: '',
    postCode: '',
    selectedAddress: ''
  });

  /**
   * Results states
   */
  const [error, setError] = React.useState<undefined | string>(undefined);
  const [addresses, setAddresses] = React.useState<AddressType[]>([]);
  const [isFetchingAddress, setIsFetchingAddress] = useState(false);
  /**
   * Redux actions
   */
  const { addAddress } = useAddressBook();

  const handleAddressSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setAddresses([]);
    setIsFetchingAddress(true);
    const formData = new FormData(e.target);
    const postCode = formData.get('postCode') as string;
    const houseNumber = formData.get('houseNumber') as string;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/getAddresses?postcode=${postCode}&streetnumber=${houseNumber}`
    );
    let data: Result<AddressType[]> = await response.json();

    if (data.status === 'error') {
      setError(data.errormessage);
      setAddresses([]);
      setIsFetchingAddress(false);
      return;
    }

    data.details = data.details.map((x) => ({ ...x, houseNumber, id: generateId() }));
    setAddresses(data.details);
    setIsFetchingAddress(false);
  };

  const handlePersonSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;

    if (!firstName || !lastName) {
      setError('First name and last name fields mandatory!');
      return;
    }

    if (!fields.selectedAddress || !addresses.length) {
      setError("No address selected, try to select an address or find one if you haven't");
      return;
    }

    const foundAddress = addresses.find((address) => address.id === fields.selectedAddress);

    if (!foundAddress) {
      setError('Selected address not found');
      return;
    }

    addAddress({ ...foundAddress, firstName, lastName });
  };

  const handleClearState = () => {
    reset();
    setAddresses([]);
  };

  return (
    <main>
      <Section>
        <h1>
          Create your own address book!
          <br />
          <small>Enter an address by postcode add personal info and done! 👏</small>
        </h1>
        <Form
          handleChange={handleFieldChange}
          formEntries={[
            { name: 'postCode', placeholder: 'Postal Code', value: fields.postCode },
            { name: 'houseNumber', placeholder: 'House Number', value: fields.houseNumber }
          ]}
          label="Find an address"
          loading={isFetchingAddress}
          submitText="Submit"
          onFormSubmit={handleAddressSubmit}
        />
        {addresses.length > 0 &&
          addresses.map((address) => {
            return (
              <Radio name="selectedAddress" id={address.id} key={address.id} onChange={handleFieldChange}>
                <Address {...address} />
              </Radio>
            );
          })}
        {fields.selectedAddress && (
          <>
            <Form
              handleChange={handleFieldChange}
              formEntries={[
                { name: 'firstName', placeholder: 'First name', value: fields.firstName },
                { name: 'lastName', placeholder: 'Last name', value: fields.lastName }
              ]}
              label="✏️ Add personal info to address"
              loading={false}
              submitText="Submit"
              onFormSubmit={handlePersonSubmit}
            />
          </>
        )}

        {error && (
          <div className="error">
            <ErrorMessage error={error} />
          </div>
        )}

        <ClearButton clearFields={handleClearState} />
      </Section>

      <Section variant="dark">
        <AddressBook />
      </Section>
    </main>
  );
}

export default App;
