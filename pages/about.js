import React from 'react'
import styled from 'styled-components'
import colors from '../styles/colors'
import MainLayout from '../layouts/mainLayout'
import Head from 'next/head'

export default () => {
    return(
        <MainLayout>
            <Head>
                <title>about coding-bear || coding-bear.co.uk</title>
            </Head>
        </MainLayout>
    )
}