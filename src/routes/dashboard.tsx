import {
  Box,
  Checkbox,
  Code,
  Container,
  Loader,
  Pagination,
  Space,
  Table,
  Title,
} from "@mantine/core";
import { Prism } from "@mantine/prism";
import { useSearchParams } from "react-router-dom";
import { uniqBy } from "rambdax";
import { useListState } from "@mantine/hooks";

import MasterLayout from "./_master-layout";
import useRemoteData from "../hooks/use-remote-data";

const TOTAL = 200;
const PER_PAGE = 10;

/**
 * If the component grows big, we can just bring the whole table into another component
 * then expose a callback for row selection (to show Prism code highlighting)
 */
const DashboardRoute = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const [values, handlers] = useListState<DataMold>([]);
  const codeTexts = values.map((n) => JSON.stringify(n)).join("\n");
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

  const rows = data.map((element, idx) => (
    <tr key={element.id}>
      <td>{element.id}</td>
      <td>{element.title}</td>
      <td>
        <Checkbox
          defaultChecked={false}
          onChange={(e) => {
            onSelect(element, e.currentTarget.checked);
          }}
        />
      </td>
    </tr>
  ));

  function onSelect(item: DataMold, isRemove: boolean) {
    let newList: Array<DataMold> = [];
    if (isRemove) {
      newList = uniqBy((n) => n.id, [...values, item]);
    } else {
      newList = values.filter((n) => n.id !== item.id);
    }
    handlers.setState(newList);
  }

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
              <th></th>
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

        <Space h="md" />

        {codeTexts.length > 0 && (
          <Box
            sx={(theme) => ({ border: `1px solid ${theme.colors.dark[3]}` })}
          >
            <Prism language="json" color="teal" withLineNumbers>
              {codeTexts}
            </Prism>
          </Box>
        )}
      </Container>
    </MasterLayout>
  );
};

export default DashboardRoute;
