import { render, screen } from "@testing-library/react";
import { TaskForm } from "./TaskForm";

describe("TaskForm", () => {
  it("renders correctly on Edition", () => {
    const handleOnAddTask = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
    };

    render(<TaskForm onSubmitTask={handleOnAddTask} taskId={"taskId"} />);

    const taskForm = screen.getByTestId(`task-form`);
    expect(taskForm).toBeInTheDocument();

    const taskHeader = screen.getByTestId(`task-form-header`);
    expect(taskHeader).toBeInTheDocument();
    expect(taskHeader).toHaveTextContent("Edit Task");

    const titleInput = screen.getByTestId(`task-form-title`);
    expect(titleInput).toBeInTheDocument();

    const descriptionInput = screen.getByTestId(`task-form-description`);
    expect(descriptionInput).toBeInTheDocument();

    const statusInput = screen.getByTestId(`task-form-status`);
    expect(statusInput).toBeInTheDocument();

    const submitButton = screen.getByTestId(`task-form-submit`);
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toHaveTextContent("Edit");
  });
});
