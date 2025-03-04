import { DELIVERY, PICKUP, PICKUP_IN_STORE } from '../constants'
import { setLocale } from 'enzyme-react-intl'

import BRA from '@vtex/address-form/lib/country/BRA'
import IntlPickupPoint from './PickupPoint'
import { Provider } from 'react-redux'
import { IntlProvider } from 'react-intl'
import messages from '../../messages/pt.json'
import React from 'react'
import { addValidation } from '@vtex/address-form'
import renderer from 'react-test-renderer'

setLocale('pt')

describe('PickupPoint', () => {
  let state, store, props, onClickPickupModalList, onClickPickupModal
  const address = {
    addressType: 'residential',
    receiverName: null,
    addressId: '10',
    postalCode: '22222222',
    city: 'Rio de janeiro',
    state: 'RJ',
    country: 'BRA',
    street: 'Av das Américas',
    number: '',
    neighborhood: 'Barra da Tijuca',
    complement: 'Loja Barra da Tijuca',
    reference: null,
    geoCoordinates: [],
    addressQuery: 'query',
  }

  beforeEach(() => {
    onClickPickupModalList = jest.fn()
    onClickPickupModal = jest.fn()

    state = {
      pickup: {
        pickupPointId: '1',
        activeSellerId: '1',
        pickupOptions: [
          {
            name: 'test',
            price: 100,
            shippingEstimate: '1bd',
            pickupStoreInfo: {
              friendlyName: 'test',
              address: {
                geoCoordinates: [123, 123],
              },
            },
            deliveryChannel: PICKUP_IN_STORE,
            id: '1',
          },
          {
            name: 'test',
            price: 100,
            shippingEstimate: '1bd',
            pickupStoreInfo: {
              friendlyName: 'test',
              address: {
                geoCoordinates: [123, 123],
              },
            },
            deliveryChannel: PICKUP_IN_STORE,
            id: '2',
          },
        ],
      },
      orderForm: {
        googleMapsKey: '1234',
        clientPreferencesData: {
          locale: 'pt-BR',
        },
        items: [{ seller: '1' }],
        activeTab: PICKUP,
        storePreferencesData: {
          countryCode: 'BRA',
          currencyCode: 'BRL',
          currencySymbol: 'R$',
          currencyFormatInfo: {
            currencyDecimalDigits: 2,
            currencyDecimalSeparator: ',',
            currencyGroupSeparator: '.',
            currencyGroupSize: 3,
            startsWithCurrencySymbol: true,
          },
        },
        shippingData: {
          address: addValidation({
            addressType: 'residential',
            receiverName: null,
            addressId: '10',
            postalCode: '22222222',
            city: 'Rio de janeiro',
            state: 'RJ',
            country: 'BRA',
            street: 'Av das Américas',
            number: '',
            neighborhood: 'Barra da Tijuca',
            complement: 'Loja Barra da Tijuca',
            reference: null,
            geoCoordinates: [],
            addressQuery: 'query',
          }),
          logisticsInfo: [
            {
              itemIndex: 0,
              deliveryChannels: [{ id: DELIVERY }],
              slas: [
                {
                  name: 'test',
                  price: 100,
                  shippingEstimate: '1bd',
                  deliveryChannel: PICKUP_IN_STORE,
                  id: '1',
                  pickupStoreInfo: {
                    friendlyName: 'test',
                    address,
                  },
                },
                {
                  name: 'test',
                  price: 0,
                  shippingEstimate: '1bd',
                  deliveryChannel: PICKUP_IN_STORE,
                  id: '2',
                  pickupStoreInfo: {
                    friendlyName: 'test',
                    address,
                  },
                },
              ],
            },
          ],
        },
      },
    }
    store = {
      subscribe: jest.fn(),
      dispatch: jest.fn(),
      getState: jest.fn(() => state),
    }

    props = {
      sellerId: '1',
      unavailableItemsAmount: 1,
      storePreferencesData: {
        countryCode: 'BRA',
        currencyCode: 'BRL',
        currencySymbol: 'R$',
        currencyFormatInfo: {
          currencyDecimalDigits: 2,
          currencyDecimalSeparator: ',',
          currencyGroupSeparator: '.',
          currencyGroupSize: 3,
          startsWithCurrencySymbol: true,
        },
      },
      pickupPointId: '1',
      pickupOptionGeolocations: [[123, 123], [123, 123]],
      googleMapsKey: '1234',
      address: addValidation({
        addressType: 'residential',
        receiverName: null,
        addressId: '10',
        postalCode: '22222222',
        city: 'Rio de janeiro',
        state: 'RJ',
        country: 'BRA',
        street: 'Av das Américas',
        number: '',
        neighborhood: 'Barra da Tijuca',
        complement: 'Loja Barra da Tijuca',
        reference: null,
        geoCoordinates: [],
        addressQuery: 'query',
      }),
      onClickPickupModalList,
      onClickPickupModal,
      pickupPoint: {
        name: 'test',
        price: 100,
        shippingEstimate: '1bd',
        deliveryChannel: PICKUP_IN_STORE,
        id: '1',
        pickupStoreInfo: {
          friendlyName: 'test',
          address: {
            addressId: '10',
            addressType: 'residential',
          },
          additionalInfo: 'test aditionalInfo',
        },
      },
      selectedRules: BRA,
    }
  })

  it('should render self and components', () => {
    const wrapper = renderer
      .create(
        <Provider store={store}>
          <IntlProvider
            locale="pt"
            messages={{ ...messages, ...{ 'country.BRA': 'Brazil' } }}>
            <IntlPickupPoint {...props} />
          </IntlProvider>
        </Provider>
      )
      .toJSON()
    expect(wrapper).toMatchSnapshot()
  })

  it('should render self and components in not modal mode', () => {
    props = {
      ...props,
      isModal: false,
    }
    const wrapper = renderer
      .create(
        <Provider store={store}>
          <IntlProvider
            locale="pt"
            messages={{ ...messages, ...{ 'country.BRA': 'Brazil' } }}>
            <IntlPickupPoint {...props} />
          </IntlProvider>
        </Provider>
      )
      .toJSON()
    expect(wrapper).toMatchSnapshot()
  })

  it('should render self and components with free price', () => {
    props = {
      ...props,
      pickupPointId: '2',
    }
    const wrapper = renderer
      .create(
        <Provider store={store}>
          <IntlProvider
            locale="pt"
            messages={{ ...messages, ...{ 'country.BRA': 'Brazil' } }}>
            <IntlPickupPoint {...props} />
          </IntlProvider>
        </Provider>
      )
      .toJSON()
    expect(wrapper).toMatchSnapshot()
  })
})
