import Pagination from "../Components/Features/Pagination";
import {
  render,
  fireEvents,
  screen,
  waitFor,
  container,
  fireEvent,
} from "@testing-library/react";
import "@testing-library/jest-dom";

jest.setTimeout(50000);

//Checking if buttons are rendered and the count of the buttons are correct
describe("Checking if Pages button are rendered and count is correctly evaluated", () => {
  test("if Pagination is rendering", async () => {
    const { container } = render(<Pagination count={45} />);
    await waitFor(
      () => {
        const mockPaginationTrue = container.innerHTML.includes("1");
        const mockPaginationFalse = container.innerHTML.includes("6");
        expect(mockPaginationTrue).toBe(true);
        expect(mockPaginationFalse).toBe(false);
      },
      { timeout: 30000 }
    );
  });
});

//Checking if clicking on a pagination button reloads the page and thereby makes an API call

const setLoadingMocked = jest.fn();
describe("checking if Buttons are working as expected", () => {
  test("if Pagination button is firing pageNavigator", async () => {
    const { container } = render(
      <Pagination count={82} setLoading={setLoadingMocked} />
    );
    const PageButton = screen.getByText("9");

    fireEvent.click(PageButton, { target: { value: 9 } });
    await waitFor(
      () => {
        const newScreen = container.innerHTML.includes("loader");

        expect(newScreen).toBe(true);
      },
      { timeout: 30000 }
    );
  });
});

//Checking if pagination API call throws the error
jest.spyOn(window, "alert").mockImplementation(() => {});
describe("checking if wrong API call throws popup error", () => {
  test("should throw an error popup", async () => {
    const { container } = render(
      <Pagination count={92} setLoading={setLoadingMocked} />
    );
    const PageButton = screen.getByText("10");

    fireEvent.click(PageButton, { target: { value: 10 } });
    await waitFor(
      () => {
        expect(window.alert).toHaveBeenCalled();
      },
      { timeout: 30000 }
    );
  });
});
