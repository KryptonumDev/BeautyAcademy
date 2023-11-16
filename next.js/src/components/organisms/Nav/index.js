'use client';
import { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './styles.module.scss';
import { Logo, Sygn } from '@/components/atoms/Icons';
import { usePathname } from 'next/navigation';
import { AppContext } from 'src/context/app-context';
import { GET_CART } from 'src/queries/get-cart';
import { UPDATE_CART } from 'src/mutations/update-cart';
import { useQuery } from 'src/hooks/use-query';
import { useMutation } from 'src/hooks/use-mutation';
import Button from '@/components/atoms/Button';
import { links } from 'src/app/layout';

const Nav = () => {
  const pathname = usePathname();
  const [navOpened, setNavOpened] = useState(false);
  const [cartOpened, setCartOpened] = useState(false);
  const [cart, setCart] = useContext(AppContext)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    }
  }, []);

  const handleEscapeKey = (e) => {
    if (e.key === "Escape") {
      setNavOpened(false);
    }
  }

  const { revalidate, data } = useQuery(GET_CART, {
    variables: {},
    onCompleted: ({ body, status }) => {
      localStorage.setItem('woo-next-cart', JSON.stringify(body.data.cart))
      setCart(body.data.cart)
    },
    onError: (error) => {
      console.log(error.message)
    }
  })

  const { request: updateCart } = useMutation(UPDATE_CART, {
    onCompleted: ({ body }) => {
      // Update cart in the localStorage.
      localStorage.setItem('woo-next-cart', JSON.stringify(body.data.updateItemQuantities.cart));
      // Update cart data in React Context.

      setCart(body.data.updateItemQuantities.cart);
      setLoading(false)
    },
    onError: (error) => {
      setLoading(false)
      console.log(error.message);
    }
  });

  const handleRemoveProductClick = (event, key, products) => {
    event.stopPropagation();
    if (products.length) {
      setLoading(true)

      // By passing the newQty to 0 in updateCart Mutation, it will remove the item.
      const newQty = 0;
      const updatedItems = getUpdatedItems(products, newQty, key);
      // setInnerLoading(true)
      updateCart({
        variables: {
          input: {
            clientMutationId: v4(),
            items: updatedItems
          }
        },
      });
    }
  };

  return (
    <>
      <a href="#main" className={styles.skipToMainContent}>Перейти к основному содержанию</a>
      <header className={styles.wrapper} aria-expanded={navOpened} aria-controls={cartOpened}>
        <div className="max-width">
          <Link href='/' className={styles.logo} aria-label="Homepage">
            <Logo />
          </Link>
          <nav>
            <ul>
              {links.map(({ name, href }, i) => (
                <li key={i}>
                  <Link
                    href={href}
                    aria-current={pathname === href ? 'page' : false}
                    onClick={() => setNavOpened(false)}
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className={styles.actions}>
            <Link href='/dashboard' aria-label='Account'>
              <Icon.User />
            </Link>
            <button onClick={() => { setCartOpened(!cartOpened) }} aria-label='Basket'>
              <Icon.Basket />
            </button>
          </div>
          <button
            className={styles.mobileNavToggle}
            onClick={() => setNavOpened(!navOpened)}
            aria-label={`${navOpened ? 'Hide' : 'Show'} navigation`}
          >
            <span></span>
            <span></span>
          </button>
        </div>
        <div
          className={styles.overlay}
          aria-hidden="true"
          onClick={() => { setNavOpened(false); setCartOpened(false) }}
        />

        <div className={styles.cart}>
          <div className={styles.header}>
            <h3>Корзина</h3>
            <Button variant='secondary' onClick={() => { setCartOpened(false) }}>Закрыть</Button>
          </div>
          {cart?.contents?.nodes?.length > 0 ? (
            <>
              <div className="cart">
                {cart?.contents?.nodes.map(el => (
                  <CartItem products={cart?.contents?.nodes} remove={handleRemoveProductClick} data={el} />
                ))}
              </div>
              <div>
                <hr />
                <div className="info">
                  <Flex>
                    <p>Podsumowanie</p>
                    <p dangerouslySetInnerHTML={{ __html: cart.subtotal }}></p>
                  </Flex>
                  <p><small>Koszt wysyłki jest podliczany podczas płatności</small></p>
                </div>
                <Link onClick={() => { setCartOpened(false) }} href="/zamowienie">
                  Przejdź do zamówienia
                </Link>
              </div>
            </>
          ) : (
            <div className={styles.empty}>
              <Sygn />
              <h2>Ваша корзина пуста</h2>
              <Button onClick={() => { setCartOpened(false) }} href="/courses">
                Наши курсы
              </Button>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Nav;

const Icon = {
  "User": () => (
    <svg xmlns='http://www.w3.org/2000/svg' width='34' height='34' viewBox='0 0 34 34' fill='none'>
      <path
        stroke='#53423C'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='1.5'
        d='M7.025 29.375c0-5.695 4.617-10.313 10.313-10.313 5.695 0 10.312 4.618 10.312 10.313m-5.5-19.25a4.812 4.812 0 11-9.625 0 4.812 4.812 0 019.625 0z'
      ></path>
    </svg>
  ),
  "Basket": () => (
    <svg xmlns='http://www.w3.org/2000/svg' width='34' height='34' viewBox='0 0 34 34' fill='none'>
      <path
        stroke='#53423C'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='1.5'
        d='M27.588 10.125h-22v14.823c0 1.566 0 2.349.31 2.945.26.502.67.912 1.172 1.172.596.31 1.38.31 2.945.31H23.16c1.567 0 2.35 0 2.946-.31a2.75 2.75 0 001.172-1.172c.31-.596.31-1.38.31-2.945V10.125zm-4.852-5.5H10.44c-.437 0-.656 0-.855.061a1.375 1.375 0 00-.461.247c-.161.132-.283.314-.526.678l-3.01 4.514h22l-3.009-4.514c-.242-.364-.364-.546-.525-.678a1.376 1.376 0 00-.462-.247c-.198-.061-.417-.061-.855-.061zM11.088 14.25c1.986 4.965 9.014 4.965 11 0'
      ></path>
    </svg>
  )
}