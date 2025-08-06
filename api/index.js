// 预定义图片库配置（所有图片库及其图片数量）
const libraries = [
  { name: 'kasuie', count: 102 },
  { name: 'moez', count: 121 },
  { name: 'kanzakimoe', count: 503 },
  { name: 'mty', count: 400 },
  { name: 'afo', count: 770 },
  { name: 'yinghua', count: 400 },
  { name: 'yinhuaac', count: 411 },
  { name: 'yuki', count: 302 },
  { name: 'uapis', count: 20 },
  { name: 'animeapi', count: 400 }
];

export default function handler(req) {
  // 从所有图片库中随机选择一个
  const libraryIndex = Math.floor(Math.random() * libraries.length);
  const library = libraries[libraryIndex];
  
  // 生成该库范围内的随机图片编号
  const imagePath = `${library.name}/${Math.floor(Math.random() * library.count) + 1}`;
  
  // 构建图片URL
  const imageUrl = `https://cdn4.xcqcoo.top/gh/QC3284/blog-image-go@main/${imagePath}.jpg`;
  
  // 返回307重定向响应
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
