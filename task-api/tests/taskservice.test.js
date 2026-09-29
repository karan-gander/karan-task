const { test, describe, expect } = require("@jest/globals");
// import { test, expect,describe } from "@jest/globals";
const { create, completeTask, assign } = require("../src/services/taskService");
const {
  validateCreateTask,
  validateUpdateTask,
} = require("../src/utils/validators");

describe("Tasks", () => {
 



  test("should reject empty priority on create", () => {
    const error = validateCreateTask({
      title: "Karan",
      status: "todo",
      priority: " ",
    });

    expect(error).toBe("priority must be one of: low, medium, high");
  });

  test("should reject empty status on create", () => {
    const error = validateCreateTask({
      title: "Karan",
      status: " ",
    });

    expect(error).toBe("status must be one of: todo, in_progress, done");
  });

  test("should reject empty priority on update", () => {
    const error = validateUpdateTask({
      title: "Karan",
      status: "todo",
      priority: " ",
    });

    expect(error).toBe("priority must be one of: low, medium, high");
  });

  test("should reject empty status on update", () => {
    const error = validateUpdateTask({
      title: "Karan",
      status: " ",
    });

    expect(error).toBe("status must be one of: todo, in_progress, done");
  });

test("should return message if task is already marked done", () => {
  const task = create({
    title: "Karan",
    status: "done",
    priority: "high",
  });

  const result = completeTask(task.id);

  expect(result).toBe("Already marked done");
});

  test("should not change priority when completing a task", () => {
    const task = create({
      title: "Karan",
      status: "todo",
      priority: "high",
    });

    const result = completeTask(task.id);

    expect(result.status).toBe("done");
    expect(result.priority).toBe(task.priority);
  });
  test("assign task test", () => {
    const task = create({
      title: "Karan",
      status: "todo",
      priority: "high",
    });
    // body
    const result = assign({
      id: task.id,
      body: {
        assignee: "Bob",
      },
    });

    expect(result.assignee).toBe("Bob");
  });
  test("should reject empty assignee", () => {
  const task = create({
    title: "Karan",
    status: "todo",
    priority: "high",
  });

  const result = assign({
    id: task.id,
    body: {
      assignee: "   ",
    },
  });

  expect(result).toBe("assinee can not be empty string or undedined");
});
test("should return error when task does not exist", () => {
  const result = assign({
    id: "invalid-id",
    body: {
      assignee: "Bob",
    },
  });

  expect(result).toBe("task does not exist");
});
});
