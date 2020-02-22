import React from 'react'
import Footer from './Footer'
import Header from './Header'
import '../styles/layout.css'

export default function Layout({children}) {
    return (
        <div className="data">
            <div>
                <Header />
                {children}
            </div>
            <Footer />
        </div>
    )
}
