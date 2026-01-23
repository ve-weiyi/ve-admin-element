import { defineMock } from "./base";

export default defineMock([
  {
    url: "/admin-api/v1/upload/upload_file",
    method: ["POST"],
    body: {
      code: 200,
      data: {
        file_path: "/uploads/2024/01",
        file_name: "example.jpg",
        file_type: "image/jpeg",
        file_size: 102400,
        file_url: "https://example.com/uploads/2024/01/example.jpg",
        updated_at: 1640000000,
      },
      msg: "上传成功",
    },
  },
  {
    url: "/admin-api/v1/upload/multi_upload_file",
    method: ["POST"],
    body: {
      code: 200,
      data: [
        {
          file_path: "/uploads/2024/01",
          file_name: "file1.jpg",
          file_type: "image/jpeg",
          file_size: 102400,
          file_url: "https://example.com/uploads/2024/01/file1.jpg",
          updated_at: 1640000000,
        },
        {
          file_path: "/uploads/2024/01",
          file_name: "file2.png",
          file_type: "image/png",
          file_size: 204800,
          file_url: "https://example.com/uploads/2024/01/file2.png",
          updated_at: 1640000000,
        },
      ],
      msg: "上传成功",
    },
  },
  {
    url: "/admin-api/v1/upload/list_upload_file",
    method: ["POST"],
    body: {
      code: 200,
      data: {
        list: [
          {
            file_path: "/uploads/2024/01",
            file_name: "example.jpg",
            file_type: "image/jpeg",
            file_size: 102400,
            file_url: "https://example.com/uploads/2024/01/example.jpg",
            updated_at: 1640000000,
          },
        ],
        total: 1,
        page: 1,
        page_size: 10,
      },
      msg: "一切ok",
    },
  },
  {
    url: "/admin-api/v1/upload/deletes_upload_file",
    method: ["DELETE"],
    body: {
      code: 200,
      data: {
        success_count: 1,
      },
      msg: "删除成功",
    },
  },
]);
