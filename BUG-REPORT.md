## Bug: 1 Completing a task changes its priority

### Expected behavior
Completing a task should mark the task as `done` and set
`completedAt`. The existing priority should remain unchanged.

### Actual behavior
When `completeTask()` is called, the task's priority is
always changed to `medium`.

For example, a task with:

- status: `todo`
- priority: `high`

becomes:

- status: `done`
- priority: `medium`

### How I discovered it
I wrote a unit test that created a high-priority task, completed it,
and verified that its priority remained unchanged. The test failed
because the returned task had priority `medium`.

### Possible fix
I Removed the explicit `priority: 'medium'` assignment from
`completeTask()`, allowing the existing priority to be preserved.




<br>
<br>



## Bug: 2 Already Complete (Done) Task Marked Accepting

### Expected behavior
Already `completed` should not be accepted again

### Actual behavior
When `completeTask()` is called, the task's status has marked
`done` is also accepting by `APIS`

For example, a task with:

- status: `done`


becomes:

- status: `done`


### How I discovered it
I hit particular `route` of API 

```
http://localhost:3000/tasks/a7745104-2679-49c3-9108-9be596bba382/complete

```

And `Recevied`

```json
{
  "id": "a7745104-2679-49c3-9108-9be596bba382",
  "title": "Karan okok",
  "description": "nothing",
  "status": "done",
  "priority": "medium",
  "dueDate": "",
  "completedAt": "2026-09-29T11:02:43.480Z",
  "createdAt": "2026-09-29T03:48:00.036Z"
}

```


### Possible fix
I have added one more thing in existing Logic

```js
 if(task.status==='done'){
    return 'Already marked done'
  }

```

## Thank You


