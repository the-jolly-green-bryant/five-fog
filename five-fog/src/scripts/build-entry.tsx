import React from 'react'
import {renderToString} from 'react-dom/server'
import App from '../App'

export const render = (url: string, data: unknown) => {

    const html = renderToString(
        <App initialUrl={url} initialData={data}/>
    )

    return {
        html
    }
}
