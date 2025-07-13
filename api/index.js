// 预定义图片库配置（提高效率）
const libraries = [
  { name: 'kasuie', count: 102 },
  { name: 'moez', count: 121 },
  { name: 'kanzakimoe', count: 503 },
  { name: 'mty', count: 400 },
  { name: 'afo', count: 770 }
];

export default function handler(req) {
  // 一次性生成随机索引和随机数（减少计算次数）
  const libraryIndex = Math.floor(Math.random() * libraries.length);
  const library = libraries[libraryIndex];
  
  // 直接计算图片路径（避免中间变量）
  const imagePath = `${library.name}/${Math.floor(Math.random() * library.count) + 1}`;
  
  // 使用模板字符串构建完整URL（更简洁）
  const imageUrl = `https://cdn3.xcqcoo.top/jsd/gh/QC3284/blog-image-go@main/${imagePath}.jpg`;
  
  // 直接返回响应（避免创建临时变量）
  return new Response(null, {
    status: 307,
    headers: {
      "Location": imageUrl,
      "Cache-Control": "no-store, max-age=0",
      "CDN-Cache-Control": "no-store",
      "Vercel-CDN-Cache-Control": "no-store",
      "Vary": "User-Agent, Accept-Encoding"
    }
  });
}

export const config = {
  runtime: "edge"
};
