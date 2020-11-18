import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { useContext, useEffect, useState } from 'react'
import { ProdType } from '../../graphql/query.gen'
import { Button } from '../../style/button'
import { Input } from '../../style/input'
import { UserContext } from '../auth/user'
import { AppRouteParams } from '../nav/route'
import { toastErr } from '../toast/toast'
import { Page } from './Page'
import { createNewListing } from './queries/mutateAuctionBid'

interface NewListingPageProps extends RouteComponentProps, AppRouteParams {}

export function NewListingPage(props: NewListingPageProps) {
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [prodType, setProdType] = useState('')
  const [auctionTime, setAuctionTime] = useState('')
  const [err, setError] = useState({ title: false, price: false, description: false, prodType: false, auctionTime: false })
  const { user } = useContext(UserContext)

  // reset error when price change
  useEffect(() => setError({ ...err, price: false }), [price])
  useEffect(() => setError({ ...err, prodType: !validateProdType(prodType) }), [prodType])
  useEffect(() => setError({ ...err, auctionTime: false }), [auctionTime])

  function getProdType(prodType: string) {
    switch(prodType) {
      case 'bearwear':
        return ProdType.BEARWEAR
      case 'dormsupply':
        return ProdType.DORMSUPPLY
      case 'textbooks':
        return ProdType.TEXTBOOKS
      case 'electronics':
        return ProdType.ELECTRONICS
      default:
        return ProdType.OTHER
    }
  }

  function makeAListing() {
    if (!validate(title, price, description, prodType, auctionTime, setError)) {
      toastErr('invalid field')
      return
    }

    if(!user) {
      return
    }
    else {
      const sellerId = user.id
      const productType = getProdType(prodType)
      const auctionTimeConverted = Number(auctionTime) * 3600
      createNewListing(title, Number(price), description, productType, sellerId, auctionTimeConverted)
    }
  }

  return (
    <>
      <Page>
        <div className="mt3">
          <label className="db fw4 lh-copy f6" htmlFor="title">
            Title
          </label>
          <Input $hasError={err.title} $onChange={setTitle} $onSubmit={makeAListing} name="title" type="title" />
        </div>
        <div className="mt3">
          <label className="db fw4 lh-copy f6" htmlFor="price">
            Price
          </label>
          <Input $hasError={err.price} $onChange={setPrice} $onSubmit={makeAListing} name="price" />
        </div>
        <div className="mt3">
          <label className="db fw4 lh-copy f6" htmlFor="description">
            Description
          </label>
          <Input $hasError={err.description} $onChange={setDescription} $onSubmit={makeAListing} name="description" type="description" />
        </div>
        <div className="mt3">
          <label className="db fw4 lh-copy f6" htmlFor="prodType">
            Product Type (bearwear, dormsupply, textbooks, electronics, other)
          </label>
          <Input $hasError={err.prodType} $onChange={setProdType} $onSubmit={makeAListing} name="prodType" type="prodType" />
        </div>
        <div className="mt3">
          <label className="db fw4 lh-copy f6" htmlFor="auctionTime">
            Auction Time (in hours)
          </label>
          <Input $hasError={err.auctionTime} $onChange={setAuctionTime} $onSubmit={makeAListing} name="password" type="password" />
        </div>
        <div className="mt3">
          <Button onClick={makeAListing}>Create Listing</Button>
        </div>
      </Page>
    </>
  )
}

function validateProdType(prodType: string) {
  const re = /(bearwear|dormsupply|textbooks|electronics|other)\b/
  return re.test(String(prodType).toLowerCase())
}

function validate(
  title: string,
  price: string,
  description: string,
  prodType: string,
  auctionTime: string,
  setError: React.Dispatch<
    React.SetStateAction<{ title: boolean; price: boolean; description: boolean; prodType: boolean; auctionTime: boolean }>
  >
) {
  const validTitle = Boolean(title)
  const validPrice = Number(price)
  const validDescription = Boolean(description)
  const validProdType = validateProdType(prodType)
  const validAuctionTime = Number(auctionTime)
  console.log('valid', validPrice, validAuctionTime)
  setError({
    title: !validTitle,
    price: !validPrice,
    description: !validDescription,
    prodType: !validProdType,
    auctionTime: !validAuctionTime,
  })
  return validTitle && validPrice && validDescription && validProdType && validAuctionTime
}