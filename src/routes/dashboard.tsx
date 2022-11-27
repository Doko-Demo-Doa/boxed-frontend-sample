import {
  Container,
  Loader,
  Pagination,
  Space,
  Table,
  Title,
} from "@mantine/core";
import { useSearchParams } from "react-router-dom";

import MasterLayout from "./_master-layout";
import useRemoteData from "../hooks/use-remote-data";

const TOTAL = 200;
const PER_PAGE = 10;

const DashboardRoute = () => {
  let [searchParams, setSearchParams] = useSearchParams();

  const pageParsed = parseInt(searchParams.get("page") || "0") || 1;

  const { data, isLoading } = useRemoteData({
    data_type: "todos",
    page: pageParsed,
  });

  if (isLoading) {
    return <Loader />;
  }

  if (!data) {
    return <Title>Empty Data</Title>;
  }

  const rows = data.map((element) => (
    <tr key={element.id}>
      <td>{element.id}</td>
      <td>{element.title}</td>
      <td>{element.completed}</td>
    </tr>
  ));

  return (
    <MasterLayout>
      <Container>
        <Title>Boxed data sample</Title>
        <Pagination
          total={TOTAL / PER_PAGE}
          page={pageParsed}
          onChange={(v) => setSearchParams({ page: v.toString() })}
          siblings={1}
          initialPage={1}
          position="right"
        />
        <Space h="lg" />

        <Table highlightOnHover striped verticalSpacing="lg">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Completed</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>

        <Space h="lg" />

        <Pagination
          total={TOTAL / PER_PAGE}
          page={pageParsed}
          onChange={(v) => setSearchParams({ page: v.toString() })}
          siblings={1}
          initialPage={1}
          position="right"
        />
      </Container>
    </MasterLayout>
  );
};

export default DashboardRoute;
