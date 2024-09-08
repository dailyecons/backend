import getAdminPosts from '@api/admin/posts';
import getAdminToken from './getAdminToken';

console.log(
  (await getAdminPosts.client().get('/', {
    headers: {
      Authorization: await getAdminToken()
    }
  })).headers
);
