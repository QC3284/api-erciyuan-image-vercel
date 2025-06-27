export default function handler(req) {
  // 随机选择图片库（0-3）
  const libraryIndex = Math.floor(Math.random() * 4);
  
  // 根据选择的图片库生成对应范围的随机数
  let randomNum, imagePath;
  
  switch(libraryIndex) {
    case 0: // kasuie 库 (1-102)
      randomNum = Math.floor(Math.random() * 102) + 1;
      imagePath = `kasuie/${randomNum}`;
      break;
    case 1: // moez 库 (1-121)
      randomNum = Math.floor(Math.random() * 121) + 1;
      imagePath = `moez/${randomNum}`;
      break;
    case 2: // kanzakimoe 库 (1-503)
      randomNum = Math.floor(Math.random() * 503) + 1;
      imagePath = `kanzakimoe/${randomNum}`;
      break;
    case 3: // mty 库 (1-400)
      randomNum = Math.floor(Math.random() * 400) + 1;
      imagePath = `mty/${randomNum}`;
      break;
  }
  
  // 构建图片 URL
  const imageUrl = `https://cdn3.xcqcoo.top/jsd/gh/QC3284/blog-image-go@main/${imagePath}.jpg`;
  
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
