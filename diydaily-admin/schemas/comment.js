export default {
    name: "comment",
    type: "document",
    title: "Comment",
    fields: [
      {
        name: "name",
        type: "string",
      },
      {
        title: "Approved",
        name: "approved",
        type: "boolean",
        description: "If approved, comment will be live",
      },
      {
        name: "email",
        type: "string",
      },
      {
        name: "comment",
        type: "text",
      },
      {
        name: "post",
        type: "reference",
        to: [{ type: "post" }],
      },
    ],
  };
  