import React, {FC, memo, useEffect, useLayoutEffect, useRef} from 'react'
import {
  NavIdProps,
  Panel,
  PanelHeader,
  Spacing,
  useAdaptivityWithJSMediaQueries,
} from '@vkontakte/vkui'
import { CartCountIsland, Filters, Products, TechInfo } from '../../../components/Shop'
import { useAppDispatch, useAppSelector } from '../../../store'
import {
  fetchFilteredProducts,
  selectShoppingCatalog,
  setShoppingCatalogScrollPosition,
} from '../../../store/shoppingCatalog.reducer'
import { imageIntersectionObserver, findImage } from '../../../utils'
import {fetchShop, selectFilters, selectShopName} from '../../../store/shop.reducer'
import { ITEMS, SECTIONS } from './techConfig'

import './ShoppingCatalog.css'
import {selectOnWelcomeComplete} from "../../../store/user.reducer";
import {useRouteNavigator} from "@vkontakte/vk-mini-apps-router";

const MOBILE_LIMIT = 12
const DESKTOP_LIMIT = 40
const IMAGE_LOADING_OPTIONS = {
  findImage,
  delay: 150,
  attributeName: 'data-src',
}

export const ShoppingCatalog: FC<NavIdProps> = memo((props: NavIdProps) => {
  const dispatch = useAppDispatch()

  const shoppingCatalog = useAppSelector(selectShoppingCatalog)
  const filters = useAppSelector(selectFilters)
  const shopName = useAppSelector(selectShopName)

  const { isDesktop } = useAdaptivityWithJSMediaQueries()
  const limit = isDesktop ? DESKTOP_LIMIT : MOBILE_LIMIT

  const scrollPosition = useRef(0)
  const isSavedContent = useRef(shoppingCatalog.products.length > 0)
  const observer = useRef<IntersectionObserver | null>(null)
  const lastLoadItemIndex = useRef(shoppingCatalog.products.length || limit)
  const $storeContainer = useRef<HTMLDivElement>(null)

  const onWelcomeComplete = useAppSelector(selectOnWelcomeComplete)
  const routeNavigator = useRouteNavigator()
  const onHandleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    scrollPosition.current = e.currentTarget.scrollTop
  }

  /** Запрос на получение контента магазина */
  useEffect(() => {

    dispatch(fetchShop())

  }, [dispatch])

  /** При изменени фильтров делаем запрос на получение данных и создаем observer для загрузки изображений */
  useLayoutEffect(() => {
    const fetchProducts = (start: number, end: number) => {
      dispatch(fetchFilteredProducts({ start, end, filters }))
    }

    const onEntryCallback = (
      observer: IntersectionObserver,
      entry: IntersectionObserverEntry
    ) => {
      if (entry.isIntersecting || entry.intersectionRatio > 0) {
        const isLast = entry.target.getAttribute('data-last')
        if (isLast === '1') {
          fetchProducts(lastLoadItemIndex.current, lastLoadItemIndex.current + limit)
          lastLoadItemIndex.current += limit
          entry.target.removeAttribute('data-last')
        }
      }
      if (entry.target.classList.contains('ProductCard__active')) {
        observer?.unobserve(entry.target)
      }
    }

    scrollPosition.current = 0
    observer.current?.disconnect()

    observer.current = imageIntersectionObserver(
      {
        root: $storeContainer.current,
        rootMargin: '0px 0px 150px 0px',
        callback: onEntryCallback,
      },
      IMAGE_LOADING_OPTIONS
    )

    if (!isSavedContent.current) fetchProducts(0, limit)
    isSavedContent.current = false

    return () => {
      dispatch(setShoppingCatalogScrollPosition(scrollPosition.current))
    }
  }, [filters, limit, dispatch])

  /** Восстановление скролла */
  useLayoutEffect(() => {
    if (!$storeContainer.current) return
    $storeContainer.current.scrollTop = shoppingCatalog.scrollPosition
    scrollPosition.current = shoppingCatalog.scrollPosition
  }, [shoppingCatalog.scrollPosition, limit])

  /** Начинаем следить за новыми загруженными элементами */
  useLayoutEffect(() => {
    lastLoadItemIndex.current = shoppingCatalog.products.length || limit
    document
      .querySelectorAll('.ProductCard')
      .forEach(el => observer.current?.observe(el))
  }, [shoppingCatalog.products, limit])

  /** Открытие модалки при первом заходе в shop */
  useEffect(() => {
    //dispatch(setOnWelcomeComplete(false))
    if (!onWelcomeComplete) void routeNavigator.showModal('welcome')
  }, [onWelcomeComplete, routeNavigator])


  return (
    <Panel className="Panel__fullScreen" {...props}>
      {!isDesktop && (
        <>
          <PanelHeader separator={false}>{shopName}</PanelHeader>
          <Filters />
        </>
      )}
      <div ref={$storeContainer} className={'ShoppingCatalog'} onScroll={onHandleScroll}>

        <Products products={shoppingCatalog.products} fetching={shoppingCatalog.isStoreFetching} />

        {isDesktop && (
          <div className="Sidebar">
            <Spacing size={1} />
            <CartCountIsland />
            <Filters />
            <TechInfo sections={SECTIONS} items={ITEMS} />
          </div>
        )}
      </div>
    </Panel>
  )
})

ShoppingCatalog.displayName = 'ShoppingCatalog'
