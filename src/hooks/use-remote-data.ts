import { useQuery, UseQueryOptions } from "@tanstack/react-query";

interface ParamsType {
  page: number;
  data_type: string;
}

function useRemoteData(params: ParamsType, options?: UseQueryOptions<{}>) {
  return useQuery([params.data_type], async (context) => {
    return fetch(
      `https://jsonplaceholder.typicode.com/${params.data_type}`
    ).then((res) => res.json());
  });
}

export default useRemoteData;
