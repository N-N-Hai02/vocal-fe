"use client"
import './globals.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import { DataProvider } from '@/context/dataContext'
import { UserProvider } from '@/context/UserContext'
import AppHeader from '@/component/app.header'
import SubMenu from '@/component/app.subMenu'
import AppFooter from '@/component/app.footer'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AuthGoogleProviders from '@/component/ManageAuthGoogle/Providers'


export default function RootLayout({
   children,
}: {
   children: React.ReactNode
}) {
   return (
      <html lang="en">
         <head>
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" />
         </head>
         <body>
            <AuthGoogleProviders>
               <UserProvider>
                  <DataProvider>
                     <AppHeader />
                     <div id='childrenContent' className='container'>
                        {children}
                        <div className='vh-100'></div>
                     </div>
                     <SubMenu />
                     <ToastContainer
                        position="bottom-right"
                        className="mb-5"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                     />
                     <AppFooter />
                  </DataProvider>
               </UserProvider>
            </AuthGoogleProviders>
         </body>
      </html>
   )
}
