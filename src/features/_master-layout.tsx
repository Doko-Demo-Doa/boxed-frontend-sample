import React from "react";
import { AppShell, Navbar, Header } from "@mantine/core";

interface Props {
  children?: React.ReactNode;
}

const MasterLayout: React.FC<Props> = ({ children }) => {
  return (
    <AppShell
      padding="md"
      header={
        <Header height={60} p="xs">
          {""}
        </Header>
      }
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      {children}
    </AppShell>
  );
};

export default MasterLayout;
