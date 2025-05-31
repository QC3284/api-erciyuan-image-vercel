export default function handler(req) {
  // 生成 1-102 的随机数
  const randomNum = Math.floor(Math.random() * 102) + 1;
  
  // 构建图片 URL
  const imageUrl = `https://cdn3.xcqcoo.top/jsd/gh/QC3284/blog-image-go@main/kasuie/${randomNum}.jpg`;
  
  // 创建响应头
  const headers = new Headers({
    "Location": imageUrl,
    "Cache-Control": "no-store, max-age=0",
    "CDN-Cache-Control": "no-store",
    "Vercel-CDN-Cache-Control": "no-store",
    "Vary": "User-Agent, Accept-Encoding"
  });
  
  // 返回 307 临时重定向
  return new Response(null, {
    status: 307,
    headers: headers
  });
}

export const config = {
  runtime: "edge"
};