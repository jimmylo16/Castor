import { render, screen } from "@testing-library/react";
import { TableHead } from "./TableHead";

describe("TaskForm", () => {
  it("renders correctly on Edition", () => {
    render(
      <TableHead
        numSelected={0}
        order={"asc"}
        orderBy={""}
        onSelectAllClick={() => console.log("first")}
        onRequestSort={() => console.log("first")}
        rowCount={2}
      />
    );

    const headerTitle = screen.getByTestId(`table-header-title`);
    expect(headerTitle).toBeInTheDocument();
    const headerDescription = screen.getByTestId(`table-header-description`);
    expect(headerDescription).toBeInTheDocument();
    const headerStatus = screen.getByTestId(`table-header-status`);
    expect(headerStatus).toBeInTheDocument();
  });
});
