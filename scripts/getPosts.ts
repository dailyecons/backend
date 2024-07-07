import getPosts from '@api/post/get';

console.log(
  await (
    await getPosts.client().get('/', {
      query: {
        limit: 20,
        startID: -1
      }
    })
  ).json()
);
