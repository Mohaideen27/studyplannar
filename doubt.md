- **Question 1:** "In a database object, **is it mandatory** to assign the `id` as the first key-value pair?"
- **Question 2:** "How does the backend API **extract the `id`** from this request: `const res = await axios.patch(`API/subjects/{id}`, subject);`?"
- **Question 3:** "How does this **Axios URL syntax** work?"

Let's go through your three questions one by one with simple JavaScript and backend API examples.

## Question 1: Is it mandatory to assign `id` as the first key-value pair in a database object?

**No! It is not mandatory to put `id` as the first key-value pair in a JavaScript object.**

For example, both objects are valid:

**Example 1: `id` as the first property**

```javascript
const subject = {
  id: 1,
  name: "Mathematics",
  credits: 4,
};
```

**Example 2: `id` as the last property**

```javascript
const subject = {
  name: "Mathematics",
  credits: 4,
  id: 1,
};
```

Both objects work correctly.

You can access the `id` property in either object using:

```javascript
console.log(subject.id);
```

Output:

```text
1
```

### Why does the order not matter?

JavaScript objects store data as key-value pairs. You access a property using its key, not its position.

For example:

```javascript
const subject = {
  name: "Mathematics",
  credits: 4,
  id: 1,
};

console.log(subject.id); // 1
console.log(subject.name); // Mathematics
console.log(subject.credits); // 4
```

**Important:** Some database systems automatically generate an ID when you insert a record. Others require you to provide one, depending on the database schema and configuration.

So, remember:

- The `id` does not have to be the first property.
- The `id` must be available if your application needs it to identify a particular record.
- Whether you must supply the `id` yourself depends on your database and backend implementation.

---

## Question 2: How does the backend API extract the `id` from this request?

You provided this code:

```javascript
const res = await axios.patch(`API/subjects/{id}`, subject);
```

There is an important detail here!

**In a JavaScript template literal, `{id}` does not automatically get replaced with the ID.**

To insert a variable's value into a URL, you must use `${id}`.

### Step 1: Understand the correct Axios syntax

Suppose you have this object:

```javascript
const subject = {
  id: 5,
  name: "Mathematics",
  credits: 4,
};
```

You can extract the ID into a variable:

```javascript
const id = subject.id;
```

Now, send the request like this:

```javascript
const res = await axios.patch(`API/subjects/${id}`, subject);
```

The resulting URL becomes:

```text
API/subjects/5
```

Here is what each part means:

| Code                       | Meaning                                            |
| -------------------------- | -------------------------------------------------- |
| `axios.patch()`            | Sends an HTTP PATCH request.                       |
| `` `API/subjects/${id}` `` | Creates a URL containing the ID.                   |
| `subject`                  | Sends the subject object as the request body.      |
| `res`                      | Stores the server's response.                      |
| `await`                    | Waits for the request to finish before continuing. |

### Step 2: How does the backend get the ID?

Imagine your backend uses **Node.js with Express**.

You define a route like this:

```javascript
app.patch("/API/subjects/:id", (req, res) => {
  const id = req.params.id;

  console.log(id);

  res.send("Subject updated successfully");
});
```

Let's break this down.

**1. The frontend sends the request:**

```javascript
const id = 5;

const subject = {
  name: "Mathematics",
  credits: 4,
};

const res = await axios.patch(`/API/subjects/${id}`, subject);
```

The request contains:

- **URL:** `/API/subjects/5`
- **Request body:** `{ name: "Mathematics", credits: 4 }`

**2. The backend route receives the request:**

```javascript
app.patch("/API/subjects/:id", (req, res) => {
```

The `:id` part tells Express that this section of the URL is a route parameter.

When the URL is `/API/subjects/5`, Express matches `5` to the `:id` parameter.

**3. The backend extracts the ID:**

```javascript
const id = req.params.id;
```

Express provides route parameters through `req.params`.

Therefore:

```javascript
req.params.id; // "5"
```

Notice that the value is usually a **string**, not a number.

If you need a number, you can convert it:

```javascript
const id = Number(req.params.id);
```

Now `id` is the number `5`.

### Step 3: How does the backend get the remaining subject data?

The second argument to `axios.patch()` is the request body:

```javascript
axios.patch(`/API/subjects/${id}`, subject);
```

The `subject` object is sent in the body of the request.

With Express, you can access it using `req.body`, provided JSON body parsing middleware is configured:

```javascript
app.use(express.json());

app.patch("/API/subjects/:id", (req, res) => {
  const id = Number(req.params.id);
  const subjectData = req.body;

  console.log(id);
  console.log(subjectData);

  res.json({
    message: "Subject updated successfully",
    id: id,
    subject: subjectData,
  });
});
```

For the request above, the backend receives:

**ID from the URL:**

```javascript
req.params.id;
// "5"
```

**Subject data from the request body:**

```javascript
req.body;
// {
//     name: "Mathematics",
//     credits: 4
// }
```

The backend can then use the ID to find the correct database record and update it with the submitted data.

For example, with a database operation, the logic might look like this:

```javascript
const id = Number(req.params.id);
const subjectData = req.body;

// Find the subject with this ID and update its fields.
```

The actual database update depends on which database and backend framework you use.

### What if the object already contains an `id`?

Suppose you send:

```javascript
const subject = {
  id: 5,
  name: "Mathematics",
  credits: 4,
};

const res = await axios.patch(`/API/subjects/${subject.id}`, subject);
```

The ID is present in **two places**:

1. In the URL: `/API/subjects/5`
2. In the request body: `subject.id`, which is `5`

However, the backend does not automatically extract the URL ID from the request body or vice versa.

They are separate sources of data:

- `req.params.id` gets the ID from the URL.
- `req.body.id` gets the ID from the body, if the body contains an `id` property.

Usually, the backend uses the URL ID to identify the record being updated. It should validate the request body rather than blindly trusting it.

**Key takeaway:** The backend extracts the ID from the URL using `req.params.id` in Express, while the remaining submitted data is available through `req.body`.

---

## Question 3: How does this Axios URL syntax work?

Let's examine the original code:

```javascript
const res = await axios.patch(`API/subjects/{id}`, subject);
```

There are three concepts to understand: template literals, Axios, and HTTP PATCH requests.

### 1. How do template literals work?

JavaScript provides two common ways to create strings.

**Using ordinary quotes:**

```javascript
const id = 5;

const url = "API/subjects/" + id;

console.log(url);
```

Output:

```text
API/subjects/5
```

**Using template literals:**

Template literals use backticks (`` ` ``) instead of ordinary quotes.

```javascript
const id = 5;

const url = `API/subjects/${id}`;

console.log(url);
```

Output:

```text
API/subjects/5
```

The syntax `${id}` inserts the value of the `id` variable into the string.

Compare these examples:

```javascript
const id = 5;

console.log(`API/subjects/{id}`);
console.log(`API/subjects/${id}`);
```

Output:

```text
API/subjects/{id}
API/subjects/5
```

The first string contains the literal characters `{id}`.

The second string inserts the variable's value.

**Remember:**

- `{id}` → literal text inside a template literal.
- `${id}` → inserts the value of the variable.

### 2. How does `axios.patch()` work?

Consider this example:

```javascript
const id = 5;

const subject = {
  name: "Mathematics",
  credits: 4,
};

const res = await axios.patch(`/API/subjects/${id}`, subject);
```

The general syntax is:

```javascript
axios.patch(url, data);
```

| Argument | Purpose                                                |
| -------- | ------------------------------------------------------ |
| `url`    | Specifies which backend endpoint receives the request. |
| `data`   | Contains the data sent in the request body.            |

In our example:

```javascript
`/API/subjects/${id}`;
```

becomes:

```text
/API/subjects/5
```

And:

```javascript
subject;
```

contains:

```json
{
  "name": "Mathematics",
  "credits": 4
}
```

Conceptually, the HTTP request looks like this:

```http
PATCH /API/subjects/5
Content-Type: application/json

{
  "name": "Mathematics",
  "credits": 4
}
```

This illustrates the request's URL and body; Axios handles the actual HTTP communication.

### 3. What does PATCH mean?

The HTTP `PATCH` method is used to apply partial modifications to a resource.

For example, suppose your database contains this subject:

```json
{
  "id": 5,
  "name": "Mathematics",
  "credits": 4,
  "department": "Science"
}
```

You want to change its name.

You send:

```javascript
const id = 5;

const subject = {
  name: "Advanced Mathematics",
};

await axios.patch(`/API/subjects/${id}`, subject);
```

The backend identifies the subject with ID `5` and updates its name.

The resulting record might be:

```json
{
  "id": 5,
  "name": "Advanced Mathematics",
  "credits": 4,
  "department": "Science"
}
```

The other fields remain unchanged if your backend implements partial updates that way.

**Important:** PATCH does not automatically update your database. Your backend must implement the appropriate update logic.

### 4. What is the difference between PATCH and PUT?

| Method   | Typical purpose                          | Example                         |
| -------- | ---------------------------------------- | ------------------------------- |
| `GET`    | Retrieve data                            | Get the subject with ID `5`.    |
| `POST`   | Create a resource                        | Add a new subject.              |
| `PUT`    | Replace a resource or its representation | Replace the subject's data.     |
| `PATCH`  | Modify part of a resource                | Change the subject's name.      |
| `DELETE` | Delete a resource                        | Remove the subject with ID `5`. |

The exact behavior depends on the API implementation, but these are the conventional uses.

---

## Final summary

Let's put all three questions together.

Suppose your frontend contains:

```javascript
const subject = {
  id: 5,
  name: "Mathematics",
  credits: 4,
};

const res = await axios.patch(`/API/subjects/${subject.id}`, subject);
```

Your backend contains:

```javascript
app.use(express.json());

app.patch("/API/subjects/:id", (req, res) => {
  const id = Number(req.params.id);
  const subjectData = req.body;

  console.log("ID:", id);
  console.log("Subject:", subjectData);

  res.json({
    message: "Subject received",
    id,
    subject: subjectData,
  });
});
```

Here is the complete flow:

1. **The frontend object** stores the subject's data. The `id` can appear anywhere in the object.
2. **`${subject.id}`** inserts the ID into the URL.
3. **Axios** sends a PATCH request to `/API/subjects/5`.
4. **Express** matches the URL against `/API/subjects/:id`.
5. **`req.params.id`** retrieves the ID from the URL.
6. **`req.body`** retrieves the subject data sent by Axios.
7. **The backend** can use the ID to locate the correct database record and update it.

### The three most important things to remember

- **Object:** The position of `id` does not matter.
- **URL:** Use `${id}` to insert a variable into a JavaScript template literal.
- **Backend:** In Express, use `req.params.id` to retrieve the ID from a route parameter and `req.body` to retrieve the request body.

One final detail: if your frontend and backend run on different origins or the API uses a configured base URL, the exact URL may need to include that base URL or use a relative path appropriate to your application's configuration.
