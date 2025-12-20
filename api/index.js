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

export default async function handler(request) {
  // 1. 从所有图片库中随机选择一个
  const libraryIndex = Math.floor(Math.random() * libraries.length);
  const library = libraries[libraryIndex];
  
  // 2. 生成该库范围内的随机图片编号
  const imageNum = Math.floor(Math.random() * library.count) + 1;
  
  // 3. 构建原始图片URL
  const originImageUrl = `https://cdn-esa-1.xcqcoo.top/gh/QC3284/blog-image-go@main/${library.name}/${imageNum}.jpg`;
  
  try {
    // 4. 从源站获取图片数据
    const imageResponse = await fetch(originImageUrl);
    
    // 5. 如果源站响应正常，将图片数据返回给客户端
    if (imageResponse.ok) {
      // 可选：将源站的一些有用的头部信息（如Content-Type）也传递回去
      const contentType = imageResponse.headers.get('content-type') || 'image/jpeg';
      
      return new Response(imageResponse.body, {
        status: 200,
        headers: {
          'Content-Type': contentType,
          // 可添加缓存控制，例如让浏览器缓存一小段时间，减轻你的Vercel函数压力
          'Cache-Control': 'public, max-age=86400', // 缓存1天
          // 或者完全不缓存，确保每次访问都是新图片
          // 'Cache-Control': 'no-store, max-age=0',
          'CDN-Cache-Control': 'public, max-age=86400',
          'Vary': 'User-Agent, Accept-Encoding'
        }
      });
    } else {
      // 如果源站图片获取失败，返回一个错误信息或默认图片
      return new Response('Image not found', { status: 404 });
    }
  } catch (error) {
    // 网络或其他错误处理
    return new Response('Failed to fetch image', { status: 500 });
  }
}

export const config = {
  runtime: 'edge'
};
