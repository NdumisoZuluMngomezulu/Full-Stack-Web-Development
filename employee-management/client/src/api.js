const API_URL = 'http://localhost:5000/api'

async function api(path, opts) {
  let res;
  try {
    res = await fetch(API + path, { ...opts, headers: { "Content-Type": "application/json", ...(opts && opts.headers) } });
  } catch {
    throw Object.assign(new Error("Can't reach the shop server."), { network: true });
  }
  const data = res.status === 204 ? null : await res.json().catch(() => ({}));
  if (!res.ok) throw Object.assign(new Error(data?.error || "Something went wrong. Try again."), { status: res.status });
  return data;
}


export async function login(username, password) {
    const res = await fetch(`${API}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type':'application/json' },
        body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    //fetch only rejects on network failure. check res.ok
    if (!res.ok) throw new Error(data.error || 'Something went wrong');

    return data; //{ token, user }
}

// const API_URL = 'http://localhost:5000/api'

// export async function login(username, password) {
//   const res = await fetch(`${API_URL}/auth/login`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ username, password }),
//   })

//   const data = await res.json()

//   // fetch only rejects on network failure. A 401 is a "successful" response,
//   // so we must check res.ok ourselves.
//   if (!res.ok) throw new Error(data.error || 'Something went wrong')

//   return data // { token, user }
// }