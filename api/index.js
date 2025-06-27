export default function handler(req) {
  // 随机选择图片库：0为kasukie（1-102），1为moez（1-121）
  const libraryIndex = Math.floor(Math.random() * 2);
  
  // 根据选择的图片库生成对应范围的随机数
  let randomNum;
  if (libraryIndex === 0) {
    randomNum = Math.floor(Math.random() * 102) + 1;
  } else {
    randomNum = Math.floor(Math.random() * 121) + 1;
  }
  
  // 构建图片 URL
  const imageUrl = libraryIndex === 0 
    ? `https://cdn3.xcqcoo.top/jsd/gh/QC3284/blog-image-go@main/kasuie/${randomNum}.jpg`
    : `https://cdn3.xcqcoo.top/jsd/gh/QC3284/blog-image-go@main/moez/${randomNum}.jpg`;
  
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
