async function scrape(url) {
  const reply = fetch(url).then((response) => response.json());
  if (!reply) throw Error("Unable to resolve URL");
  return reply;
}

async function main() {
  const redditData = (await scrape("https://www.reddit.com/.json")).data
    .children;
  console.log(redditData);

  for (let i = 0; i < redditData.length; i++) {
    console.log(redditData[i]);
  }
}

main();
