import { AppSettingsContext } from '@/context/AppSettingsContext';
import { useContext } from 'react';

export const useAppSettings = () => useContext(AppSettingsContext);
