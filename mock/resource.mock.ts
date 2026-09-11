import { defineMock } from "./base";

const baseTime = 1700000000000;

const ok = (data: unknown) => ({ code: 200, data, msg: "ok" });
const batch = (n = 1) => ok({ success_count: n });

/** 相册 */
const mockAlbums = [
  {
    id: 1,
    album_name: "旅行记录",
    album_desc: "出行随拍",
    album_cover: "",
    is_delete: 0,
    status: 1,
    created_at: baseTime,
    updated_at: baseTime,
    photo_count: 2,
  },
  {
    id: 2,
    album_name: "日常",
    album_desc: "生活点滴",
    album_cover: "",
    is_delete: 0,
    status: 1,
    created_at: baseTime,
    updated_at: baseTime,
    photo_count: 0,
  },
];

/** 相片 */
const mockPhotos = [
  {
    id: 1,
    album_id: 1,
    photo_name: "风景一",
    photo_desc: "模拟相片",
    photo_src: "",
    is_delete: 0,
    created_at: baseTime,
    updated_at: baseTime,
  },
  {
    id: 2,
    album_id: 1,
    photo_name: "风景二",
    photo_desc: "模拟相片",
    photo_src: "",
    is_delete: 0,
    created_at: baseTime,
    updated_at: baseTime,
  },
];

/** 上传文件 */
const mockFiles = [
  {
    file_base: "blog/article/",
    file_name: "cover.png",
    file_type: "image/png",
    file_size: 204800,
    file_url: "https://example.com/cover.png",
    updated_at: baseTime,
  },
  {
    file_base: "blog/album/",
    file_name: "photo.jpg",
    file_type: "image/jpeg",
    file_size: 512000,
    file_url: "https://example.com/photo.jpg",
    updated_at: baseTime,
  },
];

export default defineMock([
  // ==================== 相册 ====================
  {
    url: "album/query_album_list",
    method: ["POST"],
    body: ok({ list: mockAlbums, total: mockAlbums.length }),
  },
  { url: "album/get_album", method: ["GET"], body: ok(mockAlbums[0]) },
  { url: "album/create_album", method: ["POST"], body: ok(mockAlbums[0]) },
  { url: "album/update_album", method: ["PUT"], body: ok(mockAlbums[0]) },
  { url: "album/delete_album", method: ["DELETE"], body: batch() },
  { url: "album/update_album_delete", method: ["PUT"], body: batch() },

  // ==================== 相片 ====================
  {
    url: "photo/query_photo_list",
    method: ["POST"],
    body: ok({ list: mockPhotos, total: mockPhotos.length }),
  },
  { url: "photo/create_photo", method: ["POST"], body: ok(mockPhotos[0]) },
  { url: "photo/update_photo", method: ["PUT"], body: ok(mockPhotos[0]) },
  { url: "photo/delete_photo", method: ["DELETE"], body: batch() },
  { url: "photo/update_photo_delete", method: ["PUT"], body: batch() },

  // ==================== 文件 ====================
  {
    url: "upload/query_file_list",
    method: ["POST"],
    body: ok({
      list: mockFiles,
      total: mockFiles.length,
      page: 1,
      page_size: 10,
    }),
  },
  {
    url: "upload/upload_file",
    method: ["POST"],
    body: ok({ file_info: mockFiles[0] }),
  },
]);
