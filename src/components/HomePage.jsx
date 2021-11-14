import React from 'react'
import { SpotifyAuth } from 'react-spotify-auth';

export default function HomePage(props) {

    return (
        <div>
            <div className='spotify-auth'>
                <SpotifyAuth
                    redirectUri='http://localhost:3000/'
                    clientID='038949ed814c4c37b430b704b6562da5'
                    scopes={['user-read-private', 'user-read-email']} // either style will work
                    onAccessToken={(token) => props.setToken(token)}
                />
            </div>
        </div>
    )
}
