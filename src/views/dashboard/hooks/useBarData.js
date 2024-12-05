import React from 'react';
import useResource from './useResource';

export default function useBarData({ } = {}) {
    return useResource('barData');
}
