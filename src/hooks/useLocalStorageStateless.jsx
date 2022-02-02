import React, { useState } from 'react'


/**
 * @function useLocalStorageStateless
 * @description React Hook to handle counter, increment and decrement
 * @returns {Array:Function} : [counter, increment, decrement]
 * @author Sarat Chandra Ejjapureddi
 */
function useLocalStorageStateless(key) {

    const getValue = () => {
        return localStorage.getItem(key)
    };

    const setValue = (value) => {
        localStorage.setItem(key, value);
    };
    return [getValue, setValue]
}

export default useLocalStorageStateless