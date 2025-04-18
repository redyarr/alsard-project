import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
 

export default function NotFound() {
  const {t} = useTranslation();


    return (
      <>
        <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
          <div className="text-center">
            <p className="text-xl font-semibold ">404</p>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-red-600 sm:text-5xl">{t('home.notFound')}</h1>
            <p className="mt-6 text-base leading-7 text-gray-600">{t('home.notFoundMessage')}.</p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <NavLink
               to="/"
                className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {t('home.backToHome')}
              </NavLink>
            </div>
          </div>
        </main>
      </>
    )
  }
  