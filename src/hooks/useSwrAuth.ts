import useSWR from 'swr';
import { useAxiosAuth } from './useAxiosAuth';
import { AxiosInstance } from 'axios';

export function useSwrAuth<T>(path: string, axiosInstance?: AxiosInstance) {
    const useAxios = useAxiosAuth();
    const fetcher = (url: string) => (axiosInstance ?? useAxios).get(url).then((res) => res.data);
    return useSWR<T>(path, fetcher);
}
