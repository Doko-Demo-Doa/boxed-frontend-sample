import { useQuery, UseQueryOptions } from "@tanstack/react-query";

interface ParamsType {
  page: number;
  data_type: string;
}

const TOTAL = 200;
const PER_PAGE = 10;

function useRemoteData(params: ParamsType, options?: UseQueryOptions<{}>) {
  return useQuery(
    [params.data_type, params.page],
    async (context) => {
      try {
        const resp: DataMold[] = await fetch(
          `https://jsonplaceholder.typicode.com/${params.data_type}`
        ).then((res) => res.json());

        let p = (params.page - 1) * PER_PAGE;
        let pSize = (params.page || 1) * PER_PAGE;

        if (params.page <= 1) {
          p = 0;
          pSize = PER_PAGE;
        }
        let trimmed = resp.slice(p, pSize);
        return trimmed;
      } catch (error) {
        return [] as Array<DataMold>;
      }
    },
    {
      keepPreviousData: true,
    }
  );
}

export default useRemoteData;
