import createPost from '@api/post/create';
import getAdminToken from './getAdminToken';

const headers = { Cookie: await getAdminToken() };
console.log(headers);

const body = new FormData();
body.append('title', prompt('Post title:')!);
body.append('bannerLink', prompt('Post banner:')!);

{
  console.log('Post content: ');
  const lines = [];

  for await (const line of console) {
    if (line === 'EOF') break;
    lines.push(line);
  }

  body.append('content', lines.join('\n'));
}

const res = await createPost.client().post('/', { headers, body });
if (!res.ok) throw new Error(Bun.inspect(res));

console.log('Post added successfully');
