export default async function getItem(id) {
  const res = await fetch(
    "https://hacker-news.firebaseio.com/v0/item/" + id + ".json"
  );
  const data = await res.json();

  return data;
}
