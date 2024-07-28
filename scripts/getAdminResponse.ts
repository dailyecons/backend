import adminAccount from '@api/admin/account';

const body = new FormData();
body.append('name', prompt('Enter name:')!);
body.append('password', prompt('Enter password:')!);

// Setup client
const res = await adminAccount.client().post('/login', { body });
if (!res.ok) throw new Error(Bun.inspect(res));

console.log(res);
