import React, { useState, createContext } from 'react';

export const AppBarContext = createContext();

export const AppBarProvider = props => {

    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');

    return(
        <AppBarContext.Provider value={[name, setName,avatar, setAvatar]}>
            {props.children}
        </AppBarContext.Provider>
    );
}