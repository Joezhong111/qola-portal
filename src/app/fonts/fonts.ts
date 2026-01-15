import localFont from 'next/font/local'

export const montserrat = localFont({
  src: [
    {
      path: './montserrat/Montserrat-Thin-10.otf',
      weight: '100',
      style: 'normal',
    },
    {
      path: './montserrat/Montserrat-ExtraLight-5.otf',
      weight: '200',
      style: 'normal',
    },
    {
      path: './montserrat/Montserrat-Light-6.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: './montserrat/Montserrat-Regular-8.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './montserrat/Montserrat-Medium-7.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './montserrat/Montserrat-SemiBold-9.otf',
      weight: '600',
      style: 'normal',
    },
    {
      path: './montserrat/Montserrat-Bold-3.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: './montserrat/Montserrat-ExtraBold-4.otf',
      weight: '800',
      style: 'normal',
    },
    {
      path: './montserrat/Montserrat-Black-2.otf',
      weight: '900',
      style: 'normal',
    },
    {
      path: './montserrat/Montserrat-Italic.ttf',
      weight: '400',
      style: 'italic',
    },
    {
      path: './montserrat/Montserrat-Bold-Italic.ttf',
      weight: '700',
      style: 'italic',
    },
    {
      path: './montserrat/Montserrat-BlackItalic.ttf',
      weight: '900',
      style: 'italic',
    },
  ],
  display: 'swap',
  variable: '--font-montserrat',
})
